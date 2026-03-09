import { MigrationInterface, QueryRunner } from "typeorm";

export class StaffNotifications1772635822869 implements MigrationInterface {
    name = 'StaffNotifications1772635822869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`notify_staff\` tinyint NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`notify_staff\``);
    }

}
