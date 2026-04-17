'use client';

import Link from 'next/link';
import { useState } from 'react';

const leftbarItems = [
    { id: 1, name: 'Дашборд', link: '/admin' },
    { id: 2, name: 'Категории товаров', link: '/admin/categories' },
    { id: 3, name: 'Товары', link: '/admin/products' },
    { id: 4, name: 'Загрузить json', link: '/admin/categories/import' },
];

export default function Leftbar() {
    const [activeMenu, setActiveMenu] = useState<number>(1);

    return (
        <div className="Leftbar flex flex-col justify-start gap-5 w-[15%] min-w-50 h-full bg-slate-900/50 rounded-2xl p-5 overflow-x-auto">
            {leftbarItems.map((item) => (
                <Link
                    key={item.id}
                    href={item.link}
                    className={(activeMenu === item.id ? 'admin-button-active ' : '') + 'flex items-center w-full h-10 admin-button rounded-lg box-shadow-button p-3'}
                    onClick={() => setActiveMenu(item.id)}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
}
