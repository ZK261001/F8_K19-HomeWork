import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../Base/entity';

@Entity('cvs')
export class Cv extends BaseEntity {
  @ApiProperty({ example: 1 })
  @Column({ type: 'int' })
  candidate_id: number;

  @ApiProperty({ example: 'CV Frontend Developer' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ example: 'nguyen-van-a-cv.pdf' })
  @Column({ type: 'varchar', length: 255 })
  file_name: string;

  @ApiProperty({ example: 'cv/2026/10/abc123.pdf' })
  @Column({ type: 'varchar', length: 500 })
  file_key: string;
}
