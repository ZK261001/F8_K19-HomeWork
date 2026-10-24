import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
  gender: Gender;

  @Column({ nullable: true })
  province_id?: number;

  @Column({ nullable: true })
  ward_id?: number;

  @Column({ type: 'varchar', nullable: true })
  addressDetail?: string;

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
