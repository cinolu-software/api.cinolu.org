import { MigrationInterface, QueryRunner } from 'typeorm';

export class M21725440970930 implements MigrationInterface {
  name = 'M21725440970930';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`sender_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`notification_recipients\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_read\` tinyint NOT NULL DEFAULT 0, \`notificationId\` int NULL, \`userId\` int NULL, \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(`ALTER TABLE \`attachment\` ADD \`notificationId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`requirement\` DROP FOREIGN KEY \`FK_a7b0856adc3ad35494b6d5c5c78\``);
    await queryRunner.query(`ALTER TABLE \`requirement\` CHANGE \`programId\` \`programId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`program\` DROP FOREIGN KEY \`FK_d593ec621c4a47fd51ab7f9a23d\``);
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`userId\` \`userId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_0583b871718c2a54ea6643268f2\``);
    await queryRunner.query(`ALTER TABLE \`attachment\` CHANGE \`programId\` \`programId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`token\` \`token\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`google_image\` \`google_image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profile\` \`profile\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`verified_at\` \`verified_at\` datetime NULL`);
    await queryRunner.query(
      `ALTER TABLE \`requirement\` ADD CONSTRAINT \`FK_a7b0856adc3ad35494b6d5c5c78\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`program\` ADD CONSTRAINT \`FK_d593ec621c4a47fd51ab7f9a23d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_0583b871718c2a54ea6643268f2\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_e90685adc595f3feeec766456a8\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_56023c91b76b36125acd4dcd9c5\` FOREIGN KEY (\`sender_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_recipients\` ADD CONSTRAINT \`FK_234adaa36f97dd1b2bd3a22d65b\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_recipients\` ADD CONSTRAINT \`FK_452385a8220b8053ab65317ffa6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_recipients\` ADD CONSTRAINT \`FK_3852dc04e40c1ebb8ec68d9a050\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`notification_recipients\` DROP FOREIGN KEY \`FK_3852dc04e40c1ebb8ec68d9a050\``
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_recipients\` DROP FOREIGN KEY \`FK_452385a8220b8053ab65317ffa6\``
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_recipients\` DROP FOREIGN KEY \`FK_234adaa36f97dd1b2bd3a22d65b\``
    );
    await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_56023c91b76b36125acd4dcd9c5\``);
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_e90685adc595f3feeec766456a8\``);
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_0583b871718c2a54ea6643268f2\``);
    await queryRunner.query(`ALTER TABLE \`program\` DROP FOREIGN KEY \`FK_d593ec621c4a47fd51ab7f9a23d\``);
    await queryRunner.query(`ALTER TABLE \`requirement\` DROP FOREIGN KEY \`FK_a7b0856adc3ad35494b6d5c5c78\``);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`verified_at\` \`verified_at\` datetime NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profile\` \`profile\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`google_image\` \`google_image\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`token\` \`token\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`attachment\` CHANGE \`programId\` \`programId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_0583b871718c2a54ea6643268f2\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`program\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`program\` ADD CONSTRAINT \`FK_d593ec621c4a47fd51ab7f9a23d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`requirement\` CHANGE \`programId\` \`programId\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`requirement\` ADD CONSTRAINT \`FK_a7b0856adc3ad35494b6d5c5c78\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP COLUMN \`notificationId\``);
    await queryRunner.query(`DROP TABLE \`notification_recipients\``);
    await queryRunner.query(`DROP TABLE \`notification\``);
  }
}
