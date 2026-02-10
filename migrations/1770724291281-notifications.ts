import { MigrationInterface, QueryRunner } from "typeorm";

export class Notifications1770724291281 implements MigrationInterface {
    name = 'Notifications1770724291281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification_attachment\` (\`id\` uuid NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`filename\` varchar(255) NOT NULL, \`mimetype\` varchar(255) NULL, \`notificationId\` uuid NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` uuid NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`body\` text NOT NULL, \`is_read\` tinyint NOT NULL DEFAULT 0, \`read_at\` datetime NULL, \`senderId\` uuid NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification_recipients_user\` (\`notificationId\` uuid NOT NULL, \`userId\` uuid NOT NULL, INDEX \`IDX_a0726feec459cbb3095cada58d\` (\`notificationId\`), INDEX \`IDX_0d2f01510e07e1f7ea56e07db5\` (\`userId\`), PRIMARY KEY (\`notificationId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notification_attachment\` ADD CONSTRAINT \`FK_f74c03d05745ce57bf806d3600b\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_c0af34102c13c654955a0c5078b\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification_recipients_user\` ADD CONSTRAINT \`FK_a0726feec459cbb3095cada58d2\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`notification_recipients_user\` ADD CONSTRAINT \`FK_0d2f01510e07e1f7ea56e07db5a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification_recipients_user\` DROP FOREIGN KEY \`FK_0d2f01510e07e1f7ea56e07db5a\``);
        await queryRunner.query(`ALTER TABLE \`notification_recipients_user\` DROP FOREIGN KEY \`FK_a0726feec459cbb3095cada58d2\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_c0af34102c13c654955a0c5078b\``);
        await queryRunner.query(`ALTER TABLE \`notification_attachment\` DROP FOREIGN KEY \`FK_f74c03d05745ce57bf806d3600b\``);
        await queryRunner.query(`DROP INDEX \`IDX_0d2f01510e07e1f7ea56e07db5\` ON \`notification_recipients_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_a0726feec459cbb3095cada58d\` ON \`notification_recipients_user\``);
        await queryRunner.query(`DROP TABLE \`notification_recipients_user\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP TABLE \`notification_attachment\``);
    }

}
