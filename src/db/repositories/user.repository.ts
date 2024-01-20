import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { CreateUser } from '../interfaces/user';

@Injectable()
export class UserRepository extends DbService {
  async findByUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: { username: username },
    });
  }

  async create(createUser: CreateUser) {
    const { username, password, role, createdBy } = createUser;

    return await this.prisma.user.create({
      data: {
        username: username,
        password: password,
        role: role,
        createdBy: createdBy,
      },
    });
  }
}
