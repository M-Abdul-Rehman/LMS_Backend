import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Enrollment } from 'src/enrollments/enrollment.entity';
import { Result } from 'src/results/result.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  // Relations
  @OneToMany(
    (): typeof Enrollment => Enrollment,
    (enrollment): Student => enrollment.student,
  )
  enrollments: Enrollment[];

  @OneToMany(() => Result, (result) => result.student)
  results: Result[];
}
