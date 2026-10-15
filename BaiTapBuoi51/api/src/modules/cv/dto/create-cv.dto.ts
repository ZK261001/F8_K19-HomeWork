import { ApiProperty } from '@nestjs/swagger';

export class CreateCvDto {
  @ApiProperty({
    description: 'ID ứng viên',
    example: 1,
  })
  candidate_id: number;

  @ApiProperty({
    description: 'Tiêu đề CV',
    example: 'CV Frontend Developer',
  })
  title: string;

  @ApiProperty({
    description: 'Tên file',
    example: 'nguyen-van-a-cv.pdf',
  })
  file_name: string;

  @ApiProperty({
    description: 'Key lưu trữ file',
    example: 'cv/2026/10/abc123.pdf',
  })
  file_key: string;
}
