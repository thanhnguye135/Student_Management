import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentsService.create(createStudentDto);
  }

  @Get()
  async findAll() {
    return await this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const studentId = this.parseId(id);
    return await this.studentsService.findOne(studentId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const studentId = this.parseId(id);
    return await this.studentsService.update(studentId, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const studentId = this.parseId(id);
    return await this.studentsService.remove(studentId);
  }

  private parseId(id: string): number {
    return parseInt(id, 10);
  }
}
