import prisma from "@/lib/prisma";

export default async function HomePage() {
	// Забираем товары из MySQL
	const products = await prisma.product.findMany({
		include: { category: true },
		orderBy: { id: "desc" },
	});

	return (
		<main className="min-h-screen bg-gray-50 p-8 font-sans">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-4xl font-bold text-gray-900 mb-8">Наш каталог</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((product: any) => (
						<div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
							<div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-400">{product.imageUrl ? "Фото товара" : "Нет фото"}</div>

							<div className="p-5">
								<div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">{product.category?.name || "Без категории"}</div>
								<h2 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h2>
								<p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

								<div className="flex items-center justify-between mt-auto">
									<span className="text-2xl font-black text-gray-900">{Number(product.price)} ₽</span>
									<button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">Подробнее</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{products.length === 0 && <div className="text-center text-gray-500 py-12">Товаров пока нет. Добавьте их через Prisma Studio!</div>}
			</div>
		</main>
	);
}
