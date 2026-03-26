"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addProduct(prevState: any, formData: FormData) {
	// Извлекаем данные
	const name = formData.get("name") as string;
	const description = formData.get("description") as string;
	const sku = formData.get("sku") as string;
	const price = formData.get("price") as string;
	const categoryId = formData.get("categoryId") as string;

	// 1. Валидация
	if (!name || !sku || !price) {
		return { error: "Поля Название, Артикул и Цена обязательны" };
	}

	try {
		// 2. Сохраняем в базу
		await prisma.product.create({
			data: {
				name: name.trim(),
				description: description?.trim(),
				sku: sku.trim(),
				price: parseFloat(price), // Преобразуем строку в число
				// Если есть категория, привязываем её
				categoryId: categoryId ? parseInt(categoryId) : null,
			},
		});

		// 3. Обновляем кэш
		revalidatePath("/admin/products");
		return { success: true, message: "Товар успешно добавлен" };
	} catch (error: any) {
		console.error("Ошибка БД:", error);
		if (error.code === "P2002") {
			return { error: "Продукт с таким SKU уже существует" };
		}
		return { error: "Произошла ошибка при сохранении" };
	}
}
