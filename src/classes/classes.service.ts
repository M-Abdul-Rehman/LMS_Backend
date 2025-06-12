import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classesRepository: Repository<Class>,
  ) {}

  findAll(): Promise<Class[]> {
    return this.classesRepository.find();
  }

  async findOne(id: string): Promise<Class> {
    const cls = await this.classesRepository.findOne({ where: { id } });
    if (!cls) throw new NotFoundException(`Class with ID ${id} not found`);
    return cls;
  }

  create(data: Partial<Class>): Promise<Class> {
    const cls = this.classesRepository.create(data);
    return this.classesRepository.save(cls);
  }

  async update(id: string, data: Partial<Class>): Promise<Class> {
    const cls = await this.findOne(id);
    Object.assign(cls, data);
    return this.classesRepository.save(cls);
  }

  async remove(id: string): Promise<void> {
    const cls = await this.findOne(id);
    await this.classesRepository.remove(cls);
  }
}
