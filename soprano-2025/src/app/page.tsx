import React from "react";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-white/70 backdrop-blur shadow-2xl p-10 mt-0 mb-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-rose-500 to-sky-500 text-transparent bg-clip-text">
            Вакансии для девушек за границей
          </h1>
          <p className="text-xl text-zinc-800/80 mb-6">Экспорт объявлений из Telegram · AI-сортировка по странам и категориям · Безопасно, удобно и анонимно</p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button className="">Европа</button>
            <button>Азия</button>
            <button>Америка</button>
            <button>Россия</button>
            <button>ОАЭ</button>
            <button>Все регионы</button>
          </div>
          <div className="opacity-80 text-sm">Встроен AI для автоматической публикации и модерации объявлений</div>
        </div>
      </section>

      {/* Лучшие вакансии */}
      <section className="mb-14">
        <div className="mb-7 text-2xl font-bold text-zinc-800">Лучшие предложения недели</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 hover:shadow-2xl transition border-t-4 border-gradient-to-r from-rose-400 to-sky-400">
              <div className="aspect-[4/3] w-full bg-gradient-to-r from-zinc-200 to-zinc-50 rounded-xl mb-4 animate-pulse" />
              <div className="font-semibold text-lg mb-1">Вакансия {i}: Сити / Страна</div>
              <div className="text-zinc-600 text-sm mb-2">Описание вакансии... Здесь AI будет извлекать и подставлять содержание объявления.</div>
              <div className="flex gap-2 items-center">
                <span className="inline-flex items-center text-rose-600 font-semibold">Telegram</span>
                <span className="inline-flex items-center text-emerald-600 font-semibold">WhatsApp</span>
                <span className="inline-flex items-center text-sky-600 font-semibold">E-mail</span>
              </div>
              <button className="w-full mt-1">Подробнее</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
