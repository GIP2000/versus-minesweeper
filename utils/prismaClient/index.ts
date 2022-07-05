import { prisma, PrismaClient } from "@prisma/client";

const primsa = new PrismaClient(); 

const getPrisma = ()=>primsa; 

export default getPrisma; 