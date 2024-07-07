import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async findAll() {
    return await this.classesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const classId = this.parseId(id);
    return await this.classesService.findOne(classId);
  }

  @Post()
  async create(@Body() createClassDto: CreateClassDto) {
    return await this.classesService.create(createClassDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    const classId = this.parseId(id);
    return await this.classesService.update(classId, updateClassDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const classId = this.parseId(id);
    return await this.classesService.remove(classId);
  }

  private parseId(id: string): number {
    return parseInt(id, 10);
  }
}
