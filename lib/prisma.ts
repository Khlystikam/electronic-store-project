import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const prismaClientSingleton = () => {
    const dbUrl = new URL(process.env.DATABASE_URL as string);

    // Передаем настройки напрямую в адаптер (как и просит TypeScript)
    const adapter = new PrismaMariaDb({
        host: dbUrl.hostname,
        port: Number(dbUrl.port) || 3306,
        user: dbUrl.username,
        password: dbUrl.password,
        database: dbUrl.pathname.substring(1),
        connectionLimit: 5, // Наш спаситель от таймаутов
    });

    return new PrismaClient({ adapter });
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
