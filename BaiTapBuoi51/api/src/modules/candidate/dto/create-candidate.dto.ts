import { Gender } from '../entities/candidate.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCandidateDto {
  @ApiProperty({ example: 'Nguyễn Văn A', minLength: 2 })
  name: string;

  @ApiProperty({ example: '0123456789', required: false })
  phone?: string;

  @ApiProperty({ example: 'nguyenvana@gmail.com' })
  email: string;

  @ApiProperty({ enum: Gender, example: Gender.MALE, required: false })
  gender?: Gender;

  @ApiProperty({ example: 1, required: false })
  province_id?: number;

  @ApiProperty({ example: 1, required: false })
  ward_id?: number;

  @ApiProperty({ example: 'Số 1 Đường ABC', required: false })
  addressDetail?: string;

  @ApiProperty({ example: true, required: false })
  active?: boolean;
}
