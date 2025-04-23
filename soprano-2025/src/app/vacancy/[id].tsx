import React from 'react';
import Link from 'next/link';

export default function VacancyPage({ params }: { params: { id: string } }) {
  // Для примера — тестовые данные, потом заменим на реальные
  const vacancy = {
    title: 'VIP Escort Paris',
    description: 'Срочно требуется VIP-сопровождение в Париже. Работа легальная, высокая оплата, проживание обеспечивается. Необходимы базовые знания английского. Telegram и WhatsApp для связи — контакты ниже.',
    country: 'Франция',
    city: 'Париж',
    date: '2025-04-22',
    contacts: {
      telegram: '@vipagencyfr',
      whatsapp: '+33612345678',
      email: 'hr@vipagency.fr',
      phone: '+33 6 12 34 56 78'
    }
  };
  return (
    <section className="max-w-2xl mx-auto bg-white/80 rounded-3xl shadow-2xl p-8 my-10">
      <div className="mb-6">
        <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-rose-50 to-sky-50 text-sm font-medium text-zinc-600 mb-3 shadow-sm">
          {vacancy.country} · {vacancy.city}
        </div>
        <h1 className="text-3xl font-extrabold mb-2 text-zinc-800">{vacancy.title}</h1>
        <div className="text-zinc-500 text-sm mb-4">Опубликовано: {new Date(vacancy.date).toLocaleDateString("ru-RU")}</div>
        <p className="text-md md:text-lg text-zinc-800 mb-4">{vacancy.description}</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow flex flex-col gap-4">
        <div className="font-semibold text-zinc-700 mb-1">Контакты для связи</div>
        <div className="flex flex-wrap gap-4 items-center">
          <span className="inline-flex gap-2 items-center text-rose-700 font-medium">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#d32423" d="M12 2C6.48 2 2 6.42 2 11.92c0 2.99 1.64 5.8 4.44 7.81l-.54 2.63c-.13.65.54 1.18 1.09.84l3.16-2.01a11.6 11.6 0 002.85.36c5.52 0 10-4.42 10-9.93C22 6.42 17.52 2 12 2z"/></svg>
            Telegram: <a href={`https://t.me/${vacancy.contacts.telegram.replace('@','')}`} className="hover:underline">{vacancy.contacts.telegram}</a>
          </span>
          <span className="inline-flex gap-2 items-center text-emerald-700 font-medium">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#25D366"/><path d="M19 7.7a7.29 7.29 0 00-12.37-1.6A7.26 7.26 0 005 12.49c0 1.25.32 2.47.93 3.54l-1 3.48 3.58-.94A7.25 7.25 0 0012.5 19 7.29 7.29 0 0019 7.7z" fill="#fff"/></svg>
            WhatsApp: <a href={`https://wa.me/${vacancy.contacts.whatsapp.replace(/[^\d]/g, '')}`} className="hover:underline">{vacancy.contacts.whatsapp}</a>
          </span>
          <span className="inline-flex gap-2 items-center text-sky-700 font-medium">
            <svg width="20" height="20" fill="#31a0c7" viewBox="0 0 24 24"><path d="M12 13.5L2 6V4l10 7 10-7v2l-10 7.5z"/><path d="M2 8.5V20h20V8.5L12 16.5 2 8.5z"/></svg>
            Email: <a href={`mailto:${vacancy.contacts.email}`} className="hover:underline">{vacancy.contacts.email}</a>
          </span>
          <span className="inline-flex gap-2 items-center text-zinc-700 font-medium">
            <svg width="20" height="20" fill="#18181b" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.55.57 1 1 0 011 1v3.34a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.33a1 1 0 011 1c0 1.21.18 2.39.57 3.56a1 1 0 01-.22 1.09l-2.06 2.14z"/></svg>
            Телефон: <a href={`tel:${vacancy.contacts.phone.replace(/\s/g, '')}`} className="hover:underline">{vacancy.contacts.phone}</a>
          </span>
        </div>
      </div>
      <div className="mt-8">
        <Link href="/" className="text-sky-600 hover:underline">← Вернуться к списку вакансий</Link>
      </div>
    </section>
  );
}
