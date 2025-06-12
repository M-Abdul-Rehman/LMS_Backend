import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Enrollment } from 'src/enrollments/enrollment.entity';
import { Result } from 'src/results/result.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  code: string;

  @Column()
  department: string;

  @Column()
  session: string;

  @Column()
  semester: string;

  @Column({ nullable: true })
  instructorId: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    (): typeof Enrollment => Enrollment,
    (enrollment): Class => enrollment.class,
  )
  enrollments: Enrollment[];

  @OneToMany((): typeof Result => Result, (result): Class => result.class)
  results: Result[];
}
