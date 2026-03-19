import prisma from "@/lib/prisma";

export default async function AdminProductsPage() {
	const products = await prisma.product.findMany();

	return (
		<div>
			<h1>Управление товарами</h1>
			<table>{/* Выводим товары... */}</table>
		</div>
	);
}
