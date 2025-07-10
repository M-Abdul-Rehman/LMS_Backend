import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
  Column,
  JoinColumn,
} from 'typeorm';
import { Student } from '../students/student.entity';
import { Class } from '../classes/class.entity';

export enum EnrollmentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('enrollments')
@Unique(['student', 'class'])
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @Column({ nullable: false })
  studentId: number; // References Student.id

  @ManyToOne(() => Class, (cls) => cls.enrollments)
  @JoinColumn({ name: 'classId' })
  class: Class;

  @Column({ nullable: false })
  classId: string; // References Class.id

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.PENDING,
  })
  status: EnrollmentStatus;

  @CreateDateColumn()
  enrolledAt: Date;
}
