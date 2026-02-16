const fs = require('fs');
const path = require('path');

function loadTs() {
  try {
    return require('typescript');
  } catch (_e) {
    const base = path.join(process.cwd(), 'node_modules', '.pnpm');
    const dirs = fs.existsSync(base) ? fs.readdirSync(base).filter((d) => d.startsWith('typescript@')) : [];
    if (!dirs.length) throw new Error('typescript package not found');
    const tsPath = path.join(base, dirs[0], 'node_modules', 'typescript', 'lib', 'typescript.js');
    return require(tsPath);
  }
}

const ts = loadTs();
const ROOT = process.cwd();
const SRC_DIRS = ['src/modules', 'src/core/auth'];
const OUTPUT = path.join(ROOT, 'docs', 'API.md');

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && full.endsWith('.ts')) out.push(full);
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function readSf(file) {
  const src = fs.readFileSync(file, 'utf8');
  return ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

function decoratorsOf(node) {
  if (ts.canHaveDecorators && ts.canHaveDecorators(node)) {
    return ts.getDecorators(node) || [];
  }
  return node.decorators || [];
}

function decName(dec) {
  const expr = dec.expression;
  if (ts.isCallExpression(expr)) {
    if (ts.isIdentifier(expr.expression)) return expr.expression.text;
    if (ts.isPropertyAccessExpression(expr.expression)) return expr.expression.name.text;
  }
  if (ts.isIdentifier(expr)) return expr.text;
  if (ts.isPropertyAccessExpression(expr)) return expr.name.text;
  return null;
}

function decArgs(dec, sf) {
  const expr = dec.expression;
  if (!ts.isCallExpression(expr)) return [];
  return expr.arguments.map((a) => a.getText(sf));
}

function unquote(s) {
  return (s || '').replace(/^['"`]|['"`]$/g, '');
}

function moduleName(file) {
  const r = rel(file);
  if (r.startsWith('src/core/auth/')) return 'Auth';
  const p = r.split('/');
  const i = p.indexOf('modules');
  if (i >= 0 && p[i + 1]) {
    return p[i + 1]
      .split('-')
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join(' ');
  }
  return 'Other';
}

function parseControllers(files) {
  const all = [];

  for (const file of files.filter((f) => f.endsWith('.controller.ts'))) {
    const sf = readSf(file);

    sf.forEachChild((node) => {
      if (!ts.isClassDeclaration(node) || !node.name) return;

      const classDecs = decoratorsOf(node);
      let basePath = '';
      for (const d of classDecs) {
        if (decName(d) === 'Controller') {
          basePath = unquote(decArgs(d, sf)[0] || '');
        }
      }
      if (!basePath && classDecs.length === 0) return;

      const routes = [];
      for (const member of node.members) {
        if (!ts.isMethodDeclaration(member) || !member.name || !ts.isIdentifier(member.name)) continue;
        const mDecs = decoratorsOf(member);

        let method = null;
        let subPath = '';
        let isPublic = false;
        const roles = [];

        for (const d of mDecs) {
          const n = decName(d);
          const args = decArgs(d, sf);

          if (['Get', 'Post', 'Patch', 'Put', 'Delete'].includes(n)) {
            method = n.toUpperCase();
            subPath = unquote(args[0] || '');
          }
          if (n === 'Public') isPublic = true;
          if (n === 'UseRoles') roles.push(...args.map((a) => a.trim()));
        }

        if (!method) continue;

        const params = [];
        const query = [];
        const body = [];
        const filesIn = [];

        for (const p of member.parameters) {
          const pName = ts.isIdentifier(p.name) ? p.name.text : p.name.getText(sf);
          const pType = p.type ? p.type.getText(sf) : 'unknown';

          for (const pd of decoratorsOf(p)) {
            const n = decName(pd);
            const args = decArgs(pd, sf).map((a) => unquote(a));

            if (n === 'Param') params.push({ name: args[0] || pName, type: pType });
            if (n === 'Query') query.push({ name: args[0] || '(query object)', type: pType });
            if (n === 'Body') body.push({ name: args[0] || 'body', type: pType });
            if (n === 'UploadedFile') filesIn.push({ name: args[0] || pName, kind: 'single' });
            if (n === 'UploadedFiles') filesIn.push({ name: args[0] || pName, kind: 'multiple' });
          }
        }

        for (const d of mDecs) {
          if (decName(d) !== 'UseInterceptors') continue;
          for (const a of decArgs(d, sf)) {
            const mm = a.match(/(?:FileInterceptor|FilesInterceptor)\((['"`])([^'"`]+)\1/);
            if (mm && !filesIn.some((f) => f.name === mm[2])) {
              filesIn.push({ name: mm[2], kind: 'multipart' });
            }
          }
        }

        routes.push({
          method,
          path: `/${basePath}${subPath ? `/${subPath}` : ''}`.replace(/\/+/g, '/'),
          isPublic,
          roles,
          params,
          query,
          body,
          filesIn
        });
      }

      all.push({
        moduleName: moduleName(file),
        className: node.name.text,
        basePath: `/${basePath}`,
        filePath: rel(file),
        routes
      });
    });
  }

  return all.sort((a, b) => a.moduleName.localeCompare(b.moduleName) || a.className.localeCompare(b.className));
}

function parseDtos(files) {
  const out = [];

  for (const file of files.filter((f) => f.includes('/dto/') && f.endsWith('.dto.ts'))) {
    const sf = readSf(file);

    sf.forEachChild((node) => {
      if (!ts.isClassDeclaration(node) || !node.name) return;

      const fields = [];
      for (const member of node.members) {
        if (!ts.isPropertyDeclaration(member) || !member.name) continue;

        const name = member.name.getText(sf);
        const type = member.type ? member.type.getText(sf) : 'any';
        const optional = !!member.questionToken;
        const decorators = decoratorsOf(member).map((d) => {
          const n = decName(d);
          if (!n) return null;
          const args = decArgs(d, sf);
          return `@${n}${args.length ? `(${args.join(', ')})` : ''}`;
        }).filter(Boolean);

        fields.push({ name, type, optional, decorators });
      }

      const heritage = (node.heritageClauses || [])
        .flatMap((h) => h.types.map((t) => t.getText(sf)))
        .join(', ');

      out.push({
        moduleName: moduleName(file),
        className: node.name.text,
        kind: 'class',
        filePath: rel(file),
        heritage,
        fields
      });
    });

    sf.forEachChild((node) => {
      if (!ts.isInterfaceDeclaration(node) || !node.name) return;

      const fields = node.members
        .filter((m) => ts.isPropertySignature(m) && m.name)
        .map((m) => ({
          name: m.name.getText(sf),
          type: m.type ? m.type.getText(sf) : 'any',
          optional: !!m.questionToken,
          decorators: []
        }));

      const heritage = (node.heritageClauses || [])
        .flatMap((h) => h.types.map((t) => t.getText(sf)))
        .join(', ');

      out.push({
        moduleName: moduleName(file),
        className: node.name.text,
        kind: 'interface',
        filePath: rel(file),
        heritage,
        fields
      });
    });
  }

  return out.sort((a, b) => a.moduleName.localeCompare(b.moduleName) || a.className.localeCompare(b.className));
}

function esc(s) {
  return String(s).replace(/\|/g, '\\|').replace(/`/g, '\\`').replace(/\n/g, ' ');
}

function render(controllers, dtos) {
  const modules = [...new Set([...controllers.map((c) => c.moduleName), ...dtos.map((d) => d.moduleName)])].sort();
  const lines = [];

  lines.push('# API Documentation');
  lines.push('');
  lines.push('Generated from source code in `src/core/auth` and `src/modules`.');
  lines.push('');
  lines.push('## Conventions');
  lines.push('');
  lines.push('- `Auth`: `Public` means route has `@Public()`. Otherwise route is protected.');
  lines.push('- `Roles`: extracted from `@UseRoles(...)` where present.');
  lines.push('- `Params`, `Query`, `Body`, `Files`: extracted from method decorators/interceptors.');
  lines.push('');

  lines.push('## Modules and Routes');
  lines.push('');

  for (const mod of modules) {
    const ctrls = controllers.filter((c) => c.moduleName === mod);
    if (!ctrls.length) continue;

    lines.push(`### ${mod}`);
    lines.push('');

    for (const c of ctrls) {
      lines.push(`#### ${c.className} (\`${c.basePath}\`)`);
      lines.push('');
      lines.push(`Source: \`${c.filePath}\``);
      lines.push('');
      lines.push('| Method | Path | Auth | Roles | Params | Query | Body | Files |');
      lines.push('|---|---|---|---|---|---|---|---|');

      for (const r of c.routes) {
        const roles = r.roles.length ? r.roles.map(esc).join('<br>') : '-';
        const params = r.params.length ? r.params.map((p) => `\`${esc(p.name)}: ${esc(p.type)}\``).join('<br>') : '-';
        const query = r.query.length ? r.query.map((q) => `\`${esc(q.name)}: ${esc(q.type)}\``).join('<br>') : '-';
        const body = r.body.length ? r.body.map((b) => `\`${esc(b.name)}: ${esc(b.type)}\``).join('<br>') : '-';
        const filesIn = r.filesIn.length ? r.filesIn.map((f) => `\`${esc(f.name)}\` (${esc(f.kind)})`).join('<br>') : '-';

        lines.push(`| ${r.method} | \`${esc(r.path)}\` | ${r.isPublic ? 'Public' : 'Protected'} | ${roles} | ${params} | ${query} | ${body} | ${filesIn} |`);
      }
      lines.push('');
    }
  }

  lines.push('## DTO Reference');
  lines.push('');

  for (const mod of modules) {
    const list = dtos.filter((d) => d.moduleName === mod);
    if (!list.length) continue;

    lines.push(`### ${mod}`);
    lines.push('');

    for (const d of list) {
      lines.push(`#### ${d.className}`);
      lines.push('');
      lines.push(`Source: \`${d.filePath}\``);
      lines.push(`Type: \`${d.kind}\``);
      if (d.heritage) lines.push(`Extends/Implements: \`${esc(d.heritage)}\``);
      lines.push('');

      if (!d.fields.length) {
        lines.push('No direct fields in this class (mapped/composed DTO).');
        lines.push('');
        continue;
      }

      lines.push('| Field | Type | Required | Validation / Transform decorators |');
      lines.push('|---|---|---|---|');

      for (const f of d.fields) {
        const deco = f.decorators.length ? f.decorators.map(esc).join('<br>') : '-';
        lines.push(`| \`${esc(f.name)}\` | \`${esc(f.type)}\` | ${f.optional ? 'No' : 'Yes'} | ${deco} |`);
      }
      lines.push('');
    }
  }

  lines.push('## Notes');
  lines.push('');
  lines.push('- Global input validation uses `ValidationPipe({ transform: true })` in `src/main.ts`.');
  lines.push('- File endpoints require `multipart/form-data`; use exact field names from the `Files` column.');

  return lines.join('\n');
}

function main() {
  const files = SRC_DIRS.flatMap((d) => walk(path.join(ROOT, d)));
  const controllers = parseControllers(files);
  const dtos = parseDtos(files);

  const md = render(controllers, dtos);
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, md);

  console.log(`Generated ${rel(OUTPUT)}`);
  console.log(`Controllers: ${controllers.length}`);
  console.log(`DTO classes: ${dtos.length}`);
  console.log(`Routes: ${controllers.reduce((n, c) => n + c.routes.length, 0)}`);
}

main();
