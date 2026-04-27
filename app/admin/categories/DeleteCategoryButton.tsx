'use client'; // Говорим Next.js, что это клиентский компонент!

import { deleteCategory } from './deleteCategories/actions';

export default function DeleteCategoryButton({ id }: { id: number }) {
    const handleDelete = async () => {
        if (window.confirm('Точно удалить эту категорию?')) {
            await deleteCategory(id);
        }
    };

    return (
        <button onClick={handleDelete} className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition-colors cursor-pointer">
            Удалить
        </button>
    );
}
