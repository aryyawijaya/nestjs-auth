import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '@prisma/client';
import { AuthenticatedRequest } from '../interfaces/authenticated_requires';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const authenticatedRequest: AuthenticatedRequest = context
      .switchToHttp()
      .getRequest();
    const user = authenticatedRequest.user;
    return requiredRoles.some((role) => user.role === role);
  }
}
