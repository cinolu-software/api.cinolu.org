import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMetric1761038979534 implements MigrationInterface {
  name = 'AddMetric1761038979534';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`indicator\` DROP FOREIGN KEY \`FK_955836a2ed0958410a563abc5a8\``);
    await queryRunner.query(`ALTER TABLE \`indicator\` DROP FOREIGN KEY \`FK_cf75040eacb66aa029437516f8f\``);
    await queryRunner.query(
      `CREATE TABLE \`metric\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`target\` float NULL, \`achieved\` float NULL, \`is_public\` tinyint NOT NULL DEFAULT 0, \`indicatorId\` varchar(36) NULL, \`eventId\` varchar(36) NULL, \`projectId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(`ALTER TABLE \`indicator\` DROP COLUMN \`value\``);
    await queryRunner.query(`ALTER TABLE \`indicator\` DROP COLUMN \`projectId\``);
    await queryRunner.query(`ALTER TABLE \`indicator\` DROP COLUMN \`eventId\``);
    await queryRunner.query(`ALTER TABLE \`indicator\` ADD \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`tag\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c20404221e5c125a581a0d90c0e\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
    await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`articleId\` \`articleId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`authorId\` \`authorId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_fa6003036f502fb124c57f13080\``);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`ventureId\` \`ventureId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`project_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`program_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`event_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e2bd221f0e1dcb7bf8174b6ba59\``);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`cover\` \`cover\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`form_link\` \`form_link\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`indicator\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`program\` DROP FOREIGN KEY \`FK_509990a43111b507a484116e0e5\``);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`logo\` \`logo\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`categoryId\` \`categoryId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`subprogram\` DROP FOREIGN KEY \`FK_40fa1dbc3904326965f9f0f5096\``);
    await queryRunner.query(`ALTER TABLE \`subprogram\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`subprogram\` CHANGE \`logo\` \`logo\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`subprogram\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_d4774e6a2f0abb35049d3850e8f\``);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`cover\` \`cover\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`form_link\` \`form_link\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_2333764d08e85c0259506c63a2e\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_52f7381ee56eaf55091dd1aa93c\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_41839277ae45f33d22c884ee9d8\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_c2328552a8f2dce52b5237ef6f9\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_4204d7deec7c9c429d09eb638e2\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`projectId\` \`projectId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`eventId\` \`eventId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`productId\` \`productId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`ventureId\` \`ventureId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`articleId\` \`articleId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_a9c5f4ec6cceb1604b4a3c84c87\``);
    await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`published_at\` \`published_at\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`authorId\` \`authorId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_adc492faf309ebf60ca6425e183\``);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`biography\` \`biography\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`city\` \`city\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`country\` \`country\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`birth_date\` \`birth_date\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`google_image\` \`google_image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profile\` \`profile\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`referral_code\` \`referral_code\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`referredById\` \`referredById\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` DROP FOREIGN KEY \`FK_6fbaf21ef151926c152487526d7\``);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`logo\` \`logo\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`cover\` \`cover\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`email\` \`email\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`website\` \`website\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`linkedin_url\` \`linkedin_url\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`sector\` \`sector\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`founded_at\` \`founded_at\` date NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`location\` \`location\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`stage\` \`stage\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`ownerId\` \`ownerId\` varchar(36) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c20404221e5c125a581a0d90c0e\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_276779da446413a0d79598d4fbd\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_fa6003036f502fb124c57f13080\` FOREIGN KEY (\`ventureId\`) REFERENCES \`venture\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e2bd221f0e1dcb7bf8174b6ba59\` FOREIGN KEY (\`programId\`) REFERENCES \`subprogram\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`metric\` ADD CONSTRAINT \`FK_bc02abe5a998678b14618deb3d2\` FOREIGN KEY (\`indicatorId\`) REFERENCES \`indicator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`metric\` ADD CONSTRAINT \`FK_968af6183a6c449f5b862f986a5\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`metric\` ADD CONSTRAINT \`FK_e349d5c307cf8c81c38cd95b699\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`indicator\` ADD CONSTRAINT \`FK_342aaa11a43bc24878d1c33a48f\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`program\` ADD CONSTRAINT \`FK_509990a43111b507a484116e0e5\` FOREIGN KEY (\`categoryId\`) REFERENCES \`program_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`subprogram\` ADD CONSTRAINT \`FK_40fa1dbc3904326965f9f0f5096\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_d4774e6a2f0abb35049d3850e8f\` FOREIGN KEY (\`programId\`) REFERENCES \`subprogram\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` ADD CONSTRAINT \`FK_2333764d08e85c0259506c63a2e\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` ADD CONSTRAINT \`FK_52f7381ee56eaf55091dd1aa93c\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` ADD CONSTRAINT \`FK_41839277ae45f33d22c884ee9d8\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` ADD CONSTRAINT \`FK_c2328552a8f2dce52b5237ef6f9\` FOREIGN KEY (\`ventureId\`) REFERENCES \`venture\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` ADD CONSTRAINT \`FK_4204d7deec7c9c429d09eb638e2\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD CONSTRAINT \`FK_a9c5f4ec6cceb1604b4a3c84c87\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_adc492faf309ebf60ca6425e183\` FOREIGN KEY (\`referredById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` ADD CONSTRAINT \`FK_6fbaf21ef151926c152487526d7\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`venture\` DROP FOREIGN KEY \`FK_6fbaf21ef151926c152487526d7\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_adc492faf309ebf60ca6425e183\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_a9c5f4ec6cceb1604b4a3c84c87\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_4204d7deec7c9c429d09eb638e2\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_c2328552a8f2dce52b5237ef6f9\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_41839277ae45f33d22c884ee9d8\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_52f7381ee56eaf55091dd1aa93c\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_2333764d08e85c0259506c63a2e\``);
    await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_d4774e6a2f0abb35049d3850e8f\``);
    await queryRunner.query(`ALTER TABLE \`subprogram\` DROP FOREIGN KEY \`FK_40fa1dbc3904326965f9f0f5096\``);
    await queryRunner.query(`ALTER TABLE \`program\` DROP FOREIGN KEY \`FK_509990a43111b507a484116e0e5\``);
    await queryRunner.query(`ALTER TABLE \`indicator\` DROP FOREIGN KEY \`FK_342aaa11a43bc24878d1c33a48f\``);
    await queryRunner.query(`ALTER TABLE \`metric\` DROP FOREIGN KEY \`FK_e349d5c307cf8c81c38cd95b699\``);
    await queryRunner.query(`ALTER TABLE \`metric\` DROP FOREIGN KEY \`FK_968af6183a6c449f5b862f986a5\``);
    await queryRunner.query(`ALTER TABLE \`metric\` DROP FOREIGN KEY \`FK_bc02abe5a998678b14618deb3d2\``);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e2bd221f0e1dcb7bf8174b6ba59\``);
    await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_fa6003036f502fb124c57f13080\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c20404221e5c125a581a0d90c0e\``);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`ownerId\` \`ownerId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`stage\` \`stage\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`location\` \`location\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`founded_at\` \`founded_at\` date NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`sector\` \`sector\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`linkedin_url\` \`linkedin_url\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`website\` \`website\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`cover\` \`cover\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`logo\` \`logo\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` ADD CONSTRAINT \`FK_6fbaf21ef151926c152487526d7\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`referredById\` \`referredById\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`referral_code\` \`referral_code\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profile\` \`profile\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`google_image\` \`google_image\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`birth_date\` \`birth_date\` datetime NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`country\` \`country\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`city\` \`city\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`biography\` \`biography\` text NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_adc492faf309ebf60ca6425e183\` FOREIGN KEY (\`referredById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`authorId\` \`authorId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`article\` CHANGE \`published_at\` \`published_at\` datetime NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`article\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD CONSTRAINT \`FK_a9c5f4ec6cceb1604b4a3c84c87\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` CHANGE \`articleId\` \`articleId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` CHANGE \`ventureId\` \`ventureId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` CHANGE \`productId\` \`productId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`eventId\` \`eventId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`gallery\` CHANGE \`projectId\` \`projectId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`gallery\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` ADD CONSTRAINT \`FK_4204d7deec7c9c429d09eb638e2\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` ADD CONSTRAINT \`FK_c2328552a8f2dce52b5237ef6f9\` FOREIGN KEY (\`ventureId\`) REFERENCES \`venture\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` ADD CONSTRAINT \`FK_41839277ae45f33d22c884ee9d8\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` ADD CONSTRAINT \`FK_52f7381ee56eaf55091dd1aa93c\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` ADD CONSTRAINT \`FK_2333764d08e85c0259506c63a2e\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`programId\` \`programId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`form_link\` \`form_link\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`cover\` \`cover\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_d4774e6a2f0abb35049d3850e8f\` FOREIGN KEY (\`programId\`) REFERENCES \`subprogram\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`subprogram\` CHANGE \`programId\` \`programId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`subprogram\` CHANGE \`logo\` \`logo\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`subprogram\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`subprogram\` ADD CONSTRAINT \`FK_40fa1dbc3904326965f9f0f5096\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`program\` CHANGE \`categoryId\` \`categoryId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`logo\` \`logo\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`program\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`program\` ADD CONSTRAINT \`FK_509990a43111b507a484116e0e5\` FOREIGN KEY (\`categoryId\`) REFERENCES \`program_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`indicator\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`programId\` \`programId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`form_link\` \`form_link\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`cover\` \`cover\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e2bd221f0e1dcb7bf8174b6ba59\` FOREIGN KEY (\`programId\`) REFERENCES \`subprogram\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`event_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`program_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`ventureId\` \`ventureId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_fa6003036f502fb124c57f13080\` FOREIGN KEY (\`ventureId\`) REFERENCES \`venture\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`authorId\` \`authorId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`comment\` CHANGE \`articleId\` \`articleId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_276779da446413a0d79598d4fbd\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c20404221e5c125a581a0d90c0e\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`tag\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`role\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`indicator\` DROP COLUMN \`programId\``);
    await queryRunner.query(`ALTER TABLE \`indicator\` ADD \`eventId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`indicator\` ADD \`projectId\` varchar(36) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`indicator\` ADD \`value\` float(12) NOT NULL`);
    await queryRunner.query(`DROP TABLE \`metric\``);
    await queryRunner.query(
      `ALTER TABLE \`indicator\` ADD CONSTRAINT \`FK_cf75040eacb66aa029437516f8f\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`indicator\` ADD CONSTRAINT \`FK_955836a2ed0958410a563abc5a8\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
