import { MigrationInterface, QueryRunner } from "typeorm";

export class Notifications1770823482390 implements MigrationInterface {
    name = 'Notifications1770823482390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification_attachment\` (\`id\` uuid NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`filename\` varchar(255) NOT NULL, \`mimetype\` varchar(255) NULL, \`notificationId\` uuid NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` uuid NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`body\` text NOT NULL, \`status\` enum ('draft', 'sent') NOT NULL DEFAULT 'draft', \`read_at\` datetime NULL, \`senderId\` uuid NULL, \`projectId\` uuid NULL, \`phaseId\` uuid NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_participation_phases_phase\` (\`projectParticipationId\` uuid NOT NULL, \`phaseId\` uuid NOT NULL, INDEX \`IDX_0e678197c5c0e9296fcc4e9e95\` (\`projectParticipationId\`), INDEX \`IDX_2b2806c5a1b3c4d0f721514a12\` (\`phaseId\`), PRIMARY KEY (\`projectParticipationId\`, \`phaseId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notification_attachment\` ADD CONSTRAINT \`FK_f74c03d05745ce57bf806d3600b\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_c0af34102c13c654955a0c5078b\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_28a43a0b8c114e48b5bb002dc22\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_b9f3426ffc9eb5ee5fa5bf60a21\` FOREIGN KEY (\`phaseId\`) REFERENCES \`phase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_participation_phases_phase\` ADD CONSTRAINT \`FK_0e678197c5c0e9296fcc4e9e95c\` FOREIGN KEY (\`projectParticipationId\`) REFERENCES \`project_participation\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project_participation_phases_phase\` ADD CONSTRAINT \`FK_2b2806c5a1b3c4d0f721514a126\` FOREIGN KEY (\`phaseId\`) REFERENCES \`phase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_participation_phases_phase\` DROP FOREIGN KEY \`FK_2b2806c5a1b3c4d0f721514a126\``);
        await queryRunner.query(`ALTER TABLE \`project_participation_phases_phase\` DROP FOREIGN KEY \`FK_0e678197c5c0e9296fcc4e9e95c\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_b9f3426ffc9eb5ee5fa5bf60a21\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_28a43a0b8c114e48b5bb002dc22\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_c0af34102c13c654955a0c5078b\``);
        await queryRunner.query(`ALTER TABLE \`notification_attachment\` DROP FOREIGN KEY \`FK_f74c03d05745ce57bf806d3600b\``);
        await queryRunner.query(`DROP INDEX \`IDX_2b2806c5a1b3c4d0f721514a12\` ON \`project_participation_phases_phase\``);
        await queryRunner.query(`DROP INDEX \`IDX_0e678197c5c0e9296fcc4e9e95\` ON \`project_participation_phases_phase\``);
        await queryRunner.query(`DROP TABLE \`project_participation_phases_phase\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP TABLE \`notification_attachment\``);
    }

}
