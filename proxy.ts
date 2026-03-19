import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Меняем название функции с middleware на proxy
export function proxy(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return new NextResponse('Требуется авторизация', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Panel"' },
    });
  }

  const auth = atob(authHeader.split(' ')[1]).split(':');
  const user = auth[0];
  const pwd = auth[1];

  if (user === 'admin' && pwd === 'supersecret123') {
    return NextResponse.next();
  }

  return new NextResponse('Неверный логин или пароль', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin Panel"' },
  });
}

// 2. Конфиг оставляем без изменений
export const config = {
  matcher: ['/admin/:path*'],
};