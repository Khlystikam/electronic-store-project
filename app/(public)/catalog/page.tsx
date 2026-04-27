// страница каталога
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface ProductListProps {
    queryOptions: Prisma.ProductFindManyArgs;
    title: string;
}

export default async function ProductList({ queryOptions, title }: ProductListProps) {
    // Забираем товары из MySQL
    const products = await prisma.product.findMany(queryOptions);

    return (
        <main className="min-h-screen bg-white p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product: any) => (
                        <div
                            key={product.id}
                            className="h-115 bg-white rounded-xl shadow-lg border border-gray-100 cursor-pointer overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            <div className="img-wrapper flex justify-center w-full h-50">
                                <img src={product.imageUrl} alt={product.name} className="w-auto h-auto p-5" />
                            </div>

                            <div className="relative h-55 p-5">
                                <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">{product.category?.name || 'Без категории'}</div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description || 'Описание отсутствует'}</p>

                                <div className="absolute bottom-0 flex flex-row items-center justify-between w-[90%] mt-auto">
                                    <span className="text-2xl font-black text-gray-900">{Number(product.price)} ₽</span>
                                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-blue-800 transition-colors">
                                        Подробнее
                                    </button>
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
