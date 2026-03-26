import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/app/admin/products/addProducts/ProductForm";

export default async function Products() {
	// Теперь await разрешен
	const products = await prisma.product.findMany({
		orderBy: { createdAt: "desc" },
	});

	// 2. Получаем все категории для выпадающего списка в форме
	const categories = await prisma.category.findMany({
		orderBy: { name: "asc" },
	});

	return (
		<div className="w-full">
			<h1 className="text-2xl text-white font-bold mb-6">Управление товарами</h1>

			<p className="mb-6">Добавление новой категории</p>
			<div className="mb-10">
				<ProductForm categories={categories} />
			</div>

			<table className="border-collapse border border-gray-200">
				<thead>
					<tr className="bg-gray-800">
						<th className="border p-2 text-left">ID</th>
						<th className="border p-2 text-left">Название</th>
						<th className="border p-2 text-left">Цена</th>
						<th className="border p-2 text-left">Действия</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id} className="hover:bg-gray-800">
							<td className="border p-2">{product.id}</td>
							<td className="border p-2 font-medium">{product.name}</td>
							<td className="border p-2">{product.price.toString()} ₽</td>
							<td className="flex flex-row justify-between border p-2">
								<button className="text-blue-600 mr-2 cursor-pointer">Редактировать</button>
								<button className="text-red-600 cursor-pointer">Удалить</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{products.length === 0 && <p className="text-gray-500 mt-4 text-center">Товаров пока нет.</p>}
		</div>
	);
}
