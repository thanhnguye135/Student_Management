import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Student } from './model/student.model';
import { Class } from 'src/classes/model/class.model';

@Injectable()
export class StudentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: number): Promise<Student | null> {
    const student = await this.prismaService.student.findUnique({
      where: {
        student_id: id,
      },
      include: {
        classes: true,
      },
    });

    return student;
  }
}
