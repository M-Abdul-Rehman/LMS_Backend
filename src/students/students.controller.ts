import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './student.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStudentDto } from './students.dto';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Student> {
    const student = await this.studentsService.findOne(id);
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new student',
    description: 'Creates a new student record in the system.',
  })
  create(@Body() data: CreateStudentDto): Promise<Student> {
    return this.studentsService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Student>,
  ): Promise<Student> {
    return this.studentsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.studentsService.remove(id);
  }
}
