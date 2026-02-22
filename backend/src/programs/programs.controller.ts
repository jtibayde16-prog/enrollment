import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('collegeId') collegeId: number,
  ) {
    return this.programsService.create(name, description, collegeId);
  }

  @Get()
  async findAll() {
    return this.programsService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('collegeId') collegeId: number,
  ) {
    return this.programsService.update(id, name, description, collegeId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.programsService.remove(id);
  }
}
