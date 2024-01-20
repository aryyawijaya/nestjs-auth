import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CallbackTx } from './interfaces/callback_tx';

@Injectable()
export class DbService {
  constructor(protected readonly prisma: PrismaService) {}

  protected async exectTx(fn: CallbackTx) {
    await this.prisma.$transaction(async (tx) => {
      fn(tx);
    });
  }
}
