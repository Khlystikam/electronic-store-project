// страница каталога
import ProductList from "@/app/(public)/catalog/page";

export default function HomePageCatalog() {
	return (
		<div className="list-catalog">
			<ProductList
				title="Новинки"
				queryOptions={{
					take: 6,
					orderBy: { createdAt: "desc" },
					include: { category: true },
				}}
			/>

			<ProductList
				title="Мониторы"
				queryOptions={{
					take: 6,
					where: { categoryId: 3 },
					orderBy: { name: "asc" },
				}}
			/>
		</div>
	);
}
