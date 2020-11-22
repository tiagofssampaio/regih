import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function createContext() {
    return { prisma }
}

module.exports = {
    createContext,
}