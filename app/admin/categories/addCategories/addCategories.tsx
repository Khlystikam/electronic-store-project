"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addCategory(formData: FormData) {
	const name = formData.get("name") as string;

	// 1. Проверяем на пустоту. Если пусто - выводим в лог и просто выходим (return)
	if (!name || name.trim() === "") {
		console.error("Название не может быть пустым");
		return;
	}

	try {
		// 2. Сохраняем в базу
		await prisma.category.create({
			data: { name: name.trim() },
		});

		// 3. Обновляем страницу
		revalidatePath("/admin/categories");
	} catch (error) {
		// Если категория уже есть (ошибка уникальности) или отвалилась БД
		console.error("Ошибка при добавлении в БД:", error);
	}
}
