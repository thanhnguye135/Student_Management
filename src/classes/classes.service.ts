import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.class.findMany({
        include: {
          students: { include: { student: true } },
          subjects: true,
        },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.class.findUnique({
        where: { class_id: id },
        include: {
          students: { include: { student: true } },
          subjects: true,
        },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }

  async create(createClassDto: CreateClassDto) {
    try {
      const { students, subjects, ...classData } = createClassDto;
      const studentData = students.entries().next().value[1];
      const subjectData = subjects.entries().next().value[1];

      //   console.log(studentData, subjectData);

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
        include: {
          students: {
            include: {
              student: true,
            },
          },
          subjects: true,
        },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
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
        include: {
          students: { include: { student: true } },
          subjects: true,
        },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.class.delete({
        where: { class_id: id },
        include: {
          students: true,
          subjects: true,
        },
      });
    } catch (e) {
      throw new HttpException(e, 500, { cause: new Error(e) });
    }
  }
}
