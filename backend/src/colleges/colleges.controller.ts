import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CollegesService } from './colleges.service';

@Controller('colleges')
export class CollegesController {
  constructor(private readonly collegesService: CollegesService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return this.collegesService.create(name, description);
  }

  @Get()
  async findAll() {
    return this.collegesService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return this.collegesService.update(id, name, description);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.collegesService.remove(id);
  }
}
