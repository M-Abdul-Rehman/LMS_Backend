import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './enrollment.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EnrollmentStatus } from './enrollment.entity';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all enrollments' })
  @ApiResponse({ status: 200, description: 'List of all enrollments' })
  findAll(
    @Query('status') status?: EnrollmentStatus,
    @Query('studentId') studentId?: string,
  ): Promise<Enrollment[]> {
    return this.enrollmentsService.findAll(status, studentId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single enrollment' })
  @ApiResponse({ status: 200, description: 'The enrollment record' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  findOne(@Param('id') id: string): Promise<Enrollment> {
    return this.enrollmentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new enrollment' })
  @ApiResponse({ status: 201, description: 'Enrollment created' })
  create(@Body() data: Partial<Enrollment>): Promise<Enrollment> {
    return this.enrollmentsService.create(data);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update enrollment status' })
  @ApiResponse({ status: 200, description: 'Status updated' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: EnrollmentStatus,
  ): Promise<Enrollment> {
    return this.enrollmentsService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an enrollment' })
  @ApiResponse({ status: 200, description: 'Enrollment deleted' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.enrollmentsService.remove(id);
  }
}
