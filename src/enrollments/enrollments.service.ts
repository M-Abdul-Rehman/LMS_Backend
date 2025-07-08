import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { EnrollmentStatus } from './enrollment.entity';
import { Student } from '../students/student.entity';
import { Class } from '../classes/class.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(Class)
    private classRepo: Repository<Class>,
  ) {}

  async findAll(
    status?: EnrollmentStatus,
    studentId?: string,
  ): Promise<Enrollment[]> {
    const query = this.enrollmentRepo
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.student', 'student')
      .leftJoinAndSelect('enrollment.class', 'class');

    if (status) {
      query.where('enrollment.status = :status', { status });
    }

    if (studentId) {
      query.andWhere('enrollment.studentId = :studentId', { studentId });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { id },
      relations: ['student', 'class'],
    });
    if (!enrollment) {
      throw new NotFoundException(`Enrollment ID ${id} not found`);
    }
    return enrollment;
  }

  async create(data: Partial<Enrollment>): Promise<Enrollment> {
    if (!data.student || !data.student.id) {
      throw new BadRequestException('Student ID is required');
    }

    if (!data.class || !data.class.id) {
      throw new BadRequestException('Class ID is required');
    }

    // Verify student exists
    const student = await this.studentRepo.findOne({
      where: { id: data.student.id },
    });
    if (!student) {
      throw new NotFoundException(`Student ID ${data.student.id} not found`);
    }

    // Verify class exists
    const cls = await this.classRepo.findOne({
      where: { id: data.class.id },
    });
    if (!cls) {
      throw new NotFoundException(`Class ID ${data.class.id} not found`);
    }

    // Check if enrollment already exists
    const existing = await this.enrollmentRepo.findOne({
      where: {
        student: { id: data.student.id },
        class: { id: data.class.id },
      },
    });

    if (existing) {
      return existing;
    }

    const enrollment = this.enrollmentRepo.create({
      ...data,
      status: EnrollmentStatus.PENDING,
    });
    return this.enrollmentRepo.save(enrollment);
  }

  async updateStatus(
    id: string,
    status: EnrollmentStatus,
  ): Promise<Enrollment> {
    const enrollment = await this.findOne(id);
    enrollment.status = status;
    return this.enrollmentRepo.save(enrollment);
  }

  async remove(id: string): Promise<void> {
    const enrollment = await this.findOne(id);
    await this.enrollmentRepo.remove(enrollment);
  }
}
