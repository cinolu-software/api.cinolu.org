import { MigrationInterface, QueryRunner } from 'typeorm';

export class Notifications1728461195354 implements MigrationInterface {
  name = 'Notifications1728461195354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`notification\` ADD \`to_group\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`notification\` ADD \`to_all\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`notification\` ADD \`is_sent\` tinyint NOT NULL DEFAULT 1`);
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_0583b871718c2a54ea6643268f2\``);
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_e90685adc595f3feeec766456a8\``);
    await queryRunner.query(`ALTER TABLE \`attachment\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`attachment\` CHANGE \`notificationId\` \`notificationId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`requirement\` DROP FOREIGN KEY \`FK_a7b0856adc3ad35494b6d5c5c78\``);
    await queryRunner.query(`ALTER TABLE \`requirement\` CHANGE \`programId\` \`programId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`google_image\` \`google_image\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profile\` \`profile\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`verified_at\` \`verified_at\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_c0af34102c13c654955a0c5078b\``);
    await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`senderId\` \`senderId\` varchar(36) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_0583b871718c2a54ea6643268f2\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_e90685adc595f3feeec766456a8\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`requirement\` ADD CONSTRAINT \`FK_a7b0856adc3ad35494b6d5c5c78\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_c0af34102c13c654955a0c5078b\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_c0af34102c13c654955a0c5078b\``);
    await queryRunner.query(`ALTER TABLE \`requirement\` DROP FOREIGN KEY \`FK_a7b0856adc3ad35494b6d5c5c78\``);
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_e90685adc595f3feeec766456a8\``);
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_0583b871718c2a54ea6643268f2\``);
    await queryRunner.query(
      `ALTER TABLE \`notification\` CHANGE \`senderId\` \`senderId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_c0af34102c13c654955a0c5078b\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
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
      `ALTER TABLE \`requirement\` CHANGE \`programId\` \`programId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`requirement\` ADD CONSTRAINT \`FK_a7b0856adc3ad35494b6d5c5c78\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` CHANGE \`notificationId\` \`notificationId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` CHANGE \`programId\` \`programId\` varchar(36) NULL DEFAULT 'NULL'`
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_e90685adc595f3feeec766456a8\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_0583b871718c2a54ea6643268f2\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`is_sent\``);
    await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`to_all\``);
    await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`to_group\``);
  }
}
