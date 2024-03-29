import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import IUser from './interfaces/user.interface';

export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find(
      {},
      null,
      { sort: { lastName: 1 } }
    ).exec();
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async updateByEmail(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { email: email },
      updateUserDto,
      { new: true },
    ).exec();
    return updatedUser;
  }

  async deleteByEmail(email: string): Promise<IUser> {
    const deletedUser = await this.userModel
      .findOneAndRemove({ email: email })
      .exec();
    return deletedUser;
  }
}
