import { MigrationInterface, QueryRunner } from 'typeorm';

export class MentorsToPhase1771933959263 implements MigrationInterface {
  name = 'MentorsToPhase1771933959263';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`phase_mentors_mentor_profile\` (\`phaseId\` uuid NOT NULL, \`mentorProfileId\` uuid NOT NULL, INDEX \`IDX_c879efe5441346e6fe3f6011ec\` (\`phaseId\`), INDEX \`IDX_1fc87ce223cc261e7779a3a9ad\` (\`mentorProfileId\`), PRIMARY KEY (\`phaseId\`, \`mentorProfileId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_profile\` ADD \`type\` enum ('coach', 'facilitator') NOT NULL DEFAULT 'coach'`
    );
    await queryRunner.query(`ALTER TABLE \`notification\` ADD \`notify_mentors\` tinyint NULL`);
    await queryRunner.query(`ALTER TABLE \`phase\` CHANGE \`description\` \`description\` text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`phase_mentors_mentor_profile\` ADD CONSTRAINT \`FK_c879efe5441346e6fe3f6011ec5\` FOREIGN KEY (\`phaseId\`) REFERENCES \`phase\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`phase_mentors_mentor_profile\` ADD CONSTRAINT \`FK_1fc87ce223cc261e7779a3a9ad3\` FOREIGN KEY (\`mentorProfileId\`) REFERENCES \`mentor_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`phase_mentors_mentor_profile\` DROP FOREIGN KEY \`FK_1fc87ce223cc261e7779a3a9ad3\``
    );
    await queryRunner.query(
      `ALTER TABLE \`phase_mentors_mentor_profile\` DROP FOREIGN KEY \`FK_c879efe5441346e6fe3f6011ec5\``
    );
    await queryRunner.query(
      `ALTER TABLE \`phase\` CHANGE \`description\` \`description\` text CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NULL`
    );
    await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`notify_mentors\``);
    await queryRunner.query(`ALTER TABLE \`mentor_profile\` DROP COLUMN \`type\``);
    await queryRunner.query(`DROP INDEX \`IDX_1fc87ce223cc261e7779a3a9ad\` ON \`phase_mentors_mentor_profile\``);
    await queryRunner.query(`DROP INDEX \`IDX_c879efe5441346e6fe3f6011ec\` ON \`phase_mentors_mentor_profile\``);
    await queryRunner.query(`DROP TABLE \`phase_mentors_mentor_profile\``);
  }
}
