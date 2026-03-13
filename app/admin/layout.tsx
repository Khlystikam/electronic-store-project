export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '250px', background: '#f4f4f5', padding: '20px' }}>
        <h2>Меню админки</h2>
        {/* Позже добавим сюда ссылки */}
      </aside>
      <main style={{ padding: '20px', width: '100%' }}>
        {children}
      </main>
    </div>
  );
}