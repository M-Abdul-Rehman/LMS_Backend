import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './result.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultsRepo: Repository<Result>,
  ) {}

  findAll(): Promise<Result[]> {
    return this.resultsRepo.find({ relations: ['student', 'class'] });
  }

  async findOne(id: string): Promise<Result> {
    const result = await this.resultsRepo.findOne({
      where: { id },
      relations: ['student', 'class'],
    });
    if (!result) throw new NotFoundException(`Result ID ${id} not found`);
    return result;
  }

  create(data: Partial<Result>): Promise<Result> {
    const result = this.resultsRepo.create(data);
    return this.resultsRepo.save(result);
  }
  async update(id: string, data: Partial<Result>): Promise<Result> {
    const result = await this.findOne(id);
    Object.assign(result, data);
    return this.resultsRepo.save(result);
  }

  async remove(id: string): Promise<void> {
    const result = await this.findOne(id);
    await this.resultsRepo.remove(result);
  }
}
