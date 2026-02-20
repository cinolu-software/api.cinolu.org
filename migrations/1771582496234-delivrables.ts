import { MigrationInterface, QueryRunner } from "typeorm";

export class Delivrables1771582496234 implements MigrationInterface {
    name = 'Delivrables1771582496234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`deliverable\` (\`id\` uuid NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`type\` enum ('picture', 'link', 'document') NOT NULL, \`content\` text NULL, \`phaseId\` uuid NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deliverable_submission\` (\`id\` uuid NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`content\` text NOT NULL, \`deliverableId\` uuid NULL, \`participationId\` uuid NULL, UNIQUE INDEX \`IDX_a9352e4d0cbac77c08d5a701aa\` (\`deliverableId\`, \`participationId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`deliverable\` ADD CONSTRAINT \`FK_9253ceb850d02938e435427e26b\` FOREIGN KEY (\`phaseId\`) REFERENCES \`phase\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deliverable_submission\` ADD CONSTRAINT \`FK_4e7dd545640098c916f7292491e\` FOREIGN KEY (\`deliverableId\`) REFERENCES \`deliverable\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deliverable_submission\` ADD CONSTRAINT \`FK_2415578ee91ea3d0566819971d3\` FOREIGN KEY (\`participationId\`) REFERENCES \`project_participation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`deliverable_submission\` DROP FOREIGN KEY \`FK_2415578ee91ea3d0566819971d3\``);
        await queryRunner.query(`ALTER TABLE \`deliverable_submission\` DROP FOREIGN KEY \`FK_4e7dd545640098c916f7292491e\``);
        await queryRunner.query(`ALTER TABLE \`deliverable\` DROP FOREIGN KEY \`FK_9253ceb850d02938e435427e26b\``);
        await queryRunner.query(`DROP INDEX \`IDX_a9352e4d0cbac77c08d5a701aa\` ON \`deliverable_submission\``);
        await queryRunner.query(`DROP TABLE \`deliverable_submission\``);
        await queryRunner.query(`DROP TABLE \`deliverable\``);
    }

}
