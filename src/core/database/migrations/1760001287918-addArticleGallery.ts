import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddArticleGallery1760001287918 implements MigrationInterface {
  name = 'AddArticleGallery1760001287918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`FK_c20404221e5c125a581a0d90c0e\` ON \`comment\``);
    await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`report\``);
    await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`report\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` ADD \`articleId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`tag\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
    await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`articleId\` \`articleId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`authorId\` \`authorId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`project_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`event_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e2bd221f0e1dcb7bf8174b6ba59\``);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`cover\` \`cover\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`form_link\` \`form_link\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`program_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
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
    await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_fa6003036f502fb124c57f13080\``);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`slug\` \`slug\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`product\` ADD UNIQUE INDEX \`IDX_8cfaf4a1e80806d58e3dbe6922\` (\`slug\`)`);
    await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`ventureId\` \`ventureId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_2333764d08e85c0259506c63a2e\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_52f7381ee56eaf55091dd1aa93c\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_41839277ae45f33d22c884ee9d8\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_c2328552a8f2dce52b5237ef6f9\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`projectId\` \`projectId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`eventId\` \`eventId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`productId\` \`productId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`gallery\` CHANGE \`ventureId\` \`ventureId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_a9c5f4ec6cceb1604b4a3c84c87\``);
    await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`summary\` \`summary\` longtext NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`content\` \`content\` longtext NOT NULL`);
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
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`reason\` \`reason\` varchar(255) NULL`);
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
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e2bd221f0e1dcb7bf8174b6ba59\` FOREIGN KEY (\`programId\`) REFERENCES \`subprogram\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_fa6003036f502fb124c57f13080\` FOREIGN KEY (\`ventureId\`) REFERENCES \`venture\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
    await queryRunner.query(
      `ALTER TABLE \`article_tags_tag\` ADD CONSTRAINT \`FK_9b7dd28292e2799512cd70bfd81\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`article_tags_tag\` DROP FOREIGN KEY \`FK_9b7dd28292e2799512cd70bfd81\``);
    await queryRunner.query(`ALTER TABLE \`venture\` DROP FOREIGN KEY \`FK_6fbaf21ef151926c152487526d7\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_adc492faf309ebf60ca6425e183\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_a9c5f4ec6cceb1604b4a3c84c87\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_4204d7deec7c9c429d09eb638e2\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_c2328552a8f2dce52b5237ef6f9\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_41839277ae45f33d22c884ee9d8\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_52f7381ee56eaf55091dd1aa93c\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_2333764d08e85c0259506c63a2e\``);
    await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_fa6003036f502fb124c57f13080\``);
    await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_d4774e6a2f0abb35049d3850e8f\``);
    await queryRunner.query(`ALTER TABLE \`subprogram\` DROP FOREIGN KEY \`FK_40fa1dbc3904326965f9f0f5096\``);
    await queryRunner.query(`ALTER TABLE \`program\` DROP FOREIGN KEY \`FK_509990a43111b507a484116e0e5\``);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e2bd221f0e1dcb7bf8174b6ba59\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c20404221e5c125a581a0d90c0e\``);
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`ownerId\` \`ownerId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`stage\` \`stage\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`location\` \`location\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`venture\` CHANGE \`founded_at\` \`founded_at\` date NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`sector\` \`sector\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`linkedin_url\` \`linkedin_url\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`website\` \`website\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`phone_number\` \`phone_number\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`email\` \`email\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`cover\` \`cover\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`logo\` \`logo\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`venture\` ADD CONSTRAINT \`FK_6fbaf21ef151926c152487526d7\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`referredById\` \`referredById\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`referral_code\` \`referral_code\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`reason\` \`reason\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`profile\` \`profile\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`google_image\` \`google_image\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`birth_date\` \`birth_date\` datetime NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`country\` \`country\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`city\` \`city\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`biography\` \`biography\` text CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_adc492faf309ebf60ca6425e183\` FOREIGN KEY (\`referredById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` CHANGE \`authorId\` \`authorId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` CHANGE \`published_at\` \`published_at\` datetime NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`content\` \`content\` longtext NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`article\` CHANGE \`summary\` \`summary\` longtext CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` CHANGE \`image\` \`image\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD CONSTRAINT \`FK_a9c5f4ec6cceb1604b4a3c84c87\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` CHANGE \`ventureId\` \`ventureId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` CHANGE \`productId\` \`productId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` CHANGE \`eventId\` \`eventId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` CHANGE \`projectId\` \`projectId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` CHANGE \`image\` \`image\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`gallery\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
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
      `ALTER TABLE \`product\` CHANGE \`ventureId\` \`ventureId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP INDEX \`IDX_8cfaf4a1e80806d58e3dbe6922\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`slug\` \`slug\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_fa6003036f502fb124c57f13080\` FOREIGN KEY (\`ventureId\`) REFERENCES \`venture\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`programId\` \`programId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`form_link\` \`form_link\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`cover\` \`cover\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_d4774e6a2f0abb35049d3850e8f\` FOREIGN KEY (\`programId\`) REFERENCES \`subprogram\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`subprogram\` CHANGE \`programId\` \`programId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`subprogram\` CHANGE \`logo\` \`logo\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`subprogram\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`subprogram\` ADD CONSTRAINT \`FK_40fa1dbc3904326965f9f0f5096\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`program\` CHANGE \`categoryId\` \`categoryId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`program\` CHANGE \`logo\` \`logo\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`program\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`program\` ADD CONSTRAINT \`FK_509990a43111b507a484116e0e5\` FOREIGN KEY (\`categoryId\`) REFERENCES \`program_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`program_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`programId\` \`programId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`form_link\` \`form_link\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`cover\` \`cover\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
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
      `ALTER TABLE \`project_category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` CHANGE \`authorId\` \`authorId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` CHANGE \`articleId\` \`articleId\` varchar(36) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_276779da446413a0d79598d4fbd\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`tag\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`role\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP COLUMN \`articleId\``);
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD \`report\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`event\` ADD \`report\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`);
    await queryRunner.query(`CREATE INDEX \`FK_c20404221e5c125a581a0d90c0e\` ON \`comment\` (\`articleId\`)`);
  }
}
