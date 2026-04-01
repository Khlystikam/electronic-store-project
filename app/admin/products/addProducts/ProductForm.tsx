"use client";

import { useState } from "react";
import { addProduct } from "./addProducts";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="w-40 h-10 bg-teal-800 hover:bg-teal-900 active:bg-teal-800 text-white px-4 py-2 rounded disabled:bg-gray-500 cursor-pointer"
		>
			{pending ? "Сохранение..." : "Сохранить"}
		</button>
	);
}

export function ProductForm({ categories }: { categories: any[] }) {
	const [state, formAction] = useActionState(addProduct, null);
	const [textButtonSave, setTextButtonSave] = useState<string>("Загрузите фото");

	return (
		<form action={formAction} className="flex flex-col gap-4 mb-6 bg-gray-800 p-6 rounded-lg">
			<div className="flex gap-4">
				<input type="text" name="name" placeholder="Наименование" required className="w-full bg-gray-900 border border-gray-600 text-white p-2 rounded" />
				<input type="text" name="sku" placeholder="Артикул (SKU)" required className="w-full bg-gray-900 border border-gray-600 text-white p-2 rounded" />
			</div>

			<textarea name="description" placeholder="Описание продукта" className="w-full h-50 max-h-80 min-h-30 bg-gray-900 border border-gray-600 text-white p-2 rounded" />

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

			{/* Поле для картинки */}
			<div className="flex flex-col gap-2">
				<label className="text-sm text-gray-400">Фото товара</label>
				<div className="mt-6">
					<input
						type="file"
						id="image-upload"
						name="image"
						accept="image/*"
						className="hidden"
						onChange={(e) => {
							const file = e.target.files?.[0];

							if (file) {
								setTextButtonSave(`Выбран: ${file.name}`);
							} else {
								setTextButtonSave("Загрузите фото");
							}
						}}
					/>
					<label htmlFor="image-upload" className="text-black text-sm bg-slate-300 hover:bg-slate-200 active:bg-slate-300 cursor-pointer p-4 rounded font-bold">
						{textButtonSave}
					</label>
				</div>
			</div>

			{state?.error && <p className="text-red-500">{state.error}</p>}
			{state?.success && <p className="text-green-500">{state.message}</p>}

			<div className="flex justify-end w-full">
				<SubmitButton />
			</div>
		</form>
	);
}
