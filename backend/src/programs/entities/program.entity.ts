import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { College } from '../../colleges/entities/college.entity';
import { Application } from '../../applications/entities/application.entity';

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => College, (college) => college.programs)
  college: College;

  @OneToMany(() => Application, (application) => application.program)
  applications: Application[];
}
