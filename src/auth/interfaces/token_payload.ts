import { Role } from '@prisma/client';

export class TokenPayload {
  id: number;
  username: string;
  role: Role;
  iat?: Date;
  exp?: Date;
}
