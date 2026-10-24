import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCvDto {
  @ApiProperty({
    description: 'ID ứng viên',
    example: 1,
  })
  @IsInt({ message: 'candidate_id phải là số nguyên' })
  candidate_id: number;

  @ApiProperty({
    description: 'Tiêu đề CV',
    example: 'CV Frontend Developer',
  })
  @IsString({ message: 'Tiêu đề CV phải là chuỗi' })
  @IsNotEmpty({ message: 'Tiêu đề CV không được để trống' })
  title: string;

  @ApiProperty({
    description: 'Tên file',
    example: 'nguyen-van-a-cv.pdf',
  })
  @IsString({ message: 'Tên file phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên file không được để trống' })
  file_name: string;

  @ApiProperty({
    description: 'Key lưu trữ file',
    example: 'cv/2026/10/abc123.pdf',
  })
  @IsString({ message: 'Key lưu trữ file phải là chuỗi' })
  @IsNotEmpty({ message: 'Key lưu trữ file không được để trống' })
  file_key: string;
}
