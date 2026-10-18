import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class Candidate {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Nguyễn Văn A' })
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

  @ApiProperty({ example: true, description: 'false = đã bị xóa (soft delete)' })
  active: boolean;
}
