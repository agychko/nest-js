import { Body, Controller, Delete, Get, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';
import IUser from './interfaces/user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

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
        data: newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'User not created!',
        error: 'Bad Request',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() response): Promise<User[]> {
    try {
      const usersData = await this.usersService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        data: usersData,
      });
    }
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('find')
  async findByEmail(@Res() response, @Body('email') email: string): Promise<IUser> {
    try {
      const existingUser = await this.usersService.findByEmail(email);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        data: existingUser,
      });
    }
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('update')
  async updateByEmail(
    @Request() request,
    @Res() response,
    @Body('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.usersService.updateByEmail(email, updateUserDto);
      console.log(request.user);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        data: existingUser,
      });
    }
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete')
  async deleteByEmail(@Res() response, @Body('email') email: string) {
    try {
      const deletedUser = await this.usersService.deleteByEmail(email);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        data: deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
