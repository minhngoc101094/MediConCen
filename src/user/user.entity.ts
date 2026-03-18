import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user_mapping')
@Unique(['id1', 'id2'])
export class UserMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id1: string;

  @Column()
  id2: string;

  @Column({ type: 'char', length: 36 })
  userId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
