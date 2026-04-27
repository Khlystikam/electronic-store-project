import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { addCategory } from './addCategories/addCategories';
import DeleteCategoryButton from './DeleteCategoryButton';

export default async function CategoriesList() {
    // 1. Переименовали переменную в categories
    // 2. Поменяли сортировку на id, так как createdAt у Category нет
    const categories = await prisma.category.findMany({
        orderBy: { id: 'desc' },
    });

    return (
        <div className="w-full">
            {/* Исправили заголовок */}
            <h1 className="text-2xl text-white font-bold mb-6">Управление категориями</h1>

            <p className="mb-6">Добавление новой категории</p>
            <form action={addCategory} className="flex gap-4 mb-6">
                <input
                    type="text"
                    name="name"
                    placeholder="Название категории"
                    required
                    className="w-[30%] bg-gray-900 border border-gray-600 text-white p-2 rounded focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition-colors cursor-pointer">
                    Сохранить
                </button>
            </form>

            <table className="w-full border-collapse border border-gray-600 text-slate-200">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border border-gray-600 p-2 text-left w-16">ID</th>
                        <th className="border border-gray-600 p-2 text-left">Название категории</th>
                        <th className="border border-gray-600 p-2 text-center w-48">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Поменяли map, теперь мы итерируемся по categories */}
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td className="border border-gray-600 p-2">{category.id}</td>
                            <td className="border border-gray-600 p-2 font-medium">{category.name}</td>

                            {/* Убрали цену, оставили только кнопки */}
                            <td className="flex flex-row gap-5 border border-gray-600 p-2 text-center">
                                <Link
                                    href={`/admin/categories/edit/${category.id}`}
                                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition-colors cursor-pointer"
                                >
                                    Изменить
                                </Link>

                                {/* Вызываем наш клиентский компонент и передаем ему ID */}
                                <DeleteCategoryButton id={category.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Исправили текст заглушки */}
            {categories.length === 0 && <p className="text-gray-400 mt-6 text-center">Категорий пока нет.</p>}
        </div>
    );
}
