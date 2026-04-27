'use server';

import { prisma } from '@/lib/prisma'; // Проверь правильность пути к твоему prisma.ts
import { revalidatePath } from 'next/cache';

export async function deleteCategory(id: number) {
    try {
        await prisma.category.delete({
            where: { id: id },
        });

        // Обновляем кэш страницы, чтобы удаленная категория сразу исчезла из таблицы
        revalidatePath('/admin/categories');
    } catch (error) {
        console.error('Ошибка при удалении категории:', error);
        // В будущем здесь можно возвращать сообщение об ошибке на фронтенд
    }
}
