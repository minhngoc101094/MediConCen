import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserMapping1700000001000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user_mapping (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        id1 VARCHAR(255) NOT NULL,
        id2 VARCHAR(255) NOT NULL,
        userId CHAR(36) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_id1_id2 (id1, id2)
      )
    `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE user_mapping");
  }
}
