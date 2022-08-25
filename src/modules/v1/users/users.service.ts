import { Injectable } from '@nestjs/common';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import IUser from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.usersRepository.findByEmail(email);
  }
  async updateByEmail(email: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateByEmail(email, updateUserDto);
  }

  async deleteByEmail(email: string): Promise<User> {
    return this.usersRepository.deleteByEmail(email);
  }
}
