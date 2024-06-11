import { MigrationInterface, QueryRunner } from 'typeorm';

export class First1718030277834 implements MigrationInterface {
  name = 'First1718030277834';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`address\` varchar(255) NULL, \`token\` varchar(255) NULL, \`google_image\` varchar(255) NULL, \`profile\` varchar(255) NULL, \`verified_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`program\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`start_at\` date NOT NULL, \`end_at\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`attachment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`projectId\` int NULL, \`programId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`start_at\` date NOT NULL, \`end_at\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`statusId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_roles\` (\`userId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_472b25323af01488f1f66a06b6\` (\`userId\`), INDEX \`IDX_86033897c009fcca8b6505d6be\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`project_categories\` (\`projectId\` int NOT NULL, \`categoryId\` int NOT NULL, INDEX \`IDX_4b3ae99beef33e732fb6318500\` (\`projectId\`), INDEX \`IDX_1c3ef809362ea005697d86e828\` (\`categoryId\`), PRIMARY KEY (\`projectId\`, \`categoryId\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`program\` ADD CONSTRAINT \`FK_d593ec621c4a47fd51ab7f9a23d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_b90a30da0b8f82632f2d6ad29cd\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_0583b871718c2a54ea6643268f2\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_7c4b0d3b77eaf26f8b4da879e63\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_b6d55aff9b16e061712260da686\` FOREIGN KEY (\`statusId\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_472b25323af01488f1f66a06b67\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_86033897c009fcca8b6505d6be2\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories\` ADD CONSTRAINT \`FK_4b3ae99beef33e732fb63185009\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_categories\` ADD CONSTRAINT \`FK_1c3ef809362ea005697d86e8288\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`project_categories\` DROP FOREIGN KEY \`FK_1c3ef809362ea005697d86e8288\``);
    await queryRunner.query(`ALTER TABLE \`project_categories\` DROP FOREIGN KEY \`FK_4b3ae99beef33e732fb63185009\``);
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_86033897c009fcca8b6505d6be2\``);
    await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_472b25323af01488f1f66a06b67\``);
    await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_b6d55aff9b16e061712260da686\``);
    await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_7c4b0d3b77eaf26f8b4da879e63\``);
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_0583b871718c2a54ea6643268f2\``);
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_b90a30da0b8f82632f2d6ad29cd\``);
    await queryRunner.query(`ALTER TABLE \`program\` DROP FOREIGN KEY \`FK_d593ec621c4a47fd51ab7f9a23d\``);
    await queryRunner.query(`DROP INDEX \`IDX_1c3ef809362ea005697d86e828\` ON \`project_categories\``);
    await queryRunner.query(`DROP INDEX \`IDX_4b3ae99beef33e732fb6318500\` ON \`project_categories\``);
    await queryRunner.query(`DROP TABLE \`project_categories\``);
    await queryRunner.query(`DROP INDEX \`IDX_86033897c009fcca8b6505d6be\` ON \`user_roles\``);
    await queryRunner.query(`DROP INDEX \`IDX_472b25323af01488f1f66a06b6\` ON \`user_roles\``);
    await queryRunner.query(`DROP TABLE \`user_roles\``);
    await queryRunner.query(`DROP TABLE \`status\``);
    await queryRunner.query(`DROP TABLE \`project\``);
    await queryRunner.query(`DROP TABLE \`category\``);
    await queryRunner.query(`DROP TABLE \`attachment\``);
    await queryRunner.query(`DROP TABLE \`program\``);
    await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
    await queryRunner.query(`DROP TABLE \`role\``);
  }
}
