import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1744361522682 implements MigrationInterface {
  name = 'Init1744361522682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`review\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`status\` enum ('pending', 'cartography', 'exploration', 'experimentation') NOT NULL DEFAULT 'pending', \`data\` json NOT NULL, \`applicationId\` varchar(36) NULL, \`reviewerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`application\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`answers\` json NOT NULL, \`projectId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`projectsCategory\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`document\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`file_name\` varchar(255) NULL, \`programId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`phase\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`started_at\` datetime NOT NULL, \`ended_at\` datetime NOT NULL, \`requirements\` json NULL, \`projectId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`eventsCategory\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`event\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`place\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`started_at\` date NOT NULL, \`is_published\` tinyint NOT NULL DEFAULT 0, \`link\` varchar(255) NULL, \`ended_at\` date NOT NULL, \`programId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`program\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`project\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`description\` text NOT NULL, \`requirements\` json NULL, \`started_at\` date NOT NULL, \`ended_at\` date NOT NULL, \`form\` json NULL, \`review_form\` json NULL, \`is_published\` tinyint NOT NULL DEFAULT 0, \`programId\` varchar(36) NULL, UNIQUE INDEX \`IDX_6fce32ddd71197807027be6ad3\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`postsCategory\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`comment\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`content\` text NOT NULL, \`byId\` varchar(36) NULL, \`postId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`views\` int NOT NULL DEFAULT '0', \`content\` text NOT NULL, \`image\` varchar(255) NULL, \`authorId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
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
      `CREATE TABLE \`membersCategory\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`member\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`website\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`description\` text NULL, \`logo\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`event_categories_events_category\` (\`eventId\` varchar(36) NOT NULL, \`eventsCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_6c52da2816227595d9458d8b54\` (\`eventId\`), INDEX \`IDX_df2d69aad4d88d1a426e01be1f\` (\`eventsCategoryId\`), PRIMARY KEY (\`eventId\`, \`eventsCategoryId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`project_categories_projects_category\` (\`projectId\` varchar(36) NOT NULL, \`projectsCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_bbf00d20e490cc867974ad59c2\` (\`projectId\`), INDEX \`IDX_74f532443feb087c1f72b5e5cd\` (\`projectsCategoryId\`), PRIMARY KEY (\`projectId\`, \`projectsCategoryId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`post_categories_posts_category\` (\`postId\` varchar(36) NOT NULL, \`postsCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_b25754e2379fc92edd8f6dc1bc\` (\`postId\`), INDEX \`IDX_970b972ade63e4f03e79ef3af4\` (\`postsCategoryId\`), PRIMARY KEY (\`postId\`, \`postsCategoryId\`)) ENGINE=InnoDB`
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
      `CREATE TABLE \`member_categories_members_category\` (\`memberId\` varchar(36) NOT NULL, \`membersCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_c2b75898caabe9347b4d141ea8\` (\`memberId\`), INDEX \`IDX_c93e05a0ca989039081ec11051\` (\`membersCategoryId\`), PRIMARY KEY (\`memberId\`, \`membersCategoryId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_8d5525f4acba6e2149fb5da4a8c\` FOREIGN KEY (\`applicationId\`) REFERENCES \`application\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_34413365b39e3bf5bea866569b4\` FOREIGN KEY (\`reviewerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` ADD CONSTRAINT \`FK_e69389177ac594d36dea539f276\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`application\` ADD CONSTRAINT \`FK_b4ae3fea4a24b4be1a86dacf8a2\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`document\` ADD CONSTRAINT \`FK_f2bf8d12e931bb9eee1ec1e9975\` FOREIGN KEY (\`programId\`) REFERENCES \`phase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`phase\` ADD CONSTRAINT \`FK_ac2930f63ac7178530329b4b219\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c6fb082a3114f35d0cc27c518e0\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`event_categories_events_category\` ADD CONSTRAINT \`FK_6c52da2816227595d9458d8b54b\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`event_categories_events_category\` ADD CONSTRAINT \`FK_df2d69aad4d88d1a426e01be1ff\` FOREIGN KEY (\`eventsCategoryId\`) REFERENCES \`eventsCategory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories_projects_category\` ADD CONSTRAINT \`FK_bbf00d20e490cc867974ad59c2a\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories_projects_category\` ADD CONSTRAINT \`FK_74f532443feb087c1f72b5e5cdd\` FOREIGN KEY (\`projectsCategoryId\`) REFERENCES \`projectsCategory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`post_categories_posts_category\` ADD CONSTRAINT \`FK_b25754e2379fc92edd8f6dc1bcc\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`post_categories_posts_category\` ADD CONSTRAINT \`FK_970b972ade63e4f03e79ef3af43\` FOREIGN KEY (\`postsCategoryId\`) REFERENCES \`postsCategory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE \`member_categories_members_category\` ADD CONSTRAINT \`FK_c2b75898caabe9347b4d141ea82\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`member_categories_members_category\` ADD CONSTRAINT \`FK_c93e05a0ca989039081ec110513\` FOREIGN KEY (\`membersCategoryId\`) REFERENCES \`membersCategory\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`member_categories_members_category\` DROP FOREIGN KEY \`FK_c93e05a0ca989039081ec110513\``
    );
    await queryRunner.query(
      `ALTER TABLE \`member_categories_members_category\` DROP FOREIGN KEY \`FK_c2b75898caabe9347b4d141ea82\``
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
      `ALTER TABLE \`post_categories_posts_category\` DROP FOREIGN KEY \`FK_970b972ade63e4f03e79ef3af43\``
    );
    await queryRunner.query(
      `ALTER TABLE \`post_categories_posts_category\` DROP FOREIGN KEY \`FK_b25754e2379fc92edd8f6dc1bcc\``
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories_projects_category\` DROP FOREIGN KEY \`FK_74f532443feb087c1f72b5e5cdd\``
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories_projects_category\` DROP FOREIGN KEY \`FK_bbf00d20e490cc867974ad59c2a\``
    );
    await queryRunner.query(
      `ALTER TABLE \`event_categories_events_category\` DROP FOREIGN KEY \`FK_df2d69aad4d88d1a426e01be1ff\``
    );
    await queryRunner.query(
      `ALTER TABLE \`event_categories_events_category\` DROP FOREIGN KEY \`FK_6c52da2816227595d9458d8b54b\``
    );
    await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c6fb082a3114f35d0cc27c518e0\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_d182905d4bfdd0ccae6b3d6c736\``);
    await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_d4774e6a2f0abb35049d3850e8f\``);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e2bd221f0e1dcb7bf8174b6ba59\``);
    await queryRunner.query(`ALTER TABLE \`phase\` DROP FOREIGN KEY \`FK_ac2930f63ac7178530329b4b219\``);
    await queryRunner.query(`ALTER TABLE \`document\` DROP FOREIGN KEY \`FK_f2bf8d12e931bb9eee1ec1e9975\``);
    await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_b4ae3fea4a24b4be1a86dacf8a2\``);
    await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_e69389177ac594d36dea539f276\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_34413365b39e3bf5bea866569b4\``);
    await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_8d5525f4acba6e2149fb5da4a8c\``);
    await queryRunner.query(`DROP INDEX \`IDX_c93e05a0ca989039081ec11051\` ON \`member_categories_members_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_c2b75898caabe9347b4d141ea8\` ON \`member_categories_members_category\``);
    await queryRunner.query(`DROP TABLE \`member_categories_members_category\``);
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
    await queryRunner.query(`DROP INDEX \`IDX_970b972ade63e4f03e79ef3af4\` ON \`post_categories_posts_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_b25754e2379fc92edd8f6dc1bc\` ON \`post_categories_posts_category\``);
    await queryRunner.query(`DROP TABLE \`post_categories_posts_category\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_74f532443feb087c1f72b5e5cd\` ON \`project_categories_projects_category\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_bbf00d20e490cc867974ad59c2\` ON \`project_categories_projects_category\``
    );
    await queryRunner.query(`DROP TABLE \`project_categories_projects_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_df2d69aad4d88d1a426e01be1f\` ON \`event_categories_events_category\``);
    await queryRunner.query(`DROP INDEX \`IDX_6c52da2816227595d9458d8b54\` ON \`event_categories_events_category\``);
    await queryRunner.query(`DROP TABLE \`event_categories_events_category\``);
    await queryRunner.query(`DROP TABLE \`member\``);
    await queryRunner.query(`DROP TABLE \`membersCategory\``);
    await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`expertise\``);
    await queryRunner.query(`DROP TABLE \`position\``);
    await queryRunner.query(`DROP TABLE \`post\``);
    await queryRunner.query(`DROP TABLE \`comment\``);
    await queryRunner.query(`DROP TABLE \`postsCategory\``);
    await queryRunner.query(`DROP INDEX \`IDX_6fce32ddd71197807027be6ad3\` ON \`project\``);
    await queryRunner.query(`DROP TABLE \`project\``);
    await queryRunner.query(`DROP TABLE \`program\``);
    await queryRunner.query(`DROP TABLE \`event\``);
    await queryRunner.query(`DROP TABLE \`eventsCategory\``);
    await queryRunner.query(`DROP TABLE \`phase\``);
    await queryRunner.query(`DROP TABLE \`document\``);
    await queryRunner.query(`DROP TABLE \`projectsCategory\``);
    await queryRunner.query(`DROP TABLE \`application\``);
    await queryRunner.query(`DROP TABLE \`review\``);
    await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
    await queryRunner.query(`DROP TABLE \`role\``);
  }
}
