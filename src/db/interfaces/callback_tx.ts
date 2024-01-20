import { Prisma } from '@prisma/client';

export type CallbackTx = (tx: Prisma.TransactionClient) => void;
