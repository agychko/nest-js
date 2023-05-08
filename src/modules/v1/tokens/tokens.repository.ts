
import { Model } from "mongoose";
import { Token, TokenDocument } from "./schemas/tokens.schema";
import { CreateTokenDto } from "./dto/create-token.dto"
import { InjectModel } from "@nestjs/mongoose";
import { UpdateTokenDto } from "./dto/update-token.dto";

export class TokensRepository {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) { }

  async create(createTokenDto: CreateTokenDto): Promise<Token> {
    const createdToken = new this.tokenModel(createTokenDto);
    return createdToken.save();
  }

  async findByUserId(userId: string): Promise<Token> {
    return this.tokenModel.findOne({ userId: userId }).exec();
  }

  async updateByUserId(
    userId: string,
    updateTokenDto: UpdateTokenDto,
  ): Promise<Token> {
    const updatedToken = await this.tokenModel.findOneAndUpdate(
      { userId: userId },
      updateTokenDto,
      { new: true },
    );
    return updatedToken;
  }

  async deleteByUserId(userId: string): Promise<Token> {
    const deletedToken = await this.tokenModel
      .findOneAndRemove({ userId: userId })
      .exec();
    return deletedToken;
  }

}