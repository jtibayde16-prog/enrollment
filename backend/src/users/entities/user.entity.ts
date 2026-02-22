import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Application } from '../../applications/entities/application.entity';

export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  FACULTY = 'FACULTY',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @OneToMany(() => Application, (application) => application.student)
  applications: Application[];
}
