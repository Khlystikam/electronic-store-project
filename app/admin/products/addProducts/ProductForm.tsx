'use client';

import { useState } from 'react';
import { addProduct } from './addProducts'; // В этом файле нужно будет добавить логику update
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Category, Product } from '@prisma/client';

function SubmitButton({ isEdit }: { isEdit: boolean }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-40 h-10 bg-teal-800 hover:bg-teal-900 active:bg-teal-800 text-white px-4 py-2 rounded disabled:bg-gray-500 cursor-pointer"
        >
            {pending ? 'Сохранение...' : isEdit ? 'Обновить' : 'Сохранить'}
        </button>
    );
}

interface ProductFormProps {
    categories: Category[];
    initialData?: Product | null; // Добавляем данные для редактирования
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
    const [state, formAction] = useActionState(addProduct, null);

    // Если есть картинка при редактировании, показываем её название или текст
    const [textButtonSave, setTextButtonSave] = useState<string>(initialData?.imageUrl ? 'Картинка уже есть' : 'Загрузите фото');

    const isEdit = !!initialData; // Флаг: редактируем мы или создаем

    return (
        <form action={formAction} className="flex flex-col gap-4 mb-6 bg-gray-800 p-6 rounded-lg">
            {/* 1. СКРЫТОЕ ПОЛЕ С ID. Очень важно для редактирования! */}
            {isEdit && <input type="hidden" name="id" value={initialData.id} />}

            <div className="flex gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Наименование"
                    defaultValue={initialData?.name} // Используем defaultValue
                    required
                    className="w-full bg-gray-900 border border-gray-600 text-white p-2 rounded"
                />
                <input
                    type="text"
                    name="sku"
                    placeholder="Артикул (SKU)"
                    defaultValue={initialData?.sku}
                    required
                    className="w-full bg-gray-900 border border-gray-600 text-white p-2 rounded"
                />
            </div>

            <textarea
                name="description"
                placeholder="Описание продукта"
                defaultValue={initialData?.description || ''}
                className="w-full h-50 max-h-80 min-h-30 bg-gray-900 border border-gray-600 text-white p-2 rounded"
            />

            <div className="flex gap-4">
                <input
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="Цена"
                    defaultValue={initialData?.price?.toString()} // Decimal нужно в строку
                    required
                    className="w-1/2 bg-gray-900 border border-gray-600 text-white p-2 rounded"
                />
                <select name="categoryId" defaultValue={initialData?.categoryId || ''} className="w-1/2 bg-gray-900 border border-gray-600 text-white p-2 rounded">
                    <option value="">Выберите категорию</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Поле для картинки */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">Путь к картинке (URL)</label>
                    <input
                        type="text"
                        name="manualImageUrl" // Даем уникальное имя, чтобы не путать с файлом
                        placeholder="Например: /images/products/phone.jpg или https://..."
                        defaultValue={initialData?.imageUrl || ''}
                        className="w-full bg-gray-900 border border-gray-600 text-white p-2 rounded"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">Или загрузить новый файл</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            id="image-upload"
                            name="image"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setTextButtonSave(`Выбран: ${file.name}`);
                            }}
                        />
                        <label htmlFor="image-upload" className="text-black text-sm bg-slate-300 hover:bg-slate-200 active:bg-slate-300 cursor-pointer p-2 px-4 rounded font-bold">
                            {textButtonSave}
                        </label>

                        {/* Маленькое превью, если картинка уже есть */}
                        {initialData?.imageUrl && <div className="text-xs text-gray-500">Текущий путь: {initialData.imageUrl}</div>}
                    </div>
                </div>
            </div>

            {state?.error && <p className="text-red-500">{state.error}</p>}
            {state?.success && <p className="text-green-500">{state.message}</p>}

            <div className="flex justify-end w-full">
                <SubmitButton isEdit={isEdit} />
            </div>
        </form>
    );
}
