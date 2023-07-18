
import { Injectable, NotFoundException } from "@nestjs/common";
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
        const exsistingToken = await this.tokensRepository.findByUserId(userId);

        return exsistingToken;
    }

    async updateByUserId(userId: string, updateTokenDto: UpdateTokenDto): Promise<Token> {
        const exsistingToken = await this.tokensRepository.updateByUserId(userId, updateTokenDto);

        return exsistingToken;
    }

    async deleteByUserId(userId: string): Promise<Token> {
        const deletedToken = await this.tokensRepository.deleteByUserId(userId);

        return deletedToken;
    }

}