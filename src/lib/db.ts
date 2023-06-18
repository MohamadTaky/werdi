import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
declare global {}
export default prisma;
