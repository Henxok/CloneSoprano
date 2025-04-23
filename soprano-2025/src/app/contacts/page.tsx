import React from "react";

export default function ContactsPage() {
  return (
    <section className="max-w-2xl mx-auto my-14 p-6 rounded-3xl shadow bg-white/90">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-rose-500 to-sky-500 text-transparent bg-clip-text">
        Контакты Candy Tours Agency
      </h1>
      <div className="space-y-6 text-zinc-800">
        <div className="flex items-center gap-4">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#d32423" d="M16.5,3.5h-9A3,3,0,0,0,4.5,6.5v11a3,3,0,0,0,3,3h9a3,3,0,0,0,3-3v-11A3,3,0,0,0,16.5,3.5Zm-9,1.5h9a1.5,1.5,0,0,1,1.5,1.5v.15l-6,3.74-6-3.74V6.5A1.5,1.5,0,0,1,7.5,5ZM18,18.5h-9a1.5,1.5,0,0,1-1.5-1.5V8.14l5.19,3.24a1,1,0,0,0,1.05,0L18,8.14V17A1.5,1.5,0,0,1,18,18.5Z"/></svg>
          <div>
            <div className="font-bold">E-mail</div>
            <a href="mailto:info@candytours.agency" className="text-sky-700 underline">info@candytours.agency</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <svg width="28" height="28" viewBox="0 0 2400 2400"><g><circle fill="#37aee2" cx="1200" cy="1200" r="1200"/><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="1200" y1="2200" x2="1200" y2="639.5"><stop offset="0" stopColor="#1d93d2"/><stop offset="1" stopColor="#38b0e3"/></linearGradient><path fill="url(#a)" d="M1200 2200c552 0 1000-448 1000-1000S1752 200 1200 200 200 648 200 1200s448 1000 1000 1000z"/><g><path fill="#fff" d="M1910 685c-33-34-78-45-122-30-405 144-1237 445-1304 468a94 94 0 0 0-23 171l269 159c35 21 78 24 115 8l753-332-569 382c-55 37-48 119 12 146l219 98c63 28 140-6 154-74l227-1060c12-55-4-112-47-144Z"/></g></g></svg>
          <div>
            <div className="font-bold">Telegram</div>
            <a href="https://t.me/candytours_support" target="_blank" className="text-rose-700 underline" rel="noreferrer">@candytours_support</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <svg width="28" height="28" viewBox="0 0 24 24"><rect width="24" height="24" fill="#25D366" rx="5"/><path fill="#fff" d="M19.05,4.95A8,8,0,0,0,4.93,19.07l-.6,2.19a1,1,0,0,0,1.22,1.22l2.19-.6A8,8,0,1,0,19.05,4.95ZM12,21a6.95,6.95,0,0,1-3.58-1L8,20l-2.13.59L6,18.83a7,7,0,1,1,6-12.66A7,7,0,0,1,12,21ZM12,7a1,1,0,0,1,1,1H13a1,1,0,0,0-2,0v1a1,1,0,0,1,2,0,2,2,0,0,1-4,0H9a3,3,0,0,0,6,0A3,3,0,0,0,12,7Zm0,8a1,1,0,0,1-1-1H11a1,1,0,0,0,2,0v-1A1,1,0,0,1,12,15Z"/></svg>
          <div>
            <div className="font-bold">WhatsApp</div>
            <a href="https://wa.me/79998887766" target="_blank" className="text-emerald-700 underline" rel="noreferrer">+7 999 888-77-66</a>
          </div>
        </div>
        <div className="mt-8 text-zinc-700 text-sm bg-zinc-50 p-3 rounded">Ваша личность не отображается на сайте. Для оперативной связи или анонимного вопроса используйте любые указанные каналы. Мы отвечаем и в выходные!</div>
      </div>
    </section>
  );
}
