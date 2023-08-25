import { PrismaClient } from "@prisma/client";
import { differenceInCalendarDays } from "date-fns";

function prismaClientSingleton() {
  return new PrismaClient().$extends({
    result: {
      werd: {
        completed: {
          needs: { lastCompletedAt: true },
          compute({ lastCompletedAt }) {
            if (!lastCompletedAt) return false;
            return differenceInCalendarDays(new Date(), lastCompletedAt) < 2;
          },
        },
      },
    },
  });
}
export type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
