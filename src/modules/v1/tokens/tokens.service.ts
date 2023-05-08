
import { Injectable } from "@nestjs/common";
import { CreateTokenDto } from "./dto/create-token.dto";
import { TokensRepository } from "./tokens.repository";
import { Token } from "./schemas/tokens.schema";
import { UpdateTokenDto } from "./dto/update-token.dto";

@Injectable()
export class TokensService {
    constructor(private readonly tokensRepository: TokensRepository) { }

    async create(createTokenDto: CreateTokenDto): Promise<Token> {
        return this.tokensRepository.create(createTokenDto);
    }

    async findByUserId(userId: string): Promise<Token> {
        return this.tokensRepository.findByUserId(userId);
    }

    async updateByUserId(userId: string, updateTokenDto: UpdateTokenDto): Promise<Token> {
        return this.tokensRepository.updateByUserId(userId, updateTokenDto);
    }

    async deleteByUserId(userId: string): Promise<Token> {
        return this.tokensRepository.deleteByUserId(userId);
    }

}