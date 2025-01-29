import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImage1738135469743 implements MigrationInterface {
  name = 'AddImage1738135469743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`post\` ADD \`image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`sector\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`expertise\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`position\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`detail\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`detail\` DROP COLUMN \`socials\``);
    await queryRunner.query(`ALTER TABLE \`detail\` ADD \`socials\` json NULL`);
    await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`event_type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`partnership\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`partner\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`partner\` CHANGE \`website_link\` \`website_link\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`partner\` CHANGE \`profile\` \`profile\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_8d5525f4acba6e2149fb5da4a8c\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_bea8f7bc6860508ea240f4725ab\``);
    await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`applicationId\` \`applicationId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`reviwerId\` \`reviwerId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_e69389177ac594d36dea539f276\``);
    await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_b4ae3fea4a24b4be1a86dacf8a2\``);
    await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`projectId\` \`projectId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`requirement\` DROP FOREIGN KEY \`FK_ed3de91a28a36881c5e90283fdd\``);
    await queryRunner.query(`ALTER TABLE \`requirement\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`requirement\` CHANGE \`phaseId\` \`phaseId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`document\` DROP FOREIGN KEY \`FK_f2bf8d12e931bb9eee1ec1e9975\``);
    await queryRunner.query(`ALTER TABLE \`document\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`document\` CHANGE \`file_name\` \`file_name\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`document\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP FOREIGN KEY \`FK_ac2930f63ac7178530329b4b219\``);
    await queryRunner.query(`ALTER TABLE \`phase\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP COLUMN \`form\``);
    await queryRunner.query(`ALTER TABLE \`phase\` ADD \`form\` json NULL`);
    await queryRunner.query(`ALTER TABLE \`phase\` CHANGE \`projectId\` \`projectId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_d4774e6a2f0abb35049d3850e8f\``);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`aim\` \`aim\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`prize\` \`prize\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`report\``);
    await queryRunner.query(`ALTER TABLE \`project\` ADD \`report\` json NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`town\` \`town\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e2bd221f0e1dcb7bf8174b6ba59\``);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e195b4c478ace2cf124c13ed11e\``);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`online_link\` \`online_link\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`responsibleId\` \`responsibleId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`blog_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_d182905d4bfdd0ccae6b3d6c736\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``);
    await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`byId\` \`byId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`postId\` \`postId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_1077d47e0112cad3c16bbcea6cd\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c6fb082a3114f35d0cc27c518e0\``);
    await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`categoryId\` \`categoryId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`authorId\` \`authorId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_f05fcc9b589876b45e82e17b313\``);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`google_image\` \`google_image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profile\` \`profile\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`verified_at\` \`verified_at\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`detailId\` \`detailId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` DROP FOREIGN KEY \`FK_0df86d262a1d44d20ddc899fd91\``);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`stage\` \`stage\` enum ('Phase de l''idéation', 'Phase de démarrage', 'Phase de croissance', 'Phase de maturité') NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE \`venture\` DROP COLUMN \`socials\``);
    await queryRunner.query(`ALTER TABLE \`venture\` ADD \`socials\` json NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_8d5525f4acba6e2149fb5da4a8c\` FOREIGN KEY (\`applicationId\`) REFERENCES \`application\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_bea8f7bc6860508ea240f4725ab\` FOREIGN KEY (\`reviwerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` ADD CONSTRAINT \`FK_e69389177ac594d36dea539f276\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` ADD CONSTRAINT \`FK_b4ae3fea4a24b4be1a86dacf8a2\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`requirement\` ADD CONSTRAINT \`FK_ed3de91a28a36881c5e90283fdd\` FOREIGN KEY (\`phaseId\`) REFERENCES \`phase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`document\` ADD CONSTRAINT \`FK_f2bf8d12e931bb9eee1ec1e9975\` FOREIGN KEY (\`programId\`) REFERENCES \`phase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`phase\` ADD CONSTRAINT \`FK_ac2930f63ac7178530329b4b219\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_d4774e6a2f0abb35049d3850e8f\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e2bd221f0e1dcb7bf8174b6ba59\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e195b4c478ace2cf124c13ed11e\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_d182905d4bfdd0ccae6b3d6c736\` FOREIGN KEY (\`byId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_1077d47e0112cad3c16bbcea6cd\` FOREIGN KEY (\`categoryId\`) REFERENCES \`blog_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c6fb082a3114f35d0cc27c518e0\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_f05fcc9b589876b45e82e17b313\` FOREIGN KEY (\`detailId\`) REFERENCES \`detail\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` ADD CONSTRAINT \`FK_0df86d262a1d44d20ddc899fd91\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`venture\` DROP FOREIGN KEY \`FK_0df86d262a1d44d20ddc899fd91\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_f05fcc9b589876b45e82e17b313\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c6fb082a3114f35d0cc27c518e0\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_1077d47e0112cad3c16bbcea6cd\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_d182905d4bfdd0ccae6b3d6c736\``);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e195b4c478ace2cf124c13ed11e\``);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e2bd221f0e1dcb7bf8174b6ba59\``);
    await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_d4774e6a2f0abb35049d3850e8f\``);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP FOREIGN KEY \`FK_ac2930f63ac7178530329b4b219\``);
    await queryRunner.query(`ALTER TABLE \`document\` DROP FOREIGN KEY \`FK_f2bf8d12e931bb9eee1ec1e9975\``);
    await queryRunner.query(`ALTER TABLE \`requirement\` DROP FOREIGN KEY \`FK_ed3de91a28a36881c5e90283fdd\``);
    await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_b4ae3fea4a24b4be1a86dacf8a2\``);
    await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_e69389177ac594d36dea539f276\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_bea8f7bc6860508ea240f4725ab\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_8d5525f4acba6e2149fb5da4a8c\``);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`venture\` DROP COLUMN \`socials\``);
    await queryRunner.query(
      `ALTER TABLE \`venture\` ADD \`socials\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`stage\` \`stage\` enum ('Phase de l''''idéation', 'Phase de démarrage', 'Phase de croissance', 'Phase de maturité') NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` ADD CONSTRAINT \`FK_0df86d262a1d44d20ddc899fd91\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`detailId\` \`detailId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`verified_at\` \`verified_at\` datetime NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profile\` \`profile\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`google_image\` \`google_image\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_f05fcc9b589876b45e82e17b313\` FOREIGN KEY (\`detailId\`) REFERENCES \`detail\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`authorId\` \`authorId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`post\` CHANGE \`categoryId\` \`categoryId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c6fb082a3114f35d0cc27c518e0\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_1077d47e0112cad3c16bbcea6cd\` FOREIGN KEY (\`categoryId\`) REFERENCES \`blog_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`postId\` \`postId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`byId\` \`byId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`comment\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_d182905d4bfdd0ccae6b3d6c736\` FOREIGN KEY (\`byId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`blog_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`responsibleId\` \`responsibleId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`programId\` \`programId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`online_link\` \`online_link\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e195b4c478ace2cf124c13ed11e\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e2bd221f0e1dcb7bf8174b6ba59\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`program\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`programId\` \`programId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`town\` \`town\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`report\``);
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD \`report\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`prize\` \`prize\` text NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`aim\` \`aim\` text NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_d4774e6a2f0abb35049d3850e8f\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`phase\` CHANGE \`projectId\` \`projectId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP COLUMN \`form\``);
    await queryRunner.query(`ALTER TABLE \`phase\` ADD \`form\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`phase\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`phase\` ADD CONSTRAINT \`FK_ac2930f63ac7178530329b4b219\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`document\` CHANGE \`programId\` \`programId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`document\` CHANGE \`file_name\` \`file_name\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`document\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`document\` ADD CONSTRAINT \`FK_f2bf8d12e931bb9eee1ec1e9975\` FOREIGN KEY (\`programId\`) REFERENCES \`phase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`requirement\` CHANGE \`phaseId\` \`phaseId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`requirement\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`requirement\` ADD CONSTRAINT \`FK_ed3de91a28a36881c5e90283fdd\` FOREIGN KEY (\`phaseId\`) REFERENCES \`phase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`application\` CHANGE \`projectId\` \`projectId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` ADD CONSTRAINT \`FK_b4ae3fea4a24b4be1a86dacf8a2\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` ADD CONSTRAINT \`FK_e69389177ac594d36dea539f276\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` CHANGE \`reviwerId\` \`reviwerId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` CHANGE \`applicationId\` \`applicationId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_bea8f7bc6860508ea240f4725ab\` FOREIGN KEY (\`reviwerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_8d5525f4acba6e2149fb5da4a8c\` FOREIGN KEY (\`applicationId\`) REFERENCES \`application\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`partner\` CHANGE \`profile\` \`profile\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`partner\` CHANGE \`website_link\` \`website_link\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`partner\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`partnership\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`event_type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`detail\` DROP COLUMN \`socials\``);
    await queryRunner.query(
      `ALTER TABLE \`detail\` ADD \`socials\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`detail\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`position\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`expertise\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`sector\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`image\``);
  }
}
