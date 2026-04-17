'use client';
import { useState } from 'react';
import { importFullData } from '../import-actions';

export default function ImportPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                const res = await importFullData(json);
                if (res.success) setMessage('✅ Данные успешно импортированы!');
                else setMessage('❌ Ошибка: ' + res.error);
            } catch (err) {
                setMessage('❌ Ошибка в формате JSON файла');
            }
            setLoading(false);
        };
        reader.readAsText(file);
    };

    return (
        <div className="p-8 bg-slate-900 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-6">Массовый импорт (JSON)</h1>
            <div className="border-2 border-dashed border-slate-700 p-10 text-center rounded-lg">
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    disabled={loading}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
                <p className="mt-4 text-slate-400">{loading ? 'Загрузка в базу данных...' : 'Выберите JSON файл со структурой Категории -> Товары'}</p>
            </div>
            {message && <p className="mt-6 p-4 bg-slate-800 rounded">{message}</p>}
        </div>
    );
}
