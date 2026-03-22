"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addCategory(formData: FormData) {
	// 1. Достаем название из формы (атрибут name="name")
	const name = formData.get("name") as string;

	// 2. Базовая проверка: если пусто, ничего не делаем
	if (!name || name.trim() === "") {
		return { error: "Название не может быть пустым" };
	}

	try {
		// 3. Сохраняем в базу
		await prisma.category.create({
			data: { name: name.trim() },
		});

		// 4. Даем команду Next.js обновить страницу с категориями
		revalidatePath("/admin/categories");
	} catch (error) {
		console.error("Ошибка БД:", error);
		return { error: "Не удалось добавить категорию (возможно, она уже существует)" };
	}
}
