import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from './entities/application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  async create(studentId: number, programId: number): Promise<Application> {
    const existing = await this.applicationsRepository.findOne({
      where: {
        student: { id: studentId } as any,
        status: ApplicationStatus.ENROLLED,
      },
    });

    if (existing) {
      throw new ConflictException('Student is already enrolled in a program');
    }

    const pending = await this.applicationsRepository.findOne({
      where: {
        student: { id: studentId } as any,
        program: { id: programId } as any,
        status: ApplicationStatus.PENDING,
      },
    });

    if (pending) {
      throw new ConflictException(
        'You already have a pending application for this program',
      );
    }

    const application = this.applicationsRepository.create({
      student: { id: studentId } as any,
      program: { id: programId } as any,
      status: ApplicationStatus.PENDING,
    });
    return this.applicationsRepository.save(application);
  }

  async manualEnroll(
    studentId: number,
    programId: number,
  ): Promise<Application> {
    const existing = await this.applicationsRepository.findOne({
      where: {
        student: { id: studentId } as any,
        status: ApplicationStatus.ENROLLED,
      },
    });

    if (existing) {
      throw new ConflictException(
        'This student is already enrolled in another program',
      );
    }

    const application = this.applicationsRepository.create({
      student: { id: studentId } as any,
      program: { id: programId } as any,
      status: ApplicationStatus.ENROLLED,
    });
    return this.applicationsRepository.save(application);
  }

  async findAll(): Promise<Application[]> {
    return this.applicationsRepository.find({
      relations: ['student', 'program', 'program.college'],
    });
  }

  async findByStudent(studentId: number): Promise<Application[]> {
    return this.applicationsRepository.find({
      where: { student: { id: studentId } as any },
      relations: ['program', 'program.college'],
    });
  }

  async updateStatus(
    id: number,
    status: ApplicationStatus,
  ): Promise<Application> {
    const application = await this.applicationsRepository.findOne({
      where: { id },
    });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    application.status = status;
    return this.applicationsRepository.save(application);
  }

  async remove(id: number): Promise<void> {
    const application = await this.applicationsRepository.findOne({
      where: { id },
    });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    await this.applicationsRepository.remove(application);
  }
}
