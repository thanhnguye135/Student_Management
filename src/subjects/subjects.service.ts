import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.subject.findMany({
        include: {
          class: true,
        },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.subject.findUnique({
        where: { subject_id: id },
        include: { class: true },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }

  async create(createSubjectDto: CreateSubjectDto) {
    try {
      const { class: CreateClassDto, ...subjectData } = createSubjectDto;
      return await this.prismaService.subject.create({
        data: {
          ...subjectData,
        },
        include: { class: true },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    try {
      const { class: CreateClassDto, ...subjectData } = updateSubjectDto;
      return await this.prismaService.subject.update({
        where: { subject_id: id },
        data: { ...subjectData },
        include: { class: true },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.subject.delete({
        where: { subject_id: id },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }
}
