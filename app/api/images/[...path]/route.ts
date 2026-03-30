import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

// 1. Изменяем тип params на Promise
export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
	// 2. Обязательно "дожидаемся" params перед использованием
	const resolvedParams = await params;

	const uploadDir = process.env.UPLOAD_DIR;

	if (!uploadDir) {
		console.error("❌ ОШИБКА: UPLOAD_DIR не найден в .env");
		return new NextResponse("Server Config Error", { status: 500 });
	}

	// 3. Используем resolvedParams.path вместо params.path
	const cleanPath = resolvedParams.path.filter((p) => p !== "uploads" && p !== "public");
	const filePath = path.join(uploadDir, ...cleanPath);

	// ... дальше весь твой старый код без изменений ...

	if (!fs.existsSync(filePath)) {
		return new NextResponse("Not Found", { status: 404 });
	}

	try {
		const fileBuffer = fs.readFileSync(filePath);
		const ext = path.extname(filePath).toLowerCase();
		const mimeTypes: any = { ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

		return new NextResponse(fileBuffer, {
			headers: {
				"Content-Type": mimeTypes[ext] || "image/jpeg",
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	} catch (err) {
		return new NextResponse("Read Error", { status: 500 });
	}
}
