import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private programsRepository: Repository<Program>,
  ) {}

  async create(
    name: string,
    description: string,
    collegeId: number,
  ): Promise<Program> {
    const program = this.programsRepository.create({
      name,
      description,
      college: { id: collegeId } as any,
    });
    return this.programsRepository.save(program);
  }

  async findAll(): Promise<Program[]> {
    return this.programsRepository.find({ relations: ['college'] });
  }

  async update(
    id: number,
    name: string,
    description: string,
    collegeId: number,
  ): Promise<Program | null> {
    await this.programsRepository.update(id, {
      name,
      description,
      college: { id: collegeId } as any,
    });
    return this.programsRepository.findOne({
      where: { id },
      relations: ['college'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.programsRepository.delete(id);
  }
}
