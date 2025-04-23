import React from "react";
import Link from "next/link";

export default function CountryPage({ params }: { params: { slug: string } }) {
  // Демо-данные
  const seoText =
    "Сравните вакансии и лучшие предложения по работе для девушек в регионе — " +
    params.slug.charAt(0).toUpperCase() + params.slug.slice(1) +
    ". Все вакансии публикуются автоматически из Telegram, контакты проверены, безопасно и анонимно. Поиск работы упрощён, возможен фильтр по городам и типу деятельности.";

  return (
    <section className="my-12">
      <div className="mb-7">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-zinc-800">
          Вакансии для девушек — {params.slug.charAt(0).toUpperCase() + params.slug.slice(1)}
        </h1>
        <div className="text-zinc-500 text-base mb-5">
          {seoText}
        </div>
        <div className="flex flex-wrap gap-3 mb-8">
          <button>Все</button>
          <button>Эскорт</button>
          <button>Массаж</button>
          <button>Модель</button>
          <button>Арт-фото</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1,2,3,4].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-xl p-5 flex flex-col gap-3 hover:shadow-2xl transition border-l-4 border-rose-300/60 relative">
            <div className="absolute right-4 top-2 text-xs bg-sky-100 px-2 py-0.5 rounded-full text-sky-700">Город</div>
            <div className="font-semibold text-lg mb-1">Вакансия {i}: Описание</div>
            <div className="flex gap-2 mb-2"><span className="text-rose-600">Telegram</span> <span className="text-emerald-600">WhatsApp</span></div>
            <Link href={`/vacancy/${i}`} className="text-sky-600 hover:underline mt-1">Подробнее</Link>
          </div>
        ))}
      </div>
    </section>
  );
}
