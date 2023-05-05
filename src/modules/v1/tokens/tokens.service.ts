import { CreateTokenDto } from "./dto/create-token.dto";
import { UpdateTokenDto } from "./dto/update-token.dto";
import { Token } from "./schemas/tokens.schema";
import { TokensRepository } from "./tokens.repository";

export class TokensService {
    constructor(private readonly tokenRepository: TokensRepository) { }

    async create(createTokenDto: CreateTokenDto): Promise<Token> {
        return this.tokenRepository.create(createTokenDto);
    }

    async findByUserId(userId: string): Promise<Token> | null {
        const token = this.tokenRepository.findByUserId(userId);
        if (token) {
            return token;
        }
        return null;
    }

    async updateByUserId(userId: string, updateTokenDto: UpdateTokenDto): Promise<Token> | undefined {
        return this.tokenRepository.updateByUserId(userId, updateTokenDto);
    }

    async deleteByUserId(userId: string): Promise<Token> | undefined {
        return this.tokenRepository.deleteByUserId(userId);
    }
}