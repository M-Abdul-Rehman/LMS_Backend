import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ description: 'Student ID string (e.g. Fa2021-CS-123)' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ description: 'Class ID (UUID)' })
  @IsString()
  @IsNotEmpty()
  classId: string;
}
