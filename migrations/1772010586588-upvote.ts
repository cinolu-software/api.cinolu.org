import { MigrationInterface, QueryRunner } from "typeorm";

export class Upvote1772010586588 implements MigrationInterface {
    name = 'Upvote1772010586588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`project_participation_upvote\` (\`id\` uuid NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`userId\` uuid NULL, \`participationId\` uuid NULL, UNIQUE INDEX \`IDX_b6bff10e8556b8e995955a6222\` (\`userId\`, \`participationId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project_participation_upvote\` ADD CONSTRAINT \`FK_cc5971d6212ada63d8cab17ed8d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_participation_upvote\` ADD CONSTRAINT \`FK_1431f614a0e556a1f30e450fc53\` FOREIGN KEY (\`participationId\`) REFERENCES \`project_participation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_participation_upvote\` DROP FOREIGN KEY \`FK_1431f614a0e556a1f30e450fc53\``);
        await queryRunner.query(`ALTER TABLE \`project_participation_upvote\` DROP FOREIGN KEY \`FK_cc5971d6212ada63d8cab17ed8d\``);
        await queryRunner.query(`DROP INDEX \`IDX_b6bff10e8556b8e995955a6222\` ON \`project_participation_upvote\``);
        await queryRunner.query(`DROP TABLE \`project_participation_upvote\``);
    }

}
