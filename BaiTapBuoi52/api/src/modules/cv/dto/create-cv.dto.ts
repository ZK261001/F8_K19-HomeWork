import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCvDto {
  @ApiProperty({
    description: 'Candidate ID',
    example: 1,
  })
  @IsInt({ message: 'candidate_id must be an integer' })
  candidate_id: number;

  @ApiProperty({
    description: 'CV title',
    example: 'CV Frontend Developer',
  })
  @IsString({ message: 'CV title must be a string' })
  @IsNotEmpty({ message: 'CV title must not be empty' })
  title: string;

  @ApiProperty({
    description: 'File name',
    example: 'nguyen-van-a-cv.pdf',
  })
  @IsString({ message: 'File name must be a string' })
  @IsNotEmpty({ message: 'File name must not be empty' })
  file_name: string;

  @ApiProperty({
    description: 'File storage key',
    example: 'cv/2026/10/abc123.pdf',
  })
  @IsString({ message: 'File storage key must be a string' })
  @IsNotEmpty({ message: 'File storage key must not be empty' })
  file_key: string;
}
