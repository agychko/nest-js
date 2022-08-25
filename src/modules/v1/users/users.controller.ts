import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('find')
  async findByEmail(@Body('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Post('update')
  async updateByEmail(
    @Body('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateByEmail(email, updateUserDto);
  }

  @Delete('delete')
  async deleteByEmail(@Body('email') email: string) {
    return this.usersService.deleteByEmail(email);
  }
}
