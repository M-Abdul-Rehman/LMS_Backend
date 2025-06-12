import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,
  ) {}

  findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepo.find({ relations: ['student', 'class'] });
  }

  async findOne(id: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { id },
      relations: ['student', 'class'],
    });
    if (!enrollment)
      throw new NotFoundException(`Enrollment ID ${id} not found`);
    return enrollment;
  }

  create(data: Partial<Enrollment>): Promise<Enrollment> {
    const enrollment = this.enrollmentRepo.create(data);
    return this.enrollmentRepo.save(enrollment);
  }

  async update(id: string, data: Partial<Enrollment>): Promise<Enrollment> {
    const enrollment = await this.findOne(id);
    Object.assign(enrollment, data);
    return this.enrollmentRepo.save(enrollment);
  }

  async remove(id: string): Promise<void> {
    const enrollment = await this.findOne(id);
    await this.enrollmentRepo.remove(enrollment);
  }
}
