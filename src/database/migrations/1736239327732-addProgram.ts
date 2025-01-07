import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProgram1736239327732 implements MigrationInterface {
  name = 'AddProgram1736239327732';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_cf336e5a3d2e9c4448abbfa594c\``);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP FOREIGN KEY \`FK_a251d108b40a8021a4359caeb7e\``);
    await queryRunner.query(`ALTER TABLE \`project_types\` DROP FOREIGN KEY \`FK_07bec1f774bf3a158032e699813\``);
    await queryRunner.query(`ALTER TABLE \`project_types\` DROP FOREIGN KEY \`FK_bdf28310b9d3b46206d4af849ef\``);
    await queryRunner.query(`ALTER TABLE \`project_categories\` DROP FOREIGN KEY \`FK_0024194a585e55ead317be949ff\``);
    await queryRunner.query(`ALTER TABLE \`project_categories\` DROP FOREIGN KEY \`FK_8516a3b399822b154597b22fc27\``);
    await queryRunner.query(`ALTER TABLE \`project_partners\` DROP FOREIGN KEY \`FK_0bd24970b5d5af86eb70db324ff\``);
    await queryRunner.query(`ALTER TABLE \`project_partners\` DROP FOREIGN KEY \`FK_3dc64ed72399fb3c40ffc922574\``);
    await queryRunner.query(
      `ALTER TABLE \`user_enrolled_projects\` DROP FOREIGN KEY \`FK_a83f3e2dcd82ff426143e4e9e66\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user_enrolled_projects\` DROP FOREIGN KEY \`FK_a8b8ba6648fe3b4e646cb4a8090\``
    );
    await queryRunner.query(`DROP INDEX \`IDX_bdf28310b9d3b46206d4af849e\` ON \`project_types\``);
    await queryRunner.query(`DROP INDEX \`IDX_07bec1f774bf3a158032e69981\` ON \`project_types\``);
    await queryRunner.query(`DROP INDEX \`IDX_0024194a585e55ead317be949f\` ON \`project_categories\``);
    await queryRunner.query(`DROP INDEX \`IDX_8516a3b399822b154597b22fc2\` ON \`project_categories\``);
    await queryRunner.query(`DROP INDEX \`IDX_0bd24970b5d5af86eb70db324f\` ON \`project_partners\``);
    await queryRunner.query(`DROP INDEX \`IDX_3dc64ed72399fb3c40ffc92257\` ON \`project_partners\``);
    await queryRunner.query(`DROP INDEX \`IDX_a83f3e2dcd82ff426143e4e9e6\` ON \`user_enrolled_projects\``);
    await queryRunner.query(`DROP INDEX \`IDX_a8b8ba6648fe3b4e646cb4a809\` ON \`user_enrolled_projects\``);
    await queryRunner.query(
      `CREATE TABLE \`program\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(`ALTER TABLE \`application\` DROP COLUMN \`programId\``);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP COLUMN \`programId\``);
    await queryRunner.query(`ALTER TABLE \`application\` ADD \`projectId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`phase\` ADD \`projectId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` ADD \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` ADD \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`sector\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` DROP FOREIGN KEY \`FK_0df86d262a1d44d20ddc899fd91\``);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`stage\` \`stage\` enum ('Phase de l''idéation', 'Phase de démarrage', 'Phase de croissance', 'Phase de maturité') NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE \`venture\` DROP COLUMN \`socials\``);
    await queryRunner.query(`ALTER TABLE \`venture\` ADD \`socials\` json NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
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
    await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_b4ae3fea4a24b4be1a86dacf8a2\``);
    await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`requirement\` DROP FOREIGN KEY \`FK_ed3de91a28a36881c5e90283fdd\``);
    await queryRunner.query(`ALTER TABLE \`requirement\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`requirement\` CHANGE \`phaseId\` \`phaseId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`document\` DROP FOREIGN KEY \`FK_f2bf8d12e931bb9eee1ec1e9975\``);
    await queryRunner.query(`ALTER TABLE \`document\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`document\` CHANGE \`file_name\` \`file_name\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`document\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`phase\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP COLUMN \`form\``);
    await queryRunner.query(`ALTER TABLE \`phase\` ADD \`form\` json NULL`);
    await queryRunner.query(`ALTER TABLE \`type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`aim\` \`aim\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`prize\` \`prize\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`town\` \`town\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e195b4c478ace2cf124c13ed11e\``);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`online_link\` \`online_link\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`responsibleId\` \`responsibleId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_f05fcc9b589876b45e82e17b313\``);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`google_image\` \`google_image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profile\` \`profile\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`verified_at\` \`verified_at\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`detailId\` \`detailId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`expertise\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`position\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`detail\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`detail\` DROP COLUMN \`socials\``);
    await queryRunner.query(`ALTER TABLE \`detail\` ADD \`socials\` json NULL`);
    await queryRunner.query(`CREATE INDEX \`IDX_6feefc140a5a0b09c1a04e40ce\` ON \`project_types\` (\`projectId\`)`);
    await queryRunner.query(`CREATE INDEX \`IDX_0b6574c50cd3be60fd2586d167\` ON \`project_types\` (\`typeId\`)`);
    await queryRunner.query(
      `CREATE INDEX \`IDX_4b3ae99beef33e732fb6318500\` ON \`project_categories\` (\`projectId\`)`
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_1c3ef809362ea005697d86e828\` ON \`project_categories\` (\`categoryId\`)`
    );
    await queryRunner.query(`CREATE INDEX \`IDX_e5f58061b5ae1744551d31fa34\` ON \`project_partners\` (\`projectId\`)`);
    await queryRunner.query(`CREATE INDEX \`IDX_7896bef40d92e726aeff1e2c8c\` ON \`project_partners\` (\`partnerId\`)`);
    await queryRunner.query(
      `CREATE INDEX \`IDX_cf95f1306b84204ead3ba5f15a\` ON \`user_enrolled_projects\` (\`userId\`)`
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_f46160ca19f4b7f12e6d40ea5d\` ON \`user_enrolled_projects\` (\`projectId\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` ADD CONSTRAINT \`FK_0df86d262a1d44d20ddc899fd91\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
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
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_f05fcc9b589876b45e82e17b313\` FOREIGN KEY (\`detailId\`) REFERENCES \`detail\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_types\` ADD CONSTRAINT \`FK_6feefc140a5a0b09c1a04e40ce7\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_types\` ADD CONSTRAINT \`FK_0b6574c50cd3be60fd2586d167f\` FOREIGN KEY (\`typeId\`) REFERENCES \`type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories\` ADD CONSTRAINT \`FK_4b3ae99beef33e732fb63185009\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories\` ADD CONSTRAINT \`FK_1c3ef809362ea005697d86e8288\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_partners\` ADD CONSTRAINT \`FK_e5f58061b5ae1744551d31fa34e\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_partners\` ADD CONSTRAINT \`FK_7896bef40d92e726aeff1e2c8cf\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partner\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_enrolled_projects\` ADD CONSTRAINT \`FK_cf95f1306b84204ead3ba5f15ab\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_enrolled_projects\` ADD CONSTRAINT \`FK_f46160ca19f4b7f12e6d40ea5d6\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_enrolled_projects\` DROP FOREIGN KEY \`FK_f46160ca19f4b7f12e6d40ea5d6\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user_enrolled_projects\` DROP FOREIGN KEY \`FK_cf95f1306b84204ead3ba5f15ab\``
    );
    await queryRunner.query(`ALTER TABLE \`project_partners\` DROP FOREIGN KEY \`FK_7896bef40d92e726aeff1e2c8cf\``);
    await queryRunner.query(`ALTER TABLE \`project_partners\` DROP FOREIGN KEY \`FK_e5f58061b5ae1744551d31fa34e\``);
    await queryRunner.query(`ALTER TABLE \`project_categories\` DROP FOREIGN KEY \`FK_1c3ef809362ea005697d86e8288\``);
    await queryRunner.query(`ALTER TABLE \`project_categories\` DROP FOREIGN KEY \`FK_4b3ae99beef33e732fb63185009\``);
    await queryRunner.query(`ALTER TABLE \`project_types\` DROP FOREIGN KEY \`FK_0b6574c50cd3be60fd2586d167f\``);
    await queryRunner.query(`ALTER TABLE \`project_types\` DROP FOREIGN KEY \`FK_6feefc140a5a0b09c1a04e40ce7\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_f05fcc9b589876b45e82e17b313\``);
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
    await queryRunner.query(`ALTER TABLE \`venture\` DROP FOREIGN KEY \`FK_0df86d262a1d44d20ddc899fd91\``);
    await queryRunner.query(`DROP INDEX \`IDX_f46160ca19f4b7f12e6d40ea5d\` ON \`user_enrolled_projects\``);
    await queryRunner.query(`DROP INDEX \`IDX_cf95f1306b84204ead3ba5f15a\` ON \`user_enrolled_projects\``);
    await queryRunner.query(`DROP INDEX \`IDX_7896bef40d92e726aeff1e2c8c\` ON \`project_partners\``);
    await queryRunner.query(`DROP INDEX \`IDX_e5f58061b5ae1744551d31fa34\` ON \`project_partners\``);
    await queryRunner.query(`DROP INDEX \`IDX_1c3ef809362ea005697d86e828\` ON \`project_categories\``);
    await queryRunner.query(`DROP INDEX \`IDX_4b3ae99beef33e732fb6318500\` ON \`project_categories\``);
    await queryRunner.query(`DROP INDEX \`IDX_0b6574c50cd3be60fd2586d167\` ON \`project_types\``);
    await queryRunner.query(`DROP INDEX \`IDX_6feefc140a5a0b09c1a04e40ce\` ON \`project_types\``);
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
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`responsibleId\` \`responsibleId\` varchar(36) NULL DEFAULT 'NULL'`
    );
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
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`town\` \`town\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`prize\` \`prize\` text NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`aim\` \`aim\` text NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`phase\` DROP COLUMN \`form\``);
    await queryRunner.query(`ALTER TABLE \`phase\` ADD \`form\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`phase\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
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
      `ALTER TABLE \`application\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` ADD CONSTRAINT \`FK_b4ae3fea4a24b4be1a86dacf8a2\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
    await queryRunner.query(
      `ALTER TABLE \`sector\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`programId\``);
    await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`programId\``);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP COLUMN \`projectId\``);
    await queryRunner.query(`ALTER TABLE \`application\` DROP COLUMN \`projectId\``);
    await queryRunner.query(`ALTER TABLE \`phase\` ADD \`programId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`application\` ADD \`programId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`DROP TABLE \`program\``);
    await queryRunner.query(
      `CREATE INDEX \`IDX_a8b8ba6648fe3b4e646cb4a809\` ON \`user_enrolled_projects\` (\`projectId\`)`
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_a83f3e2dcd82ff426143e4e9e6\` ON \`user_enrolled_projects\` (\`userId\`)`
    );
    await queryRunner.query(`CREATE INDEX \`IDX_3dc64ed72399fb3c40ffc92257\` ON \`project_partners\` (\`partnerId\`)`);
    await queryRunner.query(`CREATE INDEX \`IDX_0bd24970b5d5af86eb70db324f\` ON \`project_partners\` (\`projectId\`)`);
    await queryRunner.query(
      `CREATE INDEX \`IDX_8516a3b399822b154597b22fc2\` ON \`project_categories\` (\`categoryId\`)`
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_0024194a585e55ead317be949f\` ON \`project_categories\` (\`projectId\`)`
    );
    await queryRunner.query(`CREATE INDEX \`IDX_07bec1f774bf3a158032e69981\` ON \`project_types\` (\`typeId\`)`);
    await queryRunner.query(`CREATE INDEX \`IDX_bdf28310b9d3b46206d4af849e\` ON \`project_types\` (\`projectId\`)`);
    await queryRunner.query(
      `ALTER TABLE \`user_enrolled_projects\` ADD CONSTRAINT \`FK_a8b8ba6648fe3b4e646cb4a8090\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_enrolled_projects\` ADD CONSTRAINT \`FK_a83f3e2dcd82ff426143e4e9e66\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_partners\` ADD CONSTRAINT \`FK_3dc64ed72399fb3c40ffc922574\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partner\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_partners\` ADD CONSTRAINT \`FK_0bd24970b5d5af86eb70db324ff\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories\` ADD CONSTRAINT \`FK_8516a3b399822b154597b22fc27\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories\` ADD CONSTRAINT \`FK_0024194a585e55ead317be949ff\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_types\` ADD CONSTRAINT \`FK_bdf28310b9d3b46206d4af849ef\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_types\` ADD CONSTRAINT \`FK_07bec1f774bf3a158032e699813\` FOREIGN KEY (\`typeId\`) REFERENCES \`type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`phase\` ADD CONSTRAINT \`FK_a251d108b40a8021a4359caeb7e\` FOREIGN KEY (\`programId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` ADD CONSTRAINT \`FK_cf336e5a3d2e9c4448abbfa594c\` FOREIGN KEY (\`programId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
