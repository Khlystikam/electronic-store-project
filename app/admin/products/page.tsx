import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ProductForm } from '@/app/admin/products/addProducts/ProductForm';

// /images/electronics-store

export default async function Products() {
    // Получаем все товары
    const products = await prisma.product.findMany({
        orderBy: { id: 'desc' },
    });

    // Получаем все категории для выпадающего списка в форме
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div className="w-full">
            <h1 className="text-2xl text-white font-bold mb-6">Управление товарами</h1>

            <p className="mb-6">Добавление нового товара</p>
            <div className="mb-10">
                <ProductForm categories={categories} />
            </div>

            <table className="border-collapse border border-gray-200 w-full">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border border-gray-600 p-2 text-left">ID</th>
                        <th className="border border-gray-600 p-2 text-left">Название</th>
                        <th className="border border-gray-600 p-2 text-left">Цена</th>
                        <th className="border border-gray-600 p-2 text-left">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-800 transition-colors">
                            <td className="border border-gray-600 p-2">{product.id}</td>
                            <td className="border border-gray-600 p-2 font-medium">{product.name}</td>
                            <td className="border border-gray-600 p-2">{product.price.toString()} ₽</td>
                            <td className="border border-gray-600 p-2">
                                <div className="flex flex-row gap-4">
                                    {/* Превратили кнопку в ссылку, ведущую на страницу редактирования */}
                                    <Link href={`/admin/products/edit/${product.id}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                                        Редактировать
                                    </Link>

                                    {/* Кнопку удаления пока оставляем визуальной */}
                                    <button className="text-red-400 hover:text-red-300 transition-colors">Удалить</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {products.length === 0 && <p className="text-gray-500 mt-4 text-center">Товаров пока нет.</p>}
        </div>
    );
}
