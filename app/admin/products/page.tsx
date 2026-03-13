import prisma from '@/lib/prisma'; // ваше подключение

export default async function AdminProductsPage() {
  // Next.js сам сходит в MySQL на сервере, никакого API писать не нужно!
  const products = await prisma.product.findMany();

  return (
    <div>
      <h1>Управление товарами</h1>
      <table>
        {/* Выводим товары... */}
      </table>
    </div>
  );
}