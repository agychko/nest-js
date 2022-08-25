import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'tokens',
})
export class Token {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop()
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
