import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('role') role: UserRole,
  ) {
    return this.usersService.create(name, email, role);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
