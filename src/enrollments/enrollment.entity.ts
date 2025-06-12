import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Student } from 'src/students/student.entity';
import { Class } from 'src/classes/class.entity';

@Entity('enrollments')
@Unique(['student', 'class'])
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    (): typeof Student => Student,
    (student): Enrollment[] => student.enrollments,
  )
  student: Student;

  @ManyToOne(
    (): typeof Class => Class,
    (cls: Class): Enrollment[] => cls.enrollments,
  )
  class: Class;

  @CreateDateColumn()
  enrolledAt: Date;
}
