import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegesController } from './colleges.controller';
import { CollegesService } from './colleges.service';
import { College } from './entities/college.entity';

@Module({
  imports: [TypeOrmModule.forFeature([College])],
  controllers: [CollegesController],
  providers: [CollegesService],
  exports: [CollegesService],
})
export class CollegesModule {}
