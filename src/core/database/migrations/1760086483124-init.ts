import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1760086483124 implements MigrationInterface {
  name = 'Init1760086483124';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`tag\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6a9775008add570dc3e5a0bab7\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`comment\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`content\` varchar(255) NOT NULL, \`articleId\` varchar(36) NULL, \`authorId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` decimal(10,2) NOT NULL, \`slug\` varchar(255) NOT NULL, \`ventureId\` varchar(36) NULL, UNIQUE INDEX \`IDX_8cfaf4a1e80806d58e3dbe6922\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`project_category\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`event_category\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`program_category\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`program\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`is_highlighted\` tinyint NULL DEFAULT 0, \`logo\` varchar(255) NULL, \`description\` text NOT NULL, \`is_published\` tinyint NOT NULL DEFAULT 0, \`categoryId\` varchar(36) NULL, UNIQUE INDEX \`IDX_47cad5c026f06153b40724baff\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`subprogram\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`is_highlighted\` tinyint NULL DEFAULT 0, \`slug\` varchar(255) NOT NULL, \`logo\` varchar(255) NULL, \`description\` text NOT NULL, \`is_published\` tinyint NOT NULL DEFAULT 0, \`programId\` varchar(36) NULL, UNIQUE INDEX \`IDX_4bd75aeaf19152210bcdbb0ad2\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`event\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`is_highlighted\` tinyint NULL DEFAULT 0, \`cover\` varchar(255) NULL, \`place\` varchar(255) NOT NULL, \`description\` longtext NOT NULL, \`started_at\` date NOT NULL, \`is_published\` tinyint NOT NULL DEFAULT 0, \`form_link\` varchar(255) NULL, \`ended_at\` date NOT NULL, \`programId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`indicator\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`value\` float NOT NULL, \`projectId\` varchar(36) NULL, \`eventId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`project\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`is_highlighted\` tinyint NULL DEFAULT 0, \`slug\` varchar(255) NOT NULL, \`cover\` varchar(255) NULL, \`description\` longtext NOT NULL, \`started_at\` date NOT NULL, \`ended_at\` date NOT NULL, \`form_link\` varchar(255) NULL, \`is_published\` tinyint NOT NULL DEFAULT 0, \`programId\` varchar(36) NULL, UNIQUE INDEX \`IDX_6fce32ddd71197807027be6ad3\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`gallery\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`image\` varchar(255) NULL, \`projectId\` varchar(36) NULL, \`eventId\` varchar(36) NULL, \`productId\` varchar(36) NULL, \`ventureId\` varchar(36) NULL, \`articleId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`article\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`is_highlighted\` tinyint NULL DEFAULT 0, \`summary\` longtext NOT NULL, \`content\` longtext NOT NULL, \`published_at\` datetime NULL, \`authorId\` varchar(36) NULL, UNIQUE INDEX \`IDX_0ab85f4be07b22d79906671d72\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`biography\` text NULL, \`phone_number\` varchar(255) NULL, \`city\` varchar(255) NULL, \`country\` varchar(255) NULL, \`gender\` varchar(255) NULL, \`birth_date\` datetime NULL, \`google_image\` varchar(255) NULL, \`profile\` varchar(255) NULL, \`referral_code\` varchar(255) NULL, \`referredById\` varchar(36) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_b3a2ab3d9733917ef876376be3\` (\`referral_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`venture\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`problem_solved\` text NOT NULL, \`target_market\` text NOT NULL, \`logo\` varchar(255) NULL, \`cover\` varchar(255) NULL, \`email\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`website\` varchar(255) NULL, \`linkedin_url\` varchar(255) NULL, \`sector\` varchar(255) NULL, \`is_published\` tinyint NOT NULL DEFAULT 0, \`founded_at\` date NULL, \`location\` varchar(255) NULL, \`stage\` varchar(255) NULL, \`ownerId\` varchar(36) NULL, UNIQUE INDEX \`IDX_178c50144f7917026343db20a1\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`event_categories_event_category\` (\`eventId\` varchar(36) NOT NULL, \`eventCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_177565f9389cf31d3bef16492f\` (\`eventId\`), INDEX \`IDX_7d468965c200f1e51c135750c2\` (\`eventCategoryId\`), PRIMARY KEY (\`eventId\`, \`eventCategoryId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`project_categories_project_category\` (\`projectId\` varchar(36) NOT NULL, \`projectCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_3ee0df04e977876c62d80a02c9\` (\`projectId\`), INDEX \`IDX_a3cbe0c9bb3c258e01d3a603e0\` (\`projectCategoryId\`), PRIMARY KEY (\`projectId\`, \`projectCategoryId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`article_tags_tag\` (\`articleId\` varchar(36) NOT NULL, \`tagId\` varchar(36) NOT NULL, INDEX \`IDX_9b7dd28292e2799512cd70bfd8\` (\`articleId\`), INDEX \`IDX_5fee2a10f8d6688bd2f2c50f15\` (\`tagId\`), PRIMARY KEY (\`articleId\`, \`tagId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_roles_role\` (\`userId\` varchar(36) NOT NULL, \`roleId\` varchar(36) NOT NULL, INDEX \`IDX_5f9286e6c25594c6b88c108db7\` (\`userId\`), INDEX \`IDX_4be2f7adf862634f5f803d246b\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_projects_project\` (\`userId\` varchar(36) NOT NULL, \`projectId\` varchar(36) NOT NULL, INDEX \`IDX_79daf0d2be103f4c30c77ddd6b\` (\`userId\`), INDEX \`IDX_936561888bfd63d01c79fe415c\` (\`projectId\`), PRIMARY KEY (\`userId\`, \`projectId\`)) ENGINE=InnoDB`
    );
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
      `ALTER TABLE \`program\` ADD CONSTRAINT \`FK_509990a43111b507a484116e0e5\` FOREIGN KEY (\`categoryId\`) REFERENCES \`program_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`subprogram\` ADD CONSTRAINT \`FK_40fa1dbc3904326965f9f0f5096\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e2bd221f0e1dcb7bf8174b6ba59\` FOREIGN KEY (\`programId\`) REFERENCES \`subprogram\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`indicator\` ADD CONSTRAINT \`FK_955836a2ed0958410a563abc5a8\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`indicator\` ADD CONSTRAINT \`FK_cf75040eacb66aa029437516f8f\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
    await queryRunner.query(
      `ALTER TABLE \`event_categories_event_category\` ADD CONSTRAINT \`FK_177565f9389cf31d3bef16492f4\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`event_categories_event_category\` ADD CONSTRAINT \`FK_7d468965c200f1e51c135750c28\` FOREIGN KEY (\`eventCategoryId\`) REFERENCES \`event_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories_project_category\` ADD CONSTRAINT \`FK_3ee0df04e977876c62d80a02c9b\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories_project_category\` ADD CONSTRAINT \`FK_a3cbe0c9bb3c258e01d3a603e02\` FOREIGN KEY (\`projectCategoryId\`) REFERENCES \`project_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`article_tags_tag\` ADD CONSTRAINT \`FK_9b7dd28292e2799512cd70bfd81\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`article_tags_tag\` ADD CONSTRAINT \`FK_5fee2a10f8d6688bd2f2c50f15e\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_5f9286e6c25594c6b88c108db77\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_4be2f7adf862634f5f803d246b8\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_projects_project\` ADD CONSTRAINT \`FK_79daf0d2be103f4c30c77ddd6be\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_projects_project\` ADD CONSTRAINT \`FK_936561888bfd63d01c79fe415c3\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_projects_project\` DROP FOREIGN KEY \`FK_936561888bfd63d01c79fe415c3\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user_projects_project\` DROP FOREIGN KEY \`FK_79daf0d2be103f4c30c77ddd6be\``
    );
    await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_4be2f7adf862634f5f803d246b8\``);
    await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_5f9286e6c25594c6b88c108db77\``);
    await queryRunner.query(`ALTER TABLE \`article_tags_tag\` DROP FOREIGN KEY \`FK_5fee2a10f8d6688bd2f2c50f15e\``);
    await queryRunner.query(`ALTER TABLE \`article_tags_tag\` DROP FOREIGN KEY \`FK_9b7dd28292e2799512cd70bfd81\``);
    await queryRunner.query(
      `ALTER TABLE \`project_categories_project_category\` DROP FOREIGN KEY \`FK_a3cbe0c9bb3c258e01d3a603e02\``
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories_project_category\` DROP FOREIGN KEY \`FK_3ee0df04e977876c62d80a02c9b\``
    );
    await queryRunner.query(
      `ALTER TABLE \`event_categories_event_category\` DROP FOREIGN KEY \`FK_7d468965c200f1e51c135750c28\``
    );
    await queryRunner.query(
      `ALTER TABLE \`event_categories_event_category\` DROP FOREIGN KEY \`FK_177565f9389cf31d3bef16492f4\``
    );
    await queryRunner.query(`ALTER TABLE \`venture\` DROP FOREIGN KEY \`FK_6fbaf21ef151926c152487526d7\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_adc492faf309ebf60ca6425e183\``);
    await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_a9c5f4ec6cceb1604b4a3c84c87\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_4204d7deec7c9c429d09eb638e2\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_c2328552a8f2dce52b5237ef6f9\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_41839277ae45f33d22c884ee9d8\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_52f7381ee56eaf55091dd1aa93c\``);
    await queryRunner.query(`ALTER TABLE \`gallery\` DROP FOREIGN KEY \`FK_2333764d08e85c0259506c63a2e\``);
    await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_d4774e6a2f0abb35049d3850e8f\``);
    await queryRunner.query(`ALTER TABLE \`indicator\` DROP FOREIGN KEY \`FK_cf75040eacb66aa029437516f8f\``);
    await queryRunner.query(`ALTER TABLE \`indicator\` DROP FOREIGN KEY \`FK_955836a2ed0958410a563abc5a8\``);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e2bd221f0e1dcb7bf8174b6ba59\``);
    await queryRunner.query(`ALTER TABLE \`subprogram\` DROP FOREIGN KEY \`FK_40fa1dbc3904326965f9f0f5096\``);
    await queryRunner.query(`ALTER TABLE \`program\` DROP FOREIGN KEY \`FK_509990a43111b507a484116e0e5\``);
    await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_fa6003036f502fb124c57f13080\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c20404221e5c125a581a0d90c0e\``);
    await queryRunner.query(`DROP INDEX \`IDX_936561888bfd63d01c79fe415c\` ON \`user_projects_project\``);
    await queryRunner.query(`DROP INDEX \`IDX_79daf0d2be103f4c30c77ddd6b\` ON \`user_projects_project\``);
    await queryRunner.query(`DROP TABLE \`user_projects_project\``);
    await queryRunner.query(`DROP INDEX \`IDX_4be2f7adf862634f5f803d246b\` ON \`user_roles_role\``);
    await queryRunner.query(`DROP INDEX \`IDX_5f9286e6c25594c6b88c108db7\` ON \`user_roles_role\``);
    await queryRunner.query(`DROP TABLE \`user_roles_role\``);
    await queryRunner.query(`DROP INDEX \`IDX_5fee2a10f8d6688bd2f2c50f15\` ON \`article_tags_tag\``);
    await queryRunner.query(`DROP INDEX \`IDX_9b7dd28292e2799512cd70bfd8\` ON \`article_tags_tag\``);
    await queryRunner.query(`DROP TABLE \`article_tags_tag\``);
    await queryRunner.query(`DROP INDEX \`IDX_a3cbe0c9bb3c258e01d3a603e0\` ON \`project_categories_project_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_3ee0df04e977876c62d80a02c9\` ON \`project_categories_project_category\``);
    await queryRunner.query(`DROP TABLE \`project_categories_project_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_7d468965c200f1e51c135750c2\` ON \`event_categories_event_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_177565f9389cf31d3bef16492f\` ON \`event_categories_event_category\``);
    await queryRunner.query(`DROP TABLE \`event_categories_event_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_178c50144f7917026343db20a1\` ON \`venture\``);
    await queryRunner.query(`DROP TABLE \`venture\``);
    await queryRunner.query(`DROP INDEX \`IDX_b3a2ab3d9733917ef876376be3\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP INDEX \`IDX_0ab85f4be07b22d79906671d72\` ON \`article\``);
    await queryRunner.query(`DROP TABLE \`article\``);
    await queryRunner.query(`DROP TABLE \`gallery\``);
    await queryRunner.query(`DROP INDEX \`IDX_6fce32ddd71197807027be6ad3\` ON \`project\``);
    await queryRunner.query(`DROP TABLE \`project\``);
    await queryRunner.query(`DROP TABLE \`indicator\``);
    await queryRunner.query(`DROP TABLE \`event\``);
    await queryRunner.query(`DROP INDEX \`IDX_4bd75aeaf19152210bcdbb0ad2\` ON \`subprogram\``);
    await queryRunner.query(`DROP TABLE \`subprogram\``);
    await queryRunner.query(`DROP INDEX \`IDX_47cad5c026f06153b40724baff\` ON \`program\``);
    await queryRunner.query(`DROP TABLE \`program\``);
    await queryRunner.query(`DROP TABLE \`program_category\``);
    await queryRunner.query(`DROP TABLE \`event_category\``);
    await queryRunner.query(`DROP TABLE \`project_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_8cfaf4a1e80806d58e3dbe6922\` ON \`product\``);
    await queryRunner.query(`DROP TABLE \`product\``);
    await queryRunner.query(`DROP TABLE \`comment\``);
    await queryRunner.query(`DROP INDEX \`IDX_6a9775008add570dc3e5a0bab7\` ON \`tag\``);
    await queryRunner.query(`DROP TABLE \`tag\``);
    await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
    await queryRunner.query(`DROP TABLE \`role\``);
  }
}
