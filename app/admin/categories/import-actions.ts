'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function importFullData(data: any[]) {
    try {
        await prisma.$transaction(async (tx) => {
            for (const catNode of data) {
                // 1. Создаем или находим категорию
                const category = await tx.category.upsert({
                    where: { name: catNode.category },
                    update: {},
                    create: { name: catNode.category },
                });

                // 2. Создаем характеристики для этой категории
                const charMap = new Map();
                for (const charName of catNode.characteristics) {
                    const char = await tx.characteristic.upsert({
                        where: {
                            name_categoryId: { name: charName, categoryId: category.id },
                        },
                        update: {},
                        create: { name: charName, categoryId: category.id },
                    });
                    charMap.set(charName, char.id);
                }

                // 3. Создаем товары и их значения
                if (catNode.products) {
                    for (const p of catNode.products) {
                        const product = await tx.product.upsert({
                            where: { sku: p.sku },
                            update: {
                                name: p.name,
                                price: p.price,
                                categoryId: category.id,
                            },
                            create: {
                                name: p.name,
                                sku: p.sku,
                                price: p.price,
                                description: p.description || '',
                                categoryId: category.id,
                            },
                        });

                        // 4. Записываем значения характеристик для товара
                        if (p.values) {
                            for (const [charName, val] of Object.entries(p.values)) {
                                const charId = charMap.get(charName);
                                if (charId) {
                                    await tx.productValue.upsert({
                                        where: {
                                            productId_characteristicId: {
                                                productId: product.id,
                                                characteristicId: charId,
                                            },
                                        },
                                        update: { value: String(val) },
                                        create: {
                                            value: String(val),
                                            productId: product.id,
                                            characteristicId: charId,
                                        },
                                    });
                                }
                            }
                        }
                    }
                }
            }
        });

        revalidatePath('/admin/categories');
        return { success: true };
    } catch (error: any) {
        console.error('Import Error:', error);
        return { error: error.message };
    }
}
