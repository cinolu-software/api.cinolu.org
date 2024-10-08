import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1728381716081 implements MigrationInterface {
    name = 'Init1728381716081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`address\` varchar(255) NULL, \`google_image\` varchar(255) NULL, \`profile\` varchar(255) NULL, \`verified_at\` datetime NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`is_read\` tinyint NOT NULL DEFAULT 0, \`senderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`programId\` varchar(36) NULL, \`notificationId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`requirement\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`programId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`type\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`partnership\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`partner\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`profile\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`program\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`start_at\` date NOT NULL, \`end_at\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_roles\` (\`userId\` varchar(36) NOT NULL, \`roleId\` varchar(36) NOT NULL, INDEX \`IDX_472b25323af01488f1f66a06b6\` (\`userId\`), INDEX \`IDX_86033897c009fcca8b6505d6be\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_programs\` (\`userId\` varchar(36) NOT NULL, \`programId\` varchar(36) NOT NULL, INDEX \`IDX_7d62dda22e194c52ee87b7f07e\` (\`userId\`), INDEX \`IDX_71c04fcee4b09dbae1c7085c28\` (\`programId\`), PRIMARY KEY (\`userId\`, \`programId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_notifications\` (\`userId\` varchar(36) NOT NULL, \`notificationId\` varchar(36) NOT NULL, INDEX \`IDX_cb22b968fe41a9f8b219327fde\` (\`userId\`), INDEX \`IDX_01a2c65f414d36cfe6f5d950fb\` (\`notificationId\`), PRIMARY KEY (\`userId\`, \`notificationId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`partner_partnerships\` (\`partnerId\` varchar(36) NOT NULL, \`partnershipId\` varchar(36) NOT NULL, INDEX \`IDX_c85a39fefb2689f9f5370287a8\` (\`partnerId\`), INDEX \`IDX_6582d84eb0b6f8300447ed9817\` (\`partnershipId\`), PRIMARY KEY (\`partnerId\`, \`partnershipId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`program_types\` (\`programId\` varchar(36) NOT NULL, \`typeId\` varchar(36) NOT NULL, INDEX \`IDX_bdf28310b9d3b46206d4af849e\` (\`programId\`), INDEX \`IDX_07bec1f774bf3a158032e69981\` (\`typeId\`), PRIMARY KEY (\`programId\`, \`typeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`program_partners\` (\`programId\` varchar(36) NOT NULL, \`partnerId\` varchar(36) NOT NULL, INDEX \`IDX_0bd24970b5d5af86eb70db324f\` (\`programId\`), INDEX \`IDX_3dc64ed72399fb3c40ffc92257\` (\`partnerId\`), PRIMARY KEY (\`programId\`, \`partnerId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_c0af34102c13c654955a0c5078b\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_0583b871718c2a54ea6643268f2\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_e90685adc595f3feeec766456a8\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`requirement\` ADD CONSTRAINT \`FK_a7b0856adc3ad35494b6d5c5c78\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_472b25323af01488f1f66a06b67\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_86033897c009fcca8b6505d6be2\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_programs\` ADD CONSTRAINT \`FK_7d62dda22e194c52ee87b7f07e4\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_programs\` ADD CONSTRAINT \`FK_71c04fcee4b09dbae1c7085c280\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_notifications\` ADD CONSTRAINT \`FK_cb22b968fe41a9f8b219327fde8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_notifications\` ADD CONSTRAINT \`FK_01a2c65f414d36cfe6f5d950fb2\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partner_partnerships\` ADD CONSTRAINT \`FK_c85a39fefb2689f9f5370287a89\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partner\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`partner_partnerships\` ADD CONSTRAINT \`FK_6582d84eb0b6f8300447ed98176\` FOREIGN KEY (\`partnershipId\`) REFERENCES \`partnership\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`program_types\` ADD CONSTRAINT \`FK_bdf28310b9d3b46206d4af849ef\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`program_types\` ADD CONSTRAINT \`FK_07bec1f774bf3a158032e699813\` FOREIGN KEY (\`typeId\`) REFERENCES \`type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`program_partners\` ADD CONSTRAINT \`FK_0bd24970b5d5af86eb70db324ff\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`program_partners\` ADD CONSTRAINT \`FK_3dc64ed72399fb3c40ffc922574\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partner\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`program_partners\` DROP FOREIGN KEY \`FK_3dc64ed72399fb3c40ffc922574\``);
        await queryRunner.query(`ALTER TABLE \`program_partners\` DROP FOREIGN KEY \`FK_0bd24970b5d5af86eb70db324ff\``);
        await queryRunner.query(`ALTER TABLE \`program_types\` DROP FOREIGN KEY \`FK_07bec1f774bf3a158032e699813\``);
        await queryRunner.query(`ALTER TABLE \`program_types\` DROP FOREIGN KEY \`FK_bdf28310b9d3b46206d4af849ef\``);
        await queryRunner.query(`ALTER TABLE \`partner_partnerships\` DROP FOREIGN KEY \`FK_6582d84eb0b6f8300447ed98176\``);
        await queryRunner.query(`ALTER TABLE \`partner_partnerships\` DROP FOREIGN KEY \`FK_c85a39fefb2689f9f5370287a89\``);
        await queryRunner.query(`ALTER TABLE \`user_notifications\` DROP FOREIGN KEY \`FK_01a2c65f414d36cfe6f5d950fb2\``);
        await queryRunner.query(`ALTER TABLE \`user_notifications\` DROP FOREIGN KEY \`FK_cb22b968fe41a9f8b219327fde8\``);
        await queryRunner.query(`ALTER TABLE \`user_programs\` DROP FOREIGN KEY \`FK_71c04fcee4b09dbae1c7085c280\``);
        await queryRunner.query(`ALTER TABLE \`user_programs\` DROP FOREIGN KEY \`FK_7d62dda22e194c52ee87b7f07e4\``);
        await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_86033897c009fcca8b6505d6be2\``);
        await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_472b25323af01488f1f66a06b67\``);
        await queryRunner.query(`ALTER TABLE \`requirement\` DROP FOREIGN KEY \`FK_a7b0856adc3ad35494b6d5c5c78\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_e90685adc595f3feeec766456a8\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_0583b871718c2a54ea6643268f2\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_c0af34102c13c654955a0c5078b\``);
        await queryRunner.query(`DROP INDEX \`IDX_3dc64ed72399fb3c40ffc92257\` ON \`program_partners\``);
        await queryRunner.query(`DROP INDEX \`IDX_0bd24970b5d5af86eb70db324f\` ON \`program_partners\``);
        await queryRunner.query(`DROP TABLE \`program_partners\``);
        await queryRunner.query(`DROP INDEX \`IDX_07bec1f774bf3a158032e69981\` ON \`program_types\``);
        await queryRunner.query(`DROP INDEX \`IDX_bdf28310b9d3b46206d4af849e\` ON \`program_types\``);
        await queryRunner.query(`DROP TABLE \`program_types\``);
        await queryRunner.query(`DROP INDEX \`IDX_6582d84eb0b6f8300447ed9817\` ON \`partner_partnerships\``);
        await queryRunner.query(`DROP INDEX \`IDX_c85a39fefb2689f9f5370287a8\` ON \`partner_partnerships\``);
        await queryRunner.query(`DROP TABLE \`partner_partnerships\``);
        await queryRunner.query(`DROP INDEX \`IDX_01a2c65f414d36cfe6f5d950fb\` ON \`user_notifications\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb22b968fe41a9f8b219327fde\` ON \`user_notifications\``);
        await queryRunner.query(`DROP TABLE \`user_notifications\``);
        await queryRunner.query(`DROP INDEX \`IDX_71c04fcee4b09dbae1c7085c28\` ON \`user_programs\``);
        await queryRunner.query(`DROP INDEX \`IDX_7d62dda22e194c52ee87b7f07e\` ON \`user_programs\``);
        await queryRunner.query(`DROP TABLE \`user_programs\``);
        await queryRunner.query(`DROP INDEX \`IDX_86033897c009fcca8b6505d6be\` ON \`user_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_472b25323af01488f1f66a06b6\` ON \`user_roles\``);
        await queryRunner.query(`DROP TABLE \`user_roles\``);
        await queryRunner.query(`DROP TABLE \`program\``);
        await queryRunner.query(`DROP TABLE \`partner\``);
        await queryRunner.query(`DROP TABLE \`partnership\``);
        await queryRunner.query(`DROP TABLE \`type\``);
        await queryRunner.query(`DROP TABLE \`requirement\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
