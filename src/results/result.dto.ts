import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateResultDto {
  @ApiProperty({ example: 'A+' })
  @IsOptional()
  @IsString()
  grade: string;

  @ApiProperty({ example: 'Excellent' })
  @IsOptional()
  @IsString()
  remarks: string;
}
