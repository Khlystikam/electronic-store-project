// app/admin/products/addProducts/addImgNewProducts.tsx
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export async function uploadImage(file: File | null, folder: string = "products") {
	if (!file || file.size === 0) return null;

	// Берем путь из .env или используем папку в корне (как запасной вариант)
	const externalPath = process.env.UPLOAD_DIR || path.join(process.cwd(), "external_uploads");

	// Формируем полный путь на диске: /var/www/my-store-uploads/products
	const uploadDir = path.join(externalPath, folder);

	await fs.mkdir(uploadDir, { recursive: true });

	const extension = file.type.split("/")[1];
	const fileName = `${crypto.randomUUID()}.${extension}`;
	const filePath = path.join(uploadDir, fileName);

	const arrayBuffer = await file.arrayBuffer();
	await fs.writeFile(filePath, Buffer.from(arrayBuffer));

	// Важно: теперь мы возвращаем просто имя файла + папку,
	// так как прямого URL через /public больше нет
	return `${folder}/${fileName}`;
}
