import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationStatus } from './entities/application.entity';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('apply')
  async apply(
    @Body('studentId') studentId: number,
    @Body('programId') programId: number,
  ) {
    return this.applicationsService.create(studentId, programId);
  }

  @Post('manual-enroll')
  async manualEnroll(
    @Body('studentId') studentId: number,
    @Body('programId') programId: number,
  ) {
    return this.applicationsService.manualEnroll(studentId, programId);
  }

  @Get()
  async findAll() {
    return this.applicationsService.findAll();
  }

  @Get('my')
  async findByStudent(@Query('studentId') studentId: number) {
    return this.applicationsService.findByStudent(studentId);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: ApplicationStatus,
  ) {
    return this.applicationsService.updateStatus(id, status);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.applicationsService.remove(id);
  }
}
