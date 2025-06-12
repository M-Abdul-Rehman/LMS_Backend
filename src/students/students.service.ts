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

  async findOne(id: string): Promise<Student | null> {
    return await this.studentRepo.findOne({ where: { id } });
  }

  async create(data: CreateStudentDto): Promise<Student> {
    const student = this.studentRepo.create(data);
    return this.studentRepo.save(student);
  }

  async update(id: string, data: Partial<Student>): Promise<Student> {
    const student = await this.findOne(id);
    if (!student) throw new NotFoundException('Student not found');
    Object.assign(student, data);
    return this.studentRepo.save(student);
  }

  async remove(id: string): Promise<void> {
    const student = await this.findOne(id);
    if (!student) throw new NotFoundException('Student not found');
    await this.studentRepo.remove(student);
  }
}
