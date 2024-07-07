import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.class.findMany({
        include: this.includeRelations(),
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.class.findUnique({
        where: { class_id: id },
        include: this.includeRelations(),
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async create(createClassDto: CreateClassDto) {
    try {
      const { students, subjects, ...classData } = createClassDto;
      const studentData = this.extractFirstEntry(students);
      const subjectData = this.extractFirstEntry(subjects);

      return await this.prismaService.class.create({
        data: {
          ...classData,
          students: {
            create: {
              student: {
                create: {
                  ...studentData,
                },
              },
            },
          },
          subjects: {
            create: {
              ...subjectData,
            },
          },
        },
        include: this.includeRelations(),
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    try {
      const { students, subjects, ...classData } = updateClassDto;

      return await this.prismaService.class.update({
        where: { class_id: id },
        data: {
          ...classData,
        },
        include: this.includeRelations(),
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.class.delete({
        where: { class_id: id },
        include: this.includeRelations(),
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  private includeRelations() {
    return {
      students: { include: { student: true } },
      subjects: true,
    };
  }

  private extractFirstEntry(entries: any) {
    return entries.entries().next().value[1];
  }

  private handleException(error: any) {
    throw new HttpException(
      error.message || 'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: new Error(error) },
    );
  }
}
