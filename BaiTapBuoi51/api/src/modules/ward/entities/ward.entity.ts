import { ApiProperty } from '@nestjs/swagger';

export class Ward {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 29 })
  province_id: number;

  @ApiProperty({ example: 'Phường Phúc Xá' })
  name: string;
}
