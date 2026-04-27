'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { uploadImage } from './addImgNewProducts';

export async function addProduct(prevState: any, formData: FormData) {
    const id = formData.get('id');
    const name = formData.get('name') as string;
    const sku = formData.get('sku') as string;
    const price = formData.get('price') as string;
    const description = (formData.get('description') as string) || null;
    const categoryId = formData.get('categoryId') ? Number(formData.get('categoryId')) : null;

    // 1. Получаем ручной ввод ссылки
    const manualImageUrl = formData.get('manualImageUrl') as string;
    const imageFile = formData.get('image') as File | null;

    try {
        let imageUrl: string | null = null;

        // 2. ОПРЕДЕЛЯЕМ ПУТЬ К КАРТИНКЕ
        if (imageFile && imageFile.size > 0) {
            // Если загружен файл — используем загрузчик
            // (Предполагаем, что uploadImage вернет путь вида /api/images/filename.jpg)
            imageUrl = await uploadImage(imageFile);
        } else if (manualImageUrl) {
            // Если файла нет, но есть текст в поле — берем его "КАК ЕСТЬ"
            // Никаких префиксов не добавляем
            imageUrl = manualImageUrl;
        }

        if (id) {
            // --- РЕДАКТИРОВАНИЕ ---
            // Формируем объект данных для обновления
            const updateData: any = {
                name,
                sku,
                price,
                description,
                categoryId,
            };

            // Обновляем ссылку на картинку только если мы получили что-то новое
            // (либо из файла, либо из ручного ввода)
            if (imageUrl !== null) {
                updateData.imageUrl = imageUrl;
            }

            await prisma.product.update({
                where: { id: Number(id) },
                data: updateData,
            });

            revalidatePath('/admin/products');
            return { success: true, message: 'Товар обновлен!' };
        } else {
            // --- СОЗДАНИЕ ---
            await prisma.product.create({
                data: {
                    name,
                    sku,
                    price,
                    description,
                    categoryId,
                    // Если ничего не ввели и не загрузили, будет пустая строка или null
                    imageUrl: imageUrl || '',
                },
            });

            revalidatePath('/admin/products');
            return { success: true, message: 'Товар успешно создан!' };
        }
    } catch (e: any) {
        console.error('Ошибка:', e);
        return { error: 'Ошибка при сохранении в базу данных' };
    }
}
