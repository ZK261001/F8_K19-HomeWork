import { ApiProperty } from '@nestjs/swagger';

export class Cv {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  candidate_id: number;

  @ApiProperty({ example: 'CV Frontend Developer' })
  title: string;

  @ApiProperty({ example: 'nguyen-van-a-cv.pdf' })
  file_name: string;

  @ApiProperty({ example: 'cv/2026/10/abc123.pdf' })
  file_key: string;
}
