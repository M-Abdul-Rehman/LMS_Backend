import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from './class.entity';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  findAll(): Promise<Class[]> {
    return this.classesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Class> {
    return this.classesService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Class>): Promise<Class> {
    return this.classesService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Class>,
  ): Promise<Class> {
    return this.classesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.classesService.remove(id);
  }
}
