import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'bigint', nullable: true })
  created_by?: number;

  @UpdateDateColumn({ type: 'timestamptz' })
  modified_at: Date;

  @Column({ type: 'bigint', nullable: true })
  modified_by?: number;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @Column({ type: 'bigint', nullable: true })
  deleted_by?: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
