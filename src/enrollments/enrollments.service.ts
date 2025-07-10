import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { EnrollmentStatus } from './enrollment.entity';
import { Student } from '../students/student.entity';
import { Class } from '../classes/class.entity';
import { CreateEnrollmentDto } from './enrollment.dto';

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
    studentStringId?: string,
  ): Promise<Enrollment[]> {
    const query = this.enrollmentRepo
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.student', 'student')
      .leftJoinAndSelect('enrollment.class', 'class');

    if (status) {
      query.where('enrollment.status = :status', { status });
    }

    if (studentStringId) {
      query.andWhere('student.studentId = :studentStringId', {
        studentStringId,
      });
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

  async create(data: CreateEnrollmentDto): Promise<Enrollment> {
    // Find student by string ID
    const student = await this.studentRepo.findOne({
      where: { studentId: data.studentId },
    });

    if (!student) {
      throw new NotFoundException(
        `Student with ID ${data.studentId} not found`,
      );
    }

    // Verify class exists
    const cls = await this.classRepo.findOne({
      where: { id: data.classId },
    });

    if (!cls) {
      throw new NotFoundException(`Class ID ${data.classId} not found`);
    }

    // Check if enrollment already exists
    const existing = await this.enrollmentRepo.findOne({
      where: {
        student: { id: student.id },
        class: { id: data.classId },
      },
    });

    if (existing) {
      return existing;
    }

    const enrollment = this.enrollmentRepo.create({
      student,
      class: cls,
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
