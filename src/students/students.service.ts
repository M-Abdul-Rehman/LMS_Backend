import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './students.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepo.find();
  }

  async findOne(studentId: string): Promise<Student | null> {
    return await this.studentRepo.findOne({ where: { studentId } });
  }

  async create(data: CreateStudentDto): Promise<Student> {
    const student = this.studentRepo.create(data);
    return this.studentRepo.save(student);
  }

  async update(studentId: string, data: Partial<Student>): Promise<Student> {
    const student = await this.findOne(studentId);
    if (!student) throw new NotFoundException('Student not found');
    Object.assign(student, data);
    return this.studentRepo.save(student);
  }

  async remove(studentId: string): Promise<void> {
    const student = await this.findOne(studentId);
    if (!student) throw new NotFoundException('Student not found');
    await this.studentRepo.remove(student);
  }
}
