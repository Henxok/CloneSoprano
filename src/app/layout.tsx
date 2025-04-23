import React from "react";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="bg-zinc-50 min-h-screen font-sans antialiased selection:bg-rose-100">
        <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/70 border-b border-zinc-200 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between py-5 px-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="Soprano" className="h-8 w-auto" />
              <span className="font-bold text-xl tracking-wide text-zinc-800">Soprano</span>
            </Link>
            <nav className="flex gap-6 text-base text-zinc-700 font-medium">
              <Link href="/">Вакансии</Link>
              <Link href="/about">О проекте</Link>
              <Link href="/contacts">Контакты</Link>
            </nav>
            <div className="hidden md:block">
              {/* Переключатель светлой/тёмной темы здесь позже */}
            </div>
          </div>
        </header>
        <main className="pt-24 max-w-6xl mx-auto px-4 min-h-[70vh]">
          {children}
        </main>
        <footer className="mt-10 py-8 bg-white/80 backdrop-blur shadow-inner px-4 border-t border-zinc-200">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4 text-zinc-600 text-sm">
            <div className="flex gap-2 items-center">
              <img src="/logo.svg" alt="Soprano" className="h-6 w-auto" />
              <span>© 2025 Soprano Agency</span>
            </div>
            <div>Работа вакансии для девушек за границей. Автоматический экспорт из Telegram.</div>
            <div>
              <a href="mailto:info@soprano.agency" className="hover:text-rose-500 transition">info@soprano.agency</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
