import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './enrollment.entity';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  findAll(): Promise<Enrollment[]> {
    return this.enrollmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Enrollment> {
    return this.enrollmentsService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Enrollment>): Promise<Enrollment> {
    return this.enrollmentsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Enrollment>,
  ): Promise<Enrollment> {
    return this.enrollmentsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.enrollmentsService.remove(id);
  }
}
