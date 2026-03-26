"use client";

import { addProduct } from "@/app/admin/products/addProducts/addProducts";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

// Отдельный компонент кнопки для обработки состояния загрузки
function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button type="submit" disabled={pending} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded disabled:bg-gray-500">
			{pending ? "Сохранение..." : "Сохранить"}
		</button>
	);
}

export function ProductForm({ categories }: { categories: any[] }) {
	// state будет содержать ответ от сервера (ошибку или успех)
	const [state, formAction] = useActionState(addProduct, null);

	return (
		<form action={formAction} className="flex flex-col gap-4 mb-6 bg-gray-800 p-6 rounded-lg">
			<div className="flex gap-4">
				<input type="text" name="name" placeholder="Наименование" required className="w-full bg-gray-900 border border-gray-600 text-white p-2 rounded" />
				<input type="text" name="sku" placeholder="Артикул (SKU)" required className="w-full bg-gray-900 border border-gray-600 text-white p-2 rounded" />
			</div>

			<textarea name="description" placeholder="Описание продукта" className="w-full bg-gray-900 border border-gray-600 text-white p-2 rounded" />

			<div className="flex gap-4">
				<input type="number" step="0.01" name="price" placeholder="Цена" required className="w-1/2 bg-gray-900 border border-gray-600 text-white p-2 rounded" />

				<select name="categoryId" className="w-1/2 bg-gray-900 border border-gray-600 text-white p-2 rounded">
					<option value="">Выберите категорию</option>
					{categories.map((cat) => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
				</select>
			</div>

			{/* Вывод ошибок */}
			{state?.error && <p className="text-red-500">{state.error}</p>}
			{state?.success && <p className="text-green-500">{state.message}</p>}

			<SubmitButton />
		</form>
	);
}
