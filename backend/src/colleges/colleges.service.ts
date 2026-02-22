import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from './entities/college.entity';

@Injectable()
export class CollegesService {
  constructor(
    @InjectRepository(College)
    private collegesRepository: Repository<College>,
  ) {}

  async create(name: string, description: string): Promise<College> {
    const college = this.collegesRepository.create({ name, description });
    return this.collegesRepository.save(college);
  }

  async findAll(): Promise<College[]> {
    return this.collegesRepository.find({ relations: ['programs'] });
  }

  async update(
    id: number,
    name: string,
    description: string,
  ): Promise<College | null> {
    await this.collegesRepository.update(id, { name, description });
    return this.collegesRepository.findOne({
      where: { id },
      relations: ['programs'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.collegesRepository.delete(id);
  }
}
