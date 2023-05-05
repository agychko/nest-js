import { Body, Controller, Delete, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';
import IUser from './interfaces/user.interface';

@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('create')
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
        details: error
      });
    }
  }

  @Post('validate')
  async validate(@Body('email') email: string, @Body('password') password: string) {
    return this.usersService.validateUser(email, password);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('find')
  async findByEmail(@Body('email') email: string): Promise<IUser> {
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
