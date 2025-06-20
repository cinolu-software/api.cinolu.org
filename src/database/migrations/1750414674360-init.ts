import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1750414674360 implements MigrationInterface {
  name = 'Init1750414674360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`project_category\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`event_category\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`event\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`cover\` varchar(255) NULL, \`report\` json NULL, \`place\` varchar(255) NOT NULL, \`description\` longtext NOT NULL, \`started_at\` date NOT NULL, \`is_published\` tinyint NOT NULL DEFAULT 0, \`form_link\` varchar(255) NULL, \`ended_at\` date NOT NULL, \`programId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`program\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`project\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`cover\` varchar(255) NULL, \`report\` json NULL, \`description\` longtext NOT NULL, \`started_at\` date NOT NULL, \`ended_at\` date NOT NULL, \`form_link\` varchar(255) NULL, \`is_published\` tinyint NOT NULL DEFAULT 0, \`programId\` varchar(36) NULL, UNIQUE INDEX \`IDX_6fce32ddd71197807027be6ad3\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`comment\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`content\` text NOT NULL, \`byId\` varchar(36) NULL, \`postId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`post_views\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`ip\` varchar(255) NOT NULL, \`postId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`post_category\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`image\` varchar(255) NULL, \`authorId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`position\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`expertise\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`biography\` text NULL, \`phone_number\` varchar(255) NULL, \`address\` varchar(255) NULL, \`google_image\` varchar(255) NULL, \`profile\` varchar(255) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`product_category\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`product_image\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`image\` varchar(255) NOT NULL, \`productId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`slug\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`price\` decimal(10,2) NULL, \`enterpriseId\` varchar(36) NULL, UNIQUE INDEX \`IDX_8cfaf4a1e80806d58e3dbe6922\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`enterprise\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`problem_solved\` text NOT NULL, \`target_market\` text NOT NULL, \`logo\` varchar(255) NULL, \`cover\` varchar(255) NULL, \`email\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`website\` varchar(255) NULL, \`linkedin_url\` varchar(255) NULL, \`sector\` varchar(255) NULL, \`founded_at\` date NULL, \`location\` varchar(255) NULL, \`stage\` varchar(255) NULL, UNIQUE INDEX \`IDX_3bdc3ada024a9cc270f429832e\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`event_categories_event_category\` (\`eventId\` varchar(36) NOT NULL, \`eventCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_177565f9389cf31d3bef16492f\` (\`eventId\`), INDEX \`IDX_7d468965c200f1e51c135750c2\` (\`eventCategoryId\`), PRIMARY KEY (\`eventId\`, \`eventCategoryId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`project_categories_project_category\` (\`projectId\` varchar(36) NOT NULL, \`projectCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_3ee0df04e977876c62d80a02c9\` (\`projectId\`), INDEX \`IDX_a3cbe0c9bb3c258e01d3a603e0\` (\`projectCategoryId\`), PRIMARY KEY (\`projectId\`, \`projectCategoryId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`post_categories_post_category\` (\`postId\` varchar(36) NOT NULL, \`postCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_863515409b188304a99648be61\` (\`postId\`), INDEX \`IDX_de2e6ceb3d924b025dafffb0b0\` (\`postCategoryId\`), PRIMARY KEY (\`postId\`, \`postCategoryId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_roles_role\` (\`userId\` varchar(36) NOT NULL, \`roleId\` varchar(36) NOT NULL, INDEX \`IDX_5f9286e6c25594c6b88c108db7\` (\`userId\`), INDEX \`IDX_4be2f7adf862634f5f803d246b\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_projects_project\` (\`userId\` varchar(36) NOT NULL, \`projectId\` varchar(36) NOT NULL, INDEX \`IDX_79daf0d2be103f4c30c77ddd6b\` (\`userId\`), INDEX \`IDX_936561888bfd63d01c79fe415c\` (\`projectId\`), PRIMARY KEY (\`userId\`, \`projectId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_postions_position\` (\`userId\` varchar(36) NOT NULL, \`positionId\` varchar(36) NOT NULL, INDEX \`IDX_2ae2656820cda3ec0f894fcf7d\` (\`userId\`), INDEX \`IDX_7bb074196b373389fee5ea56ac\` (\`positionId\`), PRIMARY KEY (\`userId\`, \`positionId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_expertises_expertise\` (\`userId\` varchar(36) NOT NULL, \`expertiseId\` varchar(36) NOT NULL, INDEX \`IDX_968b205a0347113d422a40e48a\` (\`userId\`), INDEX \`IDX_44686bc8b33bab05ad204eac17\` (\`expertiseId\`), PRIMARY KEY (\`userId\`, \`expertiseId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`product_categories_product_category\` (\`productId\` varchar(36) NOT NULL, \`productCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_37c2bc279249bec81521f8fe89\` (\`productId\`), INDEX \`IDX_8862dee67b712ea20963c464e8\` (\`productCategoryId\`), PRIMARY KEY (\`productId\`, \`productCategoryId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e2bd221f0e1dcb7bf8174b6ba59\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_d4774e6a2f0abb35049d3850e8f\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_d182905d4bfdd0ccae6b3d6c736\` FOREIGN KEY (\`byId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`post_views\` ADD CONSTRAINT \`FK_a05ca4e99f3345db11cfe91ee6e\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c6fb082a3114f35d0cc27c518e0\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`product_image\` ADD CONSTRAINT \`FK_40ca0cd115ef1ff35351bed8da2\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ab3474eee85c36ad4a781f24694\` FOREIGN KEY (\`enterpriseId\`) REFERENCES \`enterprise\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE \`post_categories_post_category\` ADD CONSTRAINT \`FK_863515409b188304a99648be619\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`post_categories_post_category\` ADD CONSTRAINT \`FK_de2e6ceb3d924b025dafffb0b0e\` FOREIGN KEY (\`postCategoryId\`) REFERENCES \`post_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
    await queryRunner.query(
      `ALTER TABLE \`user_postions_position\` ADD CONSTRAINT \`FK_2ae2656820cda3ec0f894fcf7d9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_postions_position\` ADD CONSTRAINT \`FK_7bb074196b373389fee5ea56ac7\` FOREIGN KEY (\`positionId\`) REFERENCES \`position\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_expertises_expertise\` ADD CONSTRAINT \`FK_968b205a0347113d422a40e48a6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_expertises_expertise\` ADD CONSTRAINT \`FK_44686bc8b33bab05ad204eac17e\` FOREIGN KEY (\`expertiseId\`) REFERENCES \`expertise\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`product_categories_product_category\` ADD CONSTRAINT \`FK_37c2bc279249bec81521f8fe89b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`product_categories_product_category\` ADD CONSTRAINT \`FK_8862dee67b712ea20963c464e88\` FOREIGN KEY (\`productCategoryId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_categories_product_category\` DROP FOREIGN KEY \`FK_8862dee67b712ea20963c464e88\``
    );
    await queryRunner.query(
      `ALTER TABLE \`product_categories_product_category\` DROP FOREIGN KEY \`FK_37c2bc279249bec81521f8fe89b\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user_expertises_expertise\` DROP FOREIGN KEY \`FK_44686bc8b33bab05ad204eac17e\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user_expertises_expertise\` DROP FOREIGN KEY \`FK_968b205a0347113d422a40e48a6\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user_postions_position\` DROP FOREIGN KEY \`FK_7bb074196b373389fee5ea56ac7\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user_postions_position\` DROP FOREIGN KEY \`FK_2ae2656820cda3ec0f894fcf7d9\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user_projects_project\` DROP FOREIGN KEY \`FK_936561888bfd63d01c79fe415c3\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user_projects_project\` DROP FOREIGN KEY \`FK_79daf0d2be103f4c30c77ddd6be\``
    );
    await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_4be2f7adf862634f5f803d246b8\``);
    await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_5f9286e6c25594c6b88c108db77\``);
    await queryRunner.query(
      `ALTER TABLE \`post_categories_post_category\` DROP FOREIGN KEY \`FK_de2e6ceb3d924b025dafffb0b0e\``
    );
    await queryRunner.query(
      `ALTER TABLE \`post_categories_post_category\` DROP FOREIGN KEY \`FK_863515409b188304a99648be619\``
    );
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
    await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ab3474eee85c36ad4a781f24694\``);
    await queryRunner.query(`ALTER TABLE \`product_image\` DROP FOREIGN KEY \`FK_40ca0cd115ef1ff35351bed8da2\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c6fb082a3114f35d0cc27c518e0\``);
    await queryRunner.query(`ALTER TABLE \`post_views\` DROP FOREIGN KEY \`FK_a05ca4e99f3345db11cfe91ee6e\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_d182905d4bfdd0ccae6b3d6c736\``);
    await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_d4774e6a2f0abb35049d3850e8f\``);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e2bd221f0e1dcb7bf8174b6ba59\``);
    await queryRunner.query(`DROP INDEX \`IDX_8862dee67b712ea20963c464e8\` ON \`product_categories_product_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_37c2bc279249bec81521f8fe89\` ON \`product_categories_product_category\``);
    await queryRunner.query(`DROP TABLE \`product_categories_product_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_44686bc8b33bab05ad204eac17\` ON \`user_expertises_expertise\``);
    await queryRunner.query(`DROP INDEX \`IDX_968b205a0347113d422a40e48a\` ON \`user_expertises_expertise\``);
    await queryRunner.query(`DROP TABLE \`user_expertises_expertise\``);
    await queryRunner.query(`DROP INDEX \`IDX_7bb074196b373389fee5ea56ac\` ON \`user_postions_position\``);
    await queryRunner.query(`DROP INDEX \`IDX_2ae2656820cda3ec0f894fcf7d\` ON \`user_postions_position\``);
    await queryRunner.query(`DROP TABLE \`user_postions_position\``);
    await queryRunner.query(`DROP INDEX \`IDX_936561888bfd63d01c79fe415c\` ON \`user_projects_project\``);
    await queryRunner.query(`DROP INDEX \`IDX_79daf0d2be103f4c30c77ddd6b\` ON \`user_projects_project\``);
    await queryRunner.query(`DROP TABLE \`user_projects_project\``);
    await queryRunner.query(`DROP INDEX \`IDX_4be2f7adf862634f5f803d246b\` ON \`user_roles_role\``);
    await queryRunner.query(`DROP INDEX \`IDX_5f9286e6c25594c6b88c108db7\` ON \`user_roles_role\``);
    await queryRunner.query(`DROP TABLE \`user_roles_role\``);
    await queryRunner.query(`DROP INDEX \`IDX_de2e6ceb3d924b025dafffb0b0\` ON \`post_categories_post_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_863515409b188304a99648be61\` ON \`post_categories_post_category\``);
    await queryRunner.query(`DROP TABLE \`post_categories_post_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_a3cbe0c9bb3c258e01d3a603e0\` ON \`project_categories_project_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_3ee0df04e977876c62d80a02c9\` ON \`project_categories_project_category\``);
    await queryRunner.query(`DROP TABLE \`project_categories_project_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_7d468965c200f1e51c135750c2\` ON \`event_categories_event_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_177565f9389cf31d3bef16492f\` ON \`event_categories_event_category\``);
    await queryRunner.query(`DROP TABLE \`event_categories_event_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_3bdc3ada024a9cc270f429832e\` ON \`enterprise\``);
    await queryRunner.query(`DROP TABLE \`enterprise\``);
    await queryRunner.query(`DROP INDEX \`IDX_8cfaf4a1e80806d58e3dbe6922\` ON \`product\``);
    await queryRunner.query(`DROP TABLE \`product\``);
    await queryRunner.query(`DROP TABLE \`product_image\``);
    await queryRunner.query(`DROP TABLE \`product_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`expertise\``);
    await queryRunner.query(`DROP TABLE \`position\``);
    await queryRunner.query(`DROP TABLE \`post\``);
    await queryRunner.query(`DROP TABLE \`post_category\``);
    await queryRunner.query(`DROP TABLE \`post_views\``);
    await queryRunner.query(`DROP TABLE \`comment\``);
    await queryRunner.query(`DROP INDEX \`IDX_6fce32ddd71197807027be6ad3\` ON \`project\``);
    await queryRunner.query(`DROP TABLE \`project\``);
    await queryRunner.query(`DROP TABLE \`program\``);
    await queryRunner.query(`DROP TABLE \`event\``);
    await queryRunner.query(`DROP TABLE \`event_category\``);
    await queryRunner.query(`DROP TABLE \`project_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
    await queryRunner.query(`DROP TABLE \`role\``);
  }
}
