import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1730968924361 implements MigrationInterface {
  name = 'Init1730968924361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`requirement\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`programId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`partnership\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`partner\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`profile\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`program_type\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`program_category\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`program\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`description\` text NOT NULL, \`started_at\` date NOT NULL, \`ended_at\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`social\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`link\` varchar(255) NOT NULL, \`detailId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`expertise\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`position\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`detail\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`bio\` text NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_e83149aca9ac7b7eedbad3ac43\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`event_type\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`event\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`location\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`started_at\` date NOT NULL, \`attendees_total\` bigint NOT NULL DEFAULT '0', \`attendees_number\` bigint NOT NULL DEFAULT '0', \`ended_at\` date NOT NULL, \`responsibleId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`address\` varchar(255) NULL, \`google_image\` varchar(255) NULL, \`profile\` varchar(255) NULL, \`verified_at\` datetime NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`notification\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`is_read\` tinyint NOT NULL DEFAULT 0, \`to_group\` varchar(255) NULL, \`to_all\` tinyint NULL, \`is_sent\` tinyint NOT NULL DEFAULT 1, \`senderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`attachment\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`programId\` varchar(36) NULL, \`notificationId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`partner_partnerships\` (\`partnerId\` varchar(36) NOT NULL, \`partnershipId\` varchar(36) NOT NULL, INDEX \`IDX_c85a39fefb2689f9f5370287a8\` (\`partnerId\`), INDEX \`IDX_6582d84eb0b6f8300447ed9817\` (\`partnershipId\`), PRIMARY KEY (\`partnerId\`, \`partnershipId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`program_types\` (\`programId\` varchar(36) NOT NULL, \`programTypeId\` varchar(36) NOT NULL, INDEX \`IDX_bdf28310b9d3b46206d4af849e\` (\`programId\`), INDEX \`IDX_6b487aeaed07e040f00b72c2ba\` (\`programTypeId\`), PRIMARY KEY (\`programId\`, \`programTypeId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`program_categories\` (\`programId\` varchar(36) NOT NULL, \`programCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_0024194a585e55ead317be949f\` (\`programId\`), INDEX \`IDX_61cba5da37064204bae386e14f\` (\`programCategoryId\`), PRIMARY KEY (\`programId\`, \`programCategoryId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`program_partners\` (\`programId\` varchar(36) NOT NULL, \`partnerId\` varchar(36) NOT NULL, INDEX \`IDX_0bd24970b5d5af86eb70db324f\` (\`programId\`), INDEX \`IDX_3dc64ed72399fb3c40ffc92257\` (\`partnerId\`), PRIMARY KEY (\`programId\`, \`partnerId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`detail_expertises\` (\`detailId\` varchar(36) NOT NULL, \`expertiseId\` varchar(36) NOT NULL, INDEX \`IDX_7dd9446d9806e9c3824e293b14\` (\`detailId\`), INDEX \`IDX_6bf66263ebbf0068f6f57affa3\` (\`expertiseId\`), PRIMARY KEY (\`detailId\`, \`expertiseId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`detail_positions\` (\`detailId\` varchar(36) NOT NULL, \`positionId\` varchar(36) NOT NULL, INDEX \`IDX_3f240c51458baaedf6f205b694\` (\`detailId\`), INDEX \`IDX_c91842a6257733bde99315bba9\` (\`positionId\`), PRIMARY KEY (\`detailId\`, \`positionId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`event_types\` (\`eventId\` varchar(36) NOT NULL, \`eventTypeId\` varchar(36) NOT NULL, INDEX \`IDX_2d843ba18ac120966355111606\` (\`eventId\`), INDEX \`IDX_d5bbf08cf7d0a3487a362bfcc7\` (\`eventTypeId\`), PRIMARY KEY (\`eventId\`, \`eventTypeId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_roles\` (\`userId\` varchar(36) NOT NULL, \`roleId\` varchar(36) NOT NULL, INDEX \`IDX_472b25323af01488f1f66a06b6\` (\`userId\`), INDEX \`IDX_86033897c009fcca8b6505d6be\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_programs\` (\`userId\` varchar(36) NOT NULL, \`programId\` varchar(36) NOT NULL, INDEX \`IDX_7d62dda22e194c52ee87b7f07e\` (\`userId\`), INDEX \`IDX_71c04fcee4b09dbae1c7085c28\` (\`programId\`), PRIMARY KEY (\`userId\`, \`programId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_notifications\` (\`userId\` varchar(36) NOT NULL, \`notificationId\` varchar(36) NOT NULL, INDEX \`IDX_cb22b968fe41a9f8b219327fde\` (\`userId\`), INDEX \`IDX_01a2c65f414d36cfe6f5d950fb\` (\`notificationId\`), PRIMARY KEY (\`userId\`, \`notificationId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`requirement\` ADD CONSTRAINT \`FK_a7b0856adc3ad35494b6d5c5c78\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`social\` ADD CONSTRAINT \`FK_d305cec4892bce9c4d52871194f\` FOREIGN KEY (\`detailId\`) REFERENCES \`detail\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`detail\` ADD CONSTRAINT \`FK_e83149aca9ac7b7eedbad3ac43d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e195b4c478ace2cf124c13ed11e\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_c0af34102c13c654955a0c5078b\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_0583b871718c2a54ea6643268f2\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_e90685adc595f3feeec766456a8\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`partner_partnerships\` ADD CONSTRAINT \`FK_c85a39fefb2689f9f5370287a89\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partner\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`partner_partnerships\` ADD CONSTRAINT \`FK_6582d84eb0b6f8300447ed98176\` FOREIGN KEY (\`partnershipId\`) REFERENCES \`partnership\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`program_types\` ADD CONSTRAINT \`FK_bdf28310b9d3b46206d4af849ef\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`program_types\` ADD CONSTRAINT \`FK_6b487aeaed07e040f00b72c2bac\` FOREIGN KEY (\`programTypeId\`) REFERENCES \`program_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`program_categories\` ADD CONSTRAINT \`FK_0024194a585e55ead317be949ff\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`program_categories\` ADD CONSTRAINT \`FK_61cba5da37064204bae386e14f2\` FOREIGN KEY (\`programCategoryId\`) REFERENCES \`program_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`program_partners\` ADD CONSTRAINT \`FK_0bd24970b5d5af86eb70db324ff\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`program_partners\` ADD CONSTRAINT \`FK_3dc64ed72399fb3c40ffc922574\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partner\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`detail_expertises\` ADD CONSTRAINT \`FK_7dd9446d9806e9c3824e293b14d\` FOREIGN KEY (\`detailId\`) REFERENCES \`detail\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`detail_expertises\` ADD CONSTRAINT \`FK_6bf66263ebbf0068f6f57affa3f\` FOREIGN KEY (\`expertiseId\`) REFERENCES \`expertise\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`detail_positions\` ADD CONSTRAINT \`FK_3f240c51458baaedf6f205b6947\` FOREIGN KEY (\`detailId\`) REFERENCES \`detail\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`detail_positions\` ADD CONSTRAINT \`FK_c91842a6257733bde99315bba90\` FOREIGN KEY (\`positionId\`) REFERENCES \`position\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`event_types\` ADD CONSTRAINT \`FK_2d843ba18ac1209663551116065\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`event_types\` ADD CONSTRAINT \`FK_d5bbf08cf7d0a3487a362bfcc71\` FOREIGN KEY (\`eventTypeId\`) REFERENCES \`event_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_472b25323af01488f1f66a06b67\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_86033897c009fcca8b6505d6be2\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_programs\` ADD CONSTRAINT \`FK_7d62dda22e194c52ee87b7f07e4\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_programs\` ADD CONSTRAINT \`FK_71c04fcee4b09dbae1c7085c280\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notifications\` ADD CONSTRAINT \`FK_cb22b968fe41a9f8b219327fde8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notifications\` ADD CONSTRAINT \`FK_01a2c65f414d36cfe6f5d950fb2\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user_notifications\` DROP FOREIGN KEY \`FK_01a2c65f414d36cfe6f5d950fb2\``);
    await queryRunner.query(`ALTER TABLE \`user_notifications\` DROP FOREIGN KEY \`FK_cb22b968fe41a9f8b219327fde8\``);
    await queryRunner.query(`ALTER TABLE \`user_programs\` DROP FOREIGN KEY \`FK_71c04fcee4b09dbae1c7085c280\``);
    await queryRunner.query(`ALTER TABLE \`user_programs\` DROP FOREIGN KEY \`FK_7d62dda22e194c52ee87b7f07e4\``);
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_86033897c009fcca8b6505d6be2\``);
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_472b25323af01488f1f66a06b67\``);
    await queryRunner.query(`ALTER TABLE \`event_types\` DROP FOREIGN KEY \`FK_d5bbf08cf7d0a3487a362bfcc71\``);
    await queryRunner.query(`ALTER TABLE \`event_types\` DROP FOREIGN KEY \`FK_2d843ba18ac1209663551116065\``);
    await queryRunner.query(`ALTER TABLE \`detail_positions\` DROP FOREIGN KEY \`FK_c91842a6257733bde99315bba90\``);
    await queryRunner.query(`ALTER TABLE \`detail_positions\` DROP FOREIGN KEY \`FK_3f240c51458baaedf6f205b6947\``);
    await queryRunner.query(`ALTER TABLE \`detail_expertises\` DROP FOREIGN KEY \`FK_6bf66263ebbf0068f6f57affa3f\``);
    await queryRunner.query(`ALTER TABLE \`detail_expertises\` DROP FOREIGN KEY \`FK_7dd9446d9806e9c3824e293b14d\``);
    await queryRunner.query(`ALTER TABLE \`program_partners\` DROP FOREIGN KEY \`FK_3dc64ed72399fb3c40ffc922574\``);
    await queryRunner.query(`ALTER TABLE \`program_partners\` DROP FOREIGN KEY \`FK_0bd24970b5d5af86eb70db324ff\``);
    await queryRunner.query(`ALTER TABLE \`program_categories\` DROP FOREIGN KEY \`FK_61cba5da37064204bae386e14f2\``);
    await queryRunner.query(`ALTER TABLE \`program_categories\` DROP FOREIGN KEY \`FK_0024194a585e55ead317be949ff\``);
    await queryRunner.query(`ALTER TABLE \`program_types\` DROP FOREIGN KEY \`FK_6b487aeaed07e040f00b72c2bac\``);
    await queryRunner.query(`ALTER TABLE \`program_types\` DROP FOREIGN KEY \`FK_bdf28310b9d3b46206d4af849ef\``);
    await queryRunner.query(`ALTER TABLE \`partner_partnerships\` DROP FOREIGN KEY \`FK_6582d84eb0b6f8300447ed98176\``);
    await queryRunner.query(`ALTER TABLE \`partner_partnerships\` DROP FOREIGN KEY \`FK_c85a39fefb2689f9f5370287a89\``);
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_e90685adc595f3feeec766456a8\``);
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_0583b871718c2a54ea6643268f2\``);
    await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_c0af34102c13c654955a0c5078b\``);
    await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e195b4c478ace2cf124c13ed11e\``);
    await queryRunner.query(`ALTER TABLE \`detail\` DROP FOREIGN KEY \`FK_e83149aca9ac7b7eedbad3ac43d\``);
    await queryRunner.query(`ALTER TABLE \`social\` DROP FOREIGN KEY \`FK_d305cec4892bce9c4d52871194f\``);
    await queryRunner.query(`ALTER TABLE \`requirement\` DROP FOREIGN KEY \`FK_a7b0856adc3ad35494b6d5c5c78\``);
    await queryRunner.query(`DROP INDEX \`IDX_01a2c65f414d36cfe6f5d950fb\` ON \`user_notifications\``);
    await queryRunner.query(`DROP INDEX \`IDX_cb22b968fe41a9f8b219327fde\` ON \`user_notifications\``);
    await queryRunner.query(`DROP TABLE \`user_notifications\``);
    await queryRunner.query(`DROP INDEX \`IDX_71c04fcee4b09dbae1c7085c28\` ON \`user_programs\``);
    await queryRunner.query(`DROP INDEX \`IDX_7d62dda22e194c52ee87b7f07e\` ON \`user_programs\``);
    await queryRunner.query(`DROP TABLE \`user_programs\``);
    await queryRunner.query(`DROP INDEX \`IDX_86033897c009fcca8b6505d6be\` ON \`user_roles\``);
    await queryRunner.query(`DROP INDEX \`IDX_472b25323af01488f1f66a06b6\` ON \`user_roles\``);
    await queryRunner.query(`DROP TABLE \`user_roles\``);
    await queryRunner.query(`DROP INDEX \`IDX_d5bbf08cf7d0a3487a362bfcc7\` ON \`event_types\``);
    await queryRunner.query(`DROP INDEX \`IDX_2d843ba18ac120966355111606\` ON \`event_types\``);
    await queryRunner.query(`DROP TABLE \`event_types\``);
    await queryRunner.query(`DROP INDEX \`IDX_c91842a6257733bde99315bba9\` ON \`detail_positions\``);
    await queryRunner.query(`DROP INDEX \`IDX_3f240c51458baaedf6f205b694\` ON \`detail_positions\``);
    await queryRunner.query(`DROP TABLE \`detail_positions\``);
    await queryRunner.query(`DROP INDEX \`IDX_6bf66263ebbf0068f6f57affa3\` ON \`detail_expertises\``);
    await queryRunner.query(`DROP INDEX \`IDX_7dd9446d9806e9c3824e293b14\` ON \`detail_expertises\``);
    await queryRunner.query(`DROP TABLE \`detail_expertises\``);
    await queryRunner.query(`DROP INDEX \`IDX_3dc64ed72399fb3c40ffc92257\` ON \`program_partners\``);
    await queryRunner.query(`DROP INDEX \`IDX_0bd24970b5d5af86eb70db324f\` ON \`program_partners\``);
    await queryRunner.query(`DROP TABLE \`program_partners\``);
    await queryRunner.query(`DROP INDEX \`IDX_61cba5da37064204bae386e14f\` ON \`program_categories\``);
    await queryRunner.query(`DROP INDEX \`IDX_0024194a585e55ead317be949f\` ON \`program_categories\``);
    await queryRunner.query(`DROP TABLE \`program_categories\``);
    await queryRunner.query(`DROP INDEX \`IDX_6b487aeaed07e040f00b72c2ba\` ON \`program_types\``);
    await queryRunner.query(`DROP INDEX \`IDX_bdf28310b9d3b46206d4af849e\` ON \`program_types\``);
    await queryRunner.query(`DROP TABLE \`program_types\``);
    await queryRunner.query(`DROP INDEX \`IDX_6582d84eb0b6f8300447ed9817\` ON \`partner_partnerships\``);
    await queryRunner.query(`DROP INDEX \`IDX_c85a39fefb2689f9f5370287a8\` ON \`partner_partnerships\``);
    await queryRunner.query(`DROP TABLE \`partner_partnerships\``);
    await queryRunner.query(`DROP TABLE \`attachment\``);
    await queryRunner.query(`DROP TABLE \`notification\``);
    await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`event\``);
    await queryRunner.query(`DROP TABLE \`event_type\``);
    await queryRunner.query(`DROP INDEX \`REL_e83149aca9ac7b7eedbad3ac43\` ON \`detail\``);
    await queryRunner.query(`DROP TABLE \`detail\``);
    await queryRunner.query(`DROP TABLE \`position\``);
    await queryRunner.query(`DROP TABLE \`expertise\``);
    await queryRunner.query(`DROP TABLE \`social\``);
    await queryRunner.query(`DROP TABLE \`program\``);
    await queryRunner.query(`DROP TABLE \`program_category\``);
    await queryRunner.query(`DROP TABLE \`program_type\``);
    await queryRunner.query(`DROP TABLE \`partner\``);
    await queryRunner.query(`DROP TABLE \`partnership\``);
    await queryRunner.query(`DROP TABLE \`requirement\``);
    await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
    await queryRunner.query(`DROP TABLE \`role\``);
  }
}