import {
  Controller,
  Get,
  Post,
  Delete,
  Request,
  UseGuards,
  Body,
  UseFilters,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MongoExceptionFilter } from 'src/handlers/mongo-exception.filter';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @UseFilters(MongoExceptionFilter)
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() response) {
    try {
      const loginData = await this.authService.login(req.user);
      return response.status(HttpStatus.OK).json({
        message: 'Logged in sucessfully',
        data: loginData,
      });
    }
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  getUserInfo(@Request() req) {
    const { user } = req;
    console.log(user);
    return req.user;
  }

  @UseGuards(RefreshAuthGuard)
  @Get('refresh')
  async refresh(@Request() req) {
    return this.authService.refresh(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user);
  }
}
