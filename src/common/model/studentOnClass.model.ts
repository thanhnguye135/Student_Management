import { ApiProperty } from '@nestjs/swagger';
import { Student } from 'src/students/model/student.model';
import { Class } from 'src/classes/model/class.model';

export class StudentOnClass {
  @ApiProperty()
  student_id: number;

  @ApiProperty()
  class_id: number;

  @ApiProperty({ type: () => Student })
  student: Student;

  @ApiProperty({ type: () => Class })
  class: Class;
}
