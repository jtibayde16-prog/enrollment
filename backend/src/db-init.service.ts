import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from './colleges/entities/college.entity';
import { Program } from './programs/entities/program.entity';

@Injectable()
export class DbInitService implements OnModuleInit {
  private readonly logger = new Logger(DbInitService.name);

  constructor(
    @InjectRepository(College)
    private readonly collegeRepo: Repository<College>,
    @InjectRepository(Program)
    private readonly programRepo: Repository<Program>,
  ) {}

  async onModuleInit() {
    this.logger.log('Checking Academic Data Initialization...');

    const data = [
      {
        name: 'College of Education',
        programs: [
          'Bachelor in Elementary Education',
          'Bachelor in Secondary Education',
          'Bachelor in Physical Education',
          'Bachelor in Early Childhood Education',
          'Bachelor in Secondary Education major in English',
        ],
      },
      {
        name: 'College of Agriculture and Forestry',
        programs: [
          'BS in Agriculture',
          'Bachelor in Animal Science',
          'BS in Agribusiness',
          'BS in Forestry',
          'Bachelor in Sugar Technology',
        ],
      },
      {
        name: 'College of Arts and Sciences',
        programs: [
          'Bachelor of Arts (AB English, Social Science)',
          'BS in Applied Statistics/BS in Statistics',
        ],
      },
      {
        name: 'College of Computer Studies',
        programs: ['BS in Information Technology'],
      },
      {
        name: 'College of Business and Management',
        programs: ['BS in Hotel & Restaurant Management'],
      },
      {
        name: 'College of Criminal Justice Education',
        programs: ['BS in Criminology'],
      },
      {
        name: 'College of Engineering',
        programs: [
          'BS in Mechanical Engineering',
          'BS in Electrical Engineering',
          'BS Agricultural and Biosystems Engineering',
        ],
      },
    ];

    for (const collegeData of data) {
      let college = await this.collegeRepo.findOne({
        where: { name: collegeData.name },
      });

      if (!college) {
        college = this.collegeRepo.create({
          name: collegeData.name,
          description: '',
        });
        college = await this.collegeRepo.save(college);
        this.logger.log(`Inserted College: ${college.name}`);
      }

      for (const progName of collegeData.programs) {
        const exists = await this.programRepo.findOne({
          where: { name: progName, college: { id: college.id } },
        });

        if (!exists) {
          await this.programRepo.save(
            this.programRepo.create({
              name: progName,
              description: '',
              college: college,
            }),
          );
          this.logger.log(`   + Added Program: ${progName}`);
        }
      }
    }
    this.logger.log('Academic Data Verified.');
  }
}
