import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async findAll() {
    return await this.subjectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subjectId = this.parseId(id);
    return await this.subjectsService.findOne(subjectId);
  }

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return await this.subjectsService.create(createSubjectDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    const subjectId = this.parseId(id);
    return await this.subjectsService.update(subjectId, updateSubjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const subjectId = this.parseId(id);
    return await this.subjectsService.remove(subjectId);
  }

  private parseId(id: string): number {
    return parseInt(id, 10);
  }
}
