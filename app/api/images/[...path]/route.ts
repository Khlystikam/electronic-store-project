import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
	const uploadDir = process.env.UPLOAD_DIR;

	if (!uploadDir) {
		console.error("❌ ОШИБКА: UPLOAD_DIR не найден в .env");
		return new NextResponse("Server Config Error", { status: 500 });
	}

	// Очищаем путь от возможных дублей (если в базе записано 'uploads/products/...')
	// Мы берем только последние два сегмента, если их много
	const cleanPath = params.path.filter((p) => p !== "uploads" && p !== "public");
	const filePath = path.join(uploadDir, ...cleanPath);

	console.log("-----------------------------------");
	console.log("🔍 ЗАПРОС КАРТИНКИ");
	console.log("🔹 Параметры из URL:", params.path.join("/"));
	console.log("🔹 Итоговый путь на диске:", filePath);

	if (!fs.existsSync(filePath)) {
		console.error("❌ ФАЙЛ НЕ СУЩЕСТВУЕТ ПО ЭТОМУ ПУТИ!");
		return new NextResponse("Not Found", { status: 404 });
	}

	try {
		const fileBuffer = fs.readFileSync(filePath);
		const ext = path.extname(filePath).toLowerCase();
		const mimeTypes: any = { ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

		console.log("✅ ФАЙЛ НАЙДЕН И ОТПРАВЛЕН");
		return new NextResponse(fileBuffer, {
			headers: { "Content-Type": mimeTypes[ext] || "image/jpeg" },
		});
	} catch (err) {
		console.error("❌ ОШИБКА ПРИ ЧТЕНИИ:", err);
		return new NextResponse("Read Error", { status: 500 });
	}
}
