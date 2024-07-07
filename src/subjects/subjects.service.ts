import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.subject.findMany({
        include: { class: true },
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.subject.findUnique({
        where: { subject_id: id },
        include: { class: true },
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async create(createSubjectDto: CreateSubjectDto) {
    try {
      const { class: classData, ...subjectData } = createSubjectDto;
      return await this.prismaService.subject.create({
        data: { ...subjectData },
        include: { class: true },
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    try {
      const { class: classData, ...subjectData } = updateSubjectDto;
      return await this.prismaService.subject.update({
        where: { subject_id: id },
        data: { ...subjectData },
        include: { class: true },
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.subject.delete({
        where: { subject_id: id },
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  private handleException(error: any) {
    throw new HttpException(
      error.message || 'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: new Error(error) },
    );
  }
}
