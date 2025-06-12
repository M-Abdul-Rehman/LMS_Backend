import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'John' })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Fall 2023' })
  @IsOptional()
  session: string;

  @ApiProperty({ example: 'CSE' })
  @IsOptional()
  department: string;

  @ApiProperty({ example: '123' })
  @IsOptional()
  rollNumber: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePassword123' })
  password: string;
}
