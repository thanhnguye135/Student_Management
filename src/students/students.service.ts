import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.student.findMany({
        include: { classes: true },
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.student.findUnique({
        where: { student_id: id },
        include: { classes: true },
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async create(createStudentDto: CreateStudentDto) {
    try {
      const { classes, ...studentData } = createStudentDto;
      const classData = this.extractFirstClassData(classes);

      return await this.prismaService.student.create({
        data: {
          ...studentData,
          classes: {
            create: {
              class: {
                create: {
                  name: classData.name,
                  room: classData.room,
                  group: classData.group,
                  subjects: {
                    create: {
                      name: classData.subjects[0].name,
                      credit: classData.subjects[0].credit,
                    },
                  },
                },
              },
            },
          },
        },
        include: this.includeRelations(),
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      const { classes, ...studentData } = updateStudentDto;

      return await this.prismaService.student.update({
        where: { student_id: id },
        data: {
          ...studentData,
        },
        include: this.includeRelations(),
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.student.delete({
        where: { student_id: id },
        include: { classes: true },
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  private includeRelations() {
    return {
      classes: {
        include: {
          student: true,
          class: true,
        },
      },
    };
  }

  private extractFirstClassData(classes: any) {
    return classes.entries().next().value[1].class;
  }

  private handleException(error: any) {
    throw new HttpException(
      error.message || 'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: new Error(error) },
    );
  }
}
