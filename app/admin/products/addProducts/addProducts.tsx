// app/admin/products/addProducts/addProducts.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./addImgNewProducts";

export async function addProduct(prevState: any, formData: FormData) {
	try {
		// 1. Сначала загружаем картинку
		const imageFile = formData.get("image") as File;
		const pathToFile = await uploadImage(imageFile, "products");

		// 2. Потом создаем товар в БД
		await prisma.product.create({
			data: {
				name: (formData.get("name") as string).trim(),
				sku: (formData.get("sku") as string).trim(),
				description: (formData.get("description") as string).trim(),
				price: parseFloat(formData.get("price") as string),
				imageUrl: pathToFile,
				categoryId: parseInt(formData.get("categoryId") as string) || null,
			},
		});

		revalidatePath("/admin/products");
		revalidatePath("/"); // Обновляем и витрину

		return { success: true, message: "Товар успешно добавлен!" };
	} catch (error: any) {
		console.error(error);
		return { error: error.message || "Ошибка при добавлении товара" };
	}
}
