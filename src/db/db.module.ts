import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [DbService, PrismaService, UserRepository],
  exports: [UserRepository],
})
export class DbModule {}
