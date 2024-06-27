import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Student } from './model/student.model';
import { Class } from 'src/classes/model/class.model';
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
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.student.findUnique({
        where: {
          student_id: id,
        },
        include: {
          classes: true,
        },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }

  async create(createStudentDto: CreateStudentDto) {
    try {
      const { classes, ...studentData } = createStudentDto;
      const classData = classes.entries().next().value[1].class;
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
        include: {
          classes: {
            include: {
              student: true,
              class: true,
            },
          },
        },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      const { classes, ...studentData } = updateStudentDto;
      console.log(studentData, id);

      return await this.prismaService.student.update({
        where: {
          student_id: id,
        },
        data: {
          ...studentData,
        },
        include: {
          classes: {
            include: {
              student: true,
              class: true,
            },
          },
        },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }

  async remove(id: number) {
    try {
      return this.prismaService.student.delete({
        where: { student_id: id },
        include: {
          classes: true,
        },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }
}
