import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import IUser from './interfaces/user.interface';
import { comparePassword, hashPassword } from '../../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const password = await hashPassword(createUserDto.password);
    return this.usersRepository.create({ ...createUserDto, password });
  }

  async findAll(): Promise<IUser[]> {
    const userData = await this.usersRepository.findAll();
    if (!userData || userData.length === 0) {
      throw new NotFoundException(`Users not found!`)
    }
    return userData;
  }

  async findByEmail(email: string): Promise<IUser> {
    const exsistingUser = await this.usersRepository.findByEmail(email);
    if (!exsistingUser) {
      throw new NotFoundException(`User with email:${email} not exsist!`)
    }
    return exsistingUser;
  }
  async updateByEmail(email: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const exsistingUser = await this.usersRepository.updateByEmail(email, updateUserDto);
    if (!exsistingUser) {
      throw new NotFoundException(`User with email:${email} not exsist!`)
    }
    return exsistingUser;
  }

  async deleteByEmail(email: string): Promise<IUser> {
    const deletedUser = await this.usersRepository.deleteByEmail(email);
    if (!deletedUser) {
      throw new NotFoundException(`User with email:${email} not exsist!`)
    }
    return deletedUser;
  }
}
