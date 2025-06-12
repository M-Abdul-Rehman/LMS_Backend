import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Student } from 'src/students/student.entity';
import { Class } from 'src/classes/class.entity';

@Entity('results')
@Unique(['student', 'class'])
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.results)
  student: Student;

  @ManyToOne(() => Class, (cls) => cls.results)
  class: Class;

  @Column()
  grade: string; // e.g. "A" or "85"

  @Column({ nullable: true })
  remarks: string;

  @CreateDateColumn()
  createdAt: Date;
}
