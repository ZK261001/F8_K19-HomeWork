import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../Base/entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('candidates')
export class Candidate extends BaseEntity {
  @ApiProperty({ example: 'Nguyễn Văn A' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: '0901234567', required: false })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @ApiProperty({ example: 'nguyenvana@gmail.com' })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ApiProperty({ enum: Gender, example: Gender.MALE })
  @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
  gender: Gender;

  @ApiProperty({ example: 1, required: false })
  @Column({ type: 'int', nullable: true })
  province_id?: number;

  @ApiProperty({ example: 1, required: false })
  @Column({ type: 'int', nullable: true })
  ward_id?: number;

  @ApiProperty({ example: '123 Đường ABC', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true })
  addressDetail?: string;
}
