import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { Result } from './result.entity';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  findAll(): Promise<Result[]> {
    return this.resultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Result> {
    return this.resultsService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Result>): Promise<Result> {
    return this.resultsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Result>,
  ): Promise<Result> {
    return this.resultsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.resultsService.remove(id);
  }
}
