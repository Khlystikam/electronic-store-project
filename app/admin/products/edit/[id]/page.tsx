import { prisma } from '@/lib/prisma';
import { ProductForm } from '@/app/admin/products/addProducts/ProductForm';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    // В новых версиях Next.js params нужно "дождаться" (await)
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
        return notFound(); // Показываем 404, если ID не число
    }

    // 1. Ищем товар в базе
    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        return notFound(); // Если товара нет в базе
    }

    // 2. Получаем категории для выпадающего списка
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div className="w-full">
            <h1 className="text-2xl text-white font-bold mb-6">Редактирование товара: {product.name}</h1>

            <div className="mb-10">
                {/* Передаем данные товара в форму через пропс initialData */}
                <ProductForm categories={categories} initialData={product} />
            </div>
        </div>
    );
}
