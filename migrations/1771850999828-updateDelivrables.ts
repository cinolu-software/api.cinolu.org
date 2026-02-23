import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDelivrables1771850999828 implements MigrationInterface {
    name = 'UpdateDelivrables1771850999828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`deliverable_submission\` CHANGE \`content\` \`file\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`deliverable\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`deliverable\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`deliverable_submission\` DROP COLUMN \`file\``);
        await queryRunner.query(`ALTER TABLE \`deliverable_submission\` ADD \`file\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`deliverable_submission\` DROP COLUMN \`file\``);
        await queryRunner.query(`ALTER TABLE \`deliverable_submission\` ADD \`file\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`deliverable\` ADD \`content\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`deliverable\` ADD \`type\` enum ('picture', 'link', 'document') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`deliverable_submission\` CHANGE \`file\` \`content\` text NOT NULL`);
    }

}
