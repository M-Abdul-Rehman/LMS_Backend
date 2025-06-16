import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 'Programming Fundamentals' })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ example: 'CS1201' })
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty({ example: '1st' })
  @IsOptional()
  @IsString()
  semester: string;

  @ApiProperty({ example: 'Fall 2023' })
  @IsOptional()
  session: string;

  @ApiProperty({ example: 'CSE' })
  @IsOptional()
  department: string;

  @ApiProperty({ example: '123' })
  @IsOptional()
  instructerId: string;
}
