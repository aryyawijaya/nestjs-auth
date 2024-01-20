import { Role } from '@prisma/client';

export type CreateUser = {
  username: string;
  password: string;
  role?: Role;
  createdBy: string;
};
