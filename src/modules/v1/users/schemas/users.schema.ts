import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Role } from '../../auth/roles/role.enum';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  timestamps: true,
  versionKey: false,
})

export class User {

  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: String, enum: Role, default: Role.STUDENT })
  roles: Role[];
}
export const UserSchema = SchemaFactory.createForClass(User);
