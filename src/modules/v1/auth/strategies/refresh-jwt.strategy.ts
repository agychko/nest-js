import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants/constants";
import { Token } from "../../tokens/schemas/tokens.schema";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Request } from "express";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.refreshKey,
            passReqToCallback: true
        })
    }
    async validate(req: Request, payload: any) {
        const refreshToken = req.get("Authorization").replace("Bearer", "").trim();
        const user = await this.authService.validateToken(payload, refreshToken);
        if (!user) {
            throw new UnauthorizedException('Please login');
        }
        return user;
    }
}