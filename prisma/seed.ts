import prisma from "@/lib/prisma";
import productsData from "./data/products.json";

async function main() {
	for (const item of productsData) {
		// 1. Находим или создаем категорию
		const category = await prisma.category.upsert({
			where: { name: item.categoryName },
			update: {},
			create: { name: item.categoryName },
		});

		// 2. Создаем или обновляем товар
		await prisma.product.upsert({
			where: { sku: item.sku },
			update: {
				name: item.name,
				price: item.price,
				imageUrl: item.image_url,
			},
			create: {
				name: item.name,
				sku: item.sku,
				price: item.price,
				imageUrl: item.image_url,
				categoryId: category.id,
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
