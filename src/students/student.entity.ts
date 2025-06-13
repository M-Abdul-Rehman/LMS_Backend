import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enrollment } from 'src/enrollments/enrollment.entity';
import { Result } from 'src/results/result.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  studentId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  session: string; // e.g. '2021'

  @Column()
  department: string; // e.g. 'CSE'

  @Column()
  rollNumber: string; // e.g. '045'

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany(() => Result, (result) => result.student)
  results: Result[];
}
