import { PrismaClient } from '@virtualteam/db';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
export const db = prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
