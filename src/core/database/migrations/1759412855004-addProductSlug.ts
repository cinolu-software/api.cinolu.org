import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductSlug1759412855004 implements MigrationInterface {
  name = 'AddProductSlug1759412855004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` ADD \`slug\` varchar(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`slug\``);
  }
}
