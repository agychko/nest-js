import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles/role.enum';
import { ROLES_KEY } from '../roles/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/constants';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        console.log(requiredRoles);
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(user);
        // const token = this.extractTokenFromHeader(request);
        // try {
        //     const payload = this.jwtService.verify(
        //         token,
        //         {
        //             secret: jwtConstants.accessKey
        //         }
        //     );
        //     console.log(payload);
        //     return requiredRoles.some((role) => payload.roles?.includes(role));
        // } catch {
        //     throw new UnauthorizedException('Yay');
        // }
        return requiredRoles.some((role) => user?.roles?.includes(role));
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}