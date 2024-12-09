import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVentures1733736711641 implements MigrationInterface {
  name = 'AddVentures1733736711641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_f05fcc9b589876b45e82e17b31\` ON \`user\``);
    await queryRunner.query(
      `CREATE TABLE \`sector\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`venture\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`pitch\` varchar(255) NOT NULL, \`founding_date\` datetime NOT NULL, \`address\` varchar(255) NOT NULL, \`stage\` enum ('Stade de l''idée ou du concept,', 'Phase de démarrage', 'Phase de croissance', 'Phase de maturité') NOT NULL, \`socials\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`ventures_sectors\` (\`ventureId\` varchar(36) NOT NULL, \`sectorId\` varchar(36) NOT NULL, INDEX \`IDX_cdac3f38cf086f7dc962713fa1\` (\`ventureId\`), INDEX \`IDX_fad1d549fe046d8ad32c0b66b3\` (\`sectorId\`), PRIMARY KEY (\`ventureId\`, \`sectorId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(`ALTER TABLE \`partnership\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`partner\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`partner\` CHANGE \`website_link\` \`website_link\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`partner\` CHANGE \`profile\` \`profile\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_8d5525f4acba6e2149fb5da4a8c\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_bea8f7bc6860508ea240f4725ab\``);
    await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`applicationId\` \`applicationId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`reviwerId\` \`reviwerId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_cf336e5a3d2e9c4448abbfa594c\``);
    await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_b4ae3fea4a24b4be1a86dacf8a2\``);
    await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`requirement\` DROP FOREIGN KEY \`FK_ed3de91a28a36881c5e90283fdd\``);
    await queryRunner.query(`ALTER TABLE \`requirement\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`requirement\` CHANGE \`phaseId\` \`phaseId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`document\` DROP FOREIGN KEY \`FK_f2bf8d12e931bb9eee1ec1e9975\``);
    await queryRunner.query(`ALTER TABLE \`document\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`document\` CHANGE \`file_name\` \`file_name\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`document\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP FOREIGN KEY \`FK_a251d108b40a8021a4359caeb7e\``);
    await queryRunner.query(`ALTER TABLE \`phase\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP COLUMN \`form\``);
    await queryRunner.query(`ALTER TABLE \`phase\` ADD \`form\` json NULL`);
    await queryRunner.query(`ALTER TABLE \`phase\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`aim\` \`aim\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`prize\` \`prize\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`town\` \`town\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`event_type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e195b4c478ace2cf124c13ed11e\``);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`online_link\` \`online_link\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`responsibleId\` \`responsibleId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
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
    await queryRunner.query(`ALTER TABLE \`detail\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`detail\` DROP COLUMN \`socials\``);
    await queryRunner.query(`ALTER TABLE \`detail\` ADD \`socials\` json NULL`);
    await queryRunner.query(`ALTER TABLE \`position\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_8d5525f4acba6e2149fb5da4a8c\` FOREIGN KEY (\`applicationId\`) REFERENCES \`application\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_bea8f7bc6860508ea240f4725ab\` FOREIGN KEY (\`reviwerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` ADD CONSTRAINT \`FK_cf336e5a3d2e9c4448abbfa594c\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE \`phase\` ADD CONSTRAINT \`FK_a251d108b40a8021a4359caeb7e\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e195b4c478ace2cf124c13ed11e\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_f05fcc9b589876b45e82e17b313\` FOREIGN KEY (\`detailId\`) REFERENCES \`detail\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`ventures_sectors\` ADD CONSTRAINT \`FK_cdac3f38cf086f7dc962713fa12\` FOREIGN KEY (\`ventureId\`) REFERENCES \`venture\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`ventures_sectors\` ADD CONSTRAINT \`FK_fad1d549fe046d8ad32c0b66b35\` FOREIGN KEY (\`sectorId\`) REFERENCES \`sector\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`ventures_sectors\` DROP FOREIGN KEY \`FK_fad1d549fe046d8ad32c0b66b35\``);
    await queryRunner.query(`ALTER TABLE \`ventures_sectors\` DROP FOREIGN KEY \`FK_cdac3f38cf086f7dc962713fa12\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_f05fcc9b589876b45e82e17b313\``);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e195b4c478ace2cf124c13ed11e\``);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP FOREIGN KEY \`FK_a251d108b40a8021a4359caeb7e\``);
    await queryRunner.query(`ALTER TABLE \`document\` DROP FOREIGN KEY \`FK_f2bf8d12e931bb9eee1ec1e9975\``);
    await queryRunner.query(`ALTER TABLE \`requirement\` DROP FOREIGN KEY \`FK_ed3de91a28a36881c5e90283fdd\``);
    await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_b4ae3fea4a24b4be1a86dacf8a2\``);
    await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_cf336e5a3d2e9c4448abbfa594c\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_bea8f7bc6860508ea240f4725ab\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_8d5525f4acba6e2149fb5da4a8c\``);
    await queryRunner.query(
      `ALTER TABLE \`position\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`detail\` DROP COLUMN \`socials\``);
    await queryRunner.query(
      `ALTER TABLE \`detail\` ADD \`socials\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`detail\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
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
      `ALTER TABLE \`role\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
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
    await queryRunner.query(
      `ALTER TABLE \`event_type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`town\` \`town\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`prize\` \`prize\` text NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`aim\` \`aim\` text NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`program\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`type\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`phase\` CHANGE \`programId\` \`programId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP COLUMN \`form\``);
    await queryRunner.query(`ALTER TABLE \`phase\` ADD \`form\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`phase\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`phase\` ADD CONSTRAINT \`FK_a251d108b40a8021a4359caeb7e\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE \`application\` CHANGE \`programId\` \`programId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` ADD CONSTRAINT \`FK_b4ae3fea4a24b4be1a86dacf8a2\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` ADD CONSTRAINT \`FK_cf336e5a3d2e9c4448abbfa594c\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
    await queryRunner.query(`DROP INDEX \`IDX_fad1d549fe046d8ad32c0b66b3\` ON \`ventures_sectors\``);
    await queryRunner.query(`DROP INDEX \`IDX_cdac3f38cf086f7dc962713fa1\` ON \`ventures_sectors\``);
    await queryRunner.query(`DROP TABLE \`ventures_sectors\``);
    await queryRunner.query(`DROP TABLE \`venture\``);
    await queryRunner.query(`DROP TABLE \`sector\``);
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_f05fcc9b589876b45e82e17b31\` ON \`user\` (\`detailId\`)`);
  }
}
