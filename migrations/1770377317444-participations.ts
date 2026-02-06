import { MigrationInterface, QueryRunner } from "typeorm";

export class Participations1770377317444 implements MigrationInterface {
    name = 'Participations1770377317444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`event_participation\` (\`id\` uuid NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`userId\` uuid NULL, \`eventId\` uuid NULL, UNIQUE INDEX \`IDX_9f7a8f6a8bd48f506dcbe42f99\` (\`userId\`, \`eventId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_participation\` (\`id\` uuid NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`userId\` uuid NULL, \`projectId\` uuid NULL, \`ventureId\` uuid NULL, UNIQUE INDEX \`IDX_ce2fd1772dc8dc2ef751252974\` (\`userId\`, \`projectId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_participation_phase_phase\` (\`projectParticipationId\` uuid NOT NULL, \`phaseId\` uuid NOT NULL, INDEX \`IDX_739ba977faaf8d6f426104b87f\` (\`projectParticipationId\`), INDEX \`IDX_1a7f33d1f11d720772ddcc049e\` (\`phaseId\`), PRIMARY KEY (\`projectParticipationId\`, \`phaseId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`event_participation\` ADD CONSTRAINT \`FK_7f8c3f24f237bce73c832440340\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event_participation\` ADD CONSTRAINT \`FK_f30c26df0e032cbe0b2e2eee909\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_participation\` ADD CONSTRAINT \`FK_8fd8cffd65ddd57be974f245c64\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_participation\` ADD CONSTRAINT \`FK_e6ce8474e0ea1d0c9007b1308e8\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_participation\` ADD CONSTRAINT \`FK_2b9f3ad28589e587351e65f1ddd\` FOREIGN KEY (\`ventureId\`) REFERENCES \`venture\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_participation_phase_phase\` ADD CONSTRAINT \`FK_739ba977faaf8d6f426104b87f3\` FOREIGN KEY (\`projectParticipationId\`) REFERENCES \`project_participation\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project_participation_phase_phase\` ADD CONSTRAINT \`FK_1a7f33d1f11d720772ddcc049e7\` FOREIGN KEY (\`phaseId\`) REFERENCES \`phase\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_participation_phase_phase\` DROP FOREIGN KEY \`FK_1a7f33d1f11d720772ddcc049e7\``);
        await queryRunner.query(`ALTER TABLE \`project_participation_phase_phase\` DROP FOREIGN KEY \`FK_739ba977faaf8d6f426104b87f3\``);
        await queryRunner.query(`ALTER TABLE \`project_participation\` DROP FOREIGN KEY \`FK_2b9f3ad28589e587351e65f1ddd\``);
        await queryRunner.query(`ALTER TABLE \`project_participation\` DROP FOREIGN KEY \`FK_e6ce8474e0ea1d0c9007b1308e8\``);
        await queryRunner.query(`ALTER TABLE \`project_participation\` DROP FOREIGN KEY \`FK_8fd8cffd65ddd57be974f245c64\``);
        await queryRunner.query(`ALTER TABLE \`event_participation\` DROP FOREIGN KEY \`FK_f30c26df0e032cbe0b2e2eee909\``);
        await queryRunner.query(`ALTER TABLE \`event_participation\` DROP FOREIGN KEY \`FK_7f8c3f24f237bce73c832440340\``);
        await queryRunner.query(`DROP INDEX \`IDX_1a7f33d1f11d720772ddcc049e\` ON \`project_participation_phase_phase\``);
        await queryRunner.query(`DROP INDEX \`IDX_739ba977faaf8d6f426104b87f\` ON \`project_participation_phase_phase\``);
        await queryRunner.query(`DROP TABLE \`project_participation_phase_phase\``);
        await queryRunner.query(`DROP INDEX \`IDX_ce2fd1772dc8dc2ef751252974\` ON \`project_participation\``);
        await queryRunner.query(`DROP TABLE \`project_participation\``);
        await queryRunner.query(`DROP INDEX \`IDX_9f7a8f6a8bd48f506dcbe42f99\` ON \`event_participation\``);
        await queryRunner.query(`DROP TABLE \`event_participation\``);
    }

}
