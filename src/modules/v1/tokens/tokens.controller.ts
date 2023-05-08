import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TokensService } from "./tokens.service";
import { CreateTokenDto } from "./dto/create-token.dto";
import { Token } from "./schemas/tokens.schema";
import { UpdateTokenDto } from "./dto/update-token.dto";

@ApiTags('Tokens')
@Controller('v1/tokens')
export class TokensController {
    constructor(private readonly tokensService: TokensService) { }

    @Post('create')
    async create(@Body() createTokenDto: CreateTokenDto): Promise<Token> {
        return this.tokensService.create(createTokenDto);
    }

    @Get('find')
    async findByUserId(@Body('userId') userId: string): Promise<Token> {
        return this.tokensService.findByUserId(userId);
    }

    @Post('update')
    async updateToken(@Body('userId') userId: string, @Body() updateTokenDto: UpdateTokenDto) {
        return this.tokensService.updateByUserId(userId, updateTokenDto);
    }

    @Delete('delete')
    async deleteToken(@Body('userId') userId: string) {
        return this.tokensService.deleteByUserId(userId);
    }

}