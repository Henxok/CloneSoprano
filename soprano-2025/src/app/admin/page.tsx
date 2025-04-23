import type React from "react";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import demoVacancies from "@/data/vacancies.json";

function aiExtractFields(rawText: string) {
  // TODO: заменить на fetch к реальному backend/AI API
  const countryDetect = /берлин|germany|германия|berlin/i.test(rawText)
    ? "Германия"
    : /дубай|оае|uae|dubai/i.test(rawText)
    ? "ОАЭ"
    : /лондон|великобритания|london|uk|англия/i.test(rawText)
    ? "Великобритания"
    : "Другая страна";
  const telegram = rawText.match(/@([\w_]{4,})/i)?.[0] || '';
  const whatsapp = rawText.match(/\+\d{10,}/)?.[0] || '';
  const email = rawText.match(/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/)?.[0] || '';
  return {
    country: countryDetect,
    city: '',
    contacts: { telegram, whatsapp, email, phone: whatsapp },
    description: rawText.slice(0, 120),
    region: '',
  };
}

export default function AdminPanel() {
  // Анти-hydration-mismatch данная структура:
  const [hydrated, setHydrated] = useState(false);
  const [vacancies, setVacancies] = useState<any[]>([]); // всегда [] на SSR — никаких демо и расчётов тут
  useEffect(() => {
    // всю демо-инициализацию — ТОЛЬКО в useEffect!
    setHydrated(true);
    setVacancies(
      Array.isArray(demoVacancies) ? demoVacancies.map((v) => ({
        ...v,
        id: v.id || uuidv4(),
        visible: v.visible !== undefined ? v.visible : true,
        media: v.media || [],
      })) : []
    );
  }, []);

  const [formOpen, setFormOpen] = useState(false);
  const [rawText, setRawText] = useState("");
  const [files, setFiles] = useState<any[]>([]);
  const [preview, setPreview] = useState(false);
  const inputFileRef = useRef<HTMLInputElement|null>(null);

  const handleFiles = (newFiles: FileList) => {
    const arr = Array.from(newFiles).map((file) => {
      const src = typeof window !== 'undefined' ? URL.createObjectURL(file) : "";
      return { src, type: file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "file", name: file.name, file, id: uuidv4() };
    });
    setFiles(prev => [...prev, ...arr]);
  };

  // Эмулируем дату создания только на клиенте после гидрации — иначе mismatch!
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;
    const aiResult = aiExtractFields(rawText);
    setVacancies(prev => [
      {
        id: uuidv4(),
        rawText,
        country: aiResult.country,
        city: aiResult.city,
        region: aiResult.region,
        description: aiResult.description,
        contacts: aiResult.contacts,
        media: files.map(f => ({...f})),
        date: new Date().toISOString().split('T')[0],
        visible: true,
      },
      ...prev
    ]);
    setFiles([]); setRawText(""); setFormOpen(false); setPreview(false);
  };
  const deleteFile = (idx: number) => setFiles(prev => prev.filter((_,i) => i!==idx));
  const handleDeleteVacancy = (id: string) => setVacancies(prev => prev.filter(v => v.id !== id));
  const handleToggleVisible = (id: string) => setVacancies(prev => prev.map(v => v.id===id ? {...v, visible: !v.visible} : v));

  // До гидратации ничего не рендерим, кроме базовой оболочки
  if(!hydrated) return <section style={{minHeight:120}}>Загрузка…</section>;

  return (
    <section className="my-14 max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-zinc-800">Админ-панель: публикации Candy Tours Agency</h1>
      <div className="mb-5 flex justify-end">
        <button
          type="button"
          className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors"
          onClick={()=>{setFormOpen(true);setRawText("");setFiles([]);setPreview(false);}}
        >
          + Добавить вакансию вручную
        </button>
      </div>
      {formOpen && (
        <div className="fixed inset-0 bg-black/20 z-50 flex justify-center items-start py-20 overflow-y-auto">
          <form className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-8 flex flex-col gap-6 relative" onSubmit={handleFormSubmit} autoComplete="off">
            <button type="button" className="absolute top-3 right-4 text-zinc-400 hover:text-rose-500 text-xl" onClick={()=>setFormOpen(false)}>&#10006;</button>
            <h2 className="text-xl font-bold mb-2">Новое объявление</h2>
            <textarea
              className="border border-zinc-200 shadow rounded-xl p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="Вставьте сюда текст объявления целиком (с контактами, ссылками и подробностями)"
              value={rawText}
              onChange={e=>setRawText(e.target.value)}
              required
            />
            <div
              className="border-2 border-dashed border-zinc-300 rounded-lg min-h-[80px] p-4 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition cursor-pointer"
              onClick={()=>inputFileRef.current?.click()}
              onDrop={e=>{e.preventDefault();handleFiles(e.dataTransfer.files);}}
              onDragOver={e=>e.preventDefault()}
            >
              <div className="text-zinc-400 mb-1">Перетащите или выберите фото/видео</div>
              <button type="button" className="text-sky-600 underline text-sm" onClick={e=>{e.stopPropagation();inputFileRef.current?.click();}}>
                Загрузить файлы
              </button>
              <input ref={inputFileRef} multiple hidden type="file" accept="image/*,video/*" onChange={e=>handleFiles(e.target.files as FileList)} />
              <div className="flex flex-wrap gap-3 mt-2">
                {files.map((f, i) =>
                  <div key={f.id} className="relative">
                    {f.type === "image" ? <img src={f.src} alt="img" className="w-20 h-20 object-cover rounded-lg border" />
                      : f.type === "video" ? <video src={f.src} className="w-20 h-20 rounded-lg border object-cover" controls />
                        : <div className='w-20 h-20 rounded-lg border bg-zinc-200 flex items-center justify-center'>{f.name}</div>}
                    <button type="button" onClick={e=>{e.stopPropagation();deleteFile(i);}} className="absolute -top-2 -right-2 bg-white border rounded-full px-1 text-base text-zinc-600 shadow hover:bg-rose-500 hover:text-white">×</button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 justify-between">
              <button type="button" className="bg-zinc-100 border px-4 py-2 rounded hover:bg-zinc-200 text-zinc-700" onClick={()=>setPreview(true)}>Предпросмотр</button>
              <button type="submit" className="bg-rose-600 text-white py-2 font-bold rounded-lg hover:bg-rose-700">Опубликовать</button>
            </div>
            {preview && (
              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Предпросмотр:</h3>
                <div className="bg-zinc-50 rounded-lg p-3 mb-2 text-zinc-900 whitespace-pre-line">{rawText}</div>
                <div className="flex gap-2 flex-wrap mb-2">
                  {files.map((f, i) => f.type === "image"
                    ? <img key={f.id} src={f.src} className="w-12 h-12 object-cover rounded border" />
                    : f.type === "video" ? <video key={f.id} src={f.src} className="w-12 h-12 rounded border object-cover" controls />
                    : null)}
                </div>
                {/* Виртуально показать контакты AI */}
                <div className="text-xs mt-2 text-zinc-700">Контакты: Телеграм, WhatsApp, email извлекаются автоматически</div>
              </div>
            )}
          </form>
        </div>
      )}
      {/* Таблица объявлений */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-zinc-200 mt-8">
        <table className="min-w-full bg-white/90 rounded-xl">
          <thead className="bg-zinc-100 text-zinc-600 uppercase text-sm tracking-wide select-none">
            <tr>
              <th className="py-3 px-4 font-semibold text-left">Страна</th>
              <th className="py-3 px-4 font-semibold text-left">Описание</th>
              <th className="py-3 px-4 font-semibold text-left">Контакты</th>
              <th className="py-3 px-4 font-semibold text-left">Медиа</th>
              <th className="py-3 px-4 font-semibold text-left">Дата</th>
              <th className="py-3 px-4 font-semibold text-center">Видимость</th>
              <th className="py-3 px-4 font-semibold text-center">Действия</th>
            </tr>
          </thead>
          <tbody>
            {vacancies.map((v) => (
              <tr key={v.id} className="border-b bg-white hover:bg-zinc-50 transition-colors opacity-100">
                <td className="py-3 px-4 whitespace-nowrap font-medium text-zinc-900">{v.country}</td>
                <td className="py-3 px-4 text-zinc-700" title={v.description}>{v.description}</td>
                <td className="py-3 px-4 text-xs">
                  <div>Telegram: <span className="text-rose-600">{v.contacts?.telegram}</span></div>
                  <div>WhatsApp: <span className="text-emerald-600">{v.contacts?.whatsapp}</span></div>
                  <div>Email: <span className="text-sky-600">{v.contacts?.email}</span></div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 flex-wrap">
                    {v.media?.map((f:any)=>(
                      f.type==="image" ? <img key={f.id} src={f.src} className="w-10 h-10 object-cover rounded border"/>
                      : f.type==="video" ? <video key={f.id} src={f.src} className="w-10 h-10 rounded border object-cover"/>
                      : null
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">{v.date}</td>
                <td className="py-3 px-4 text-center">
                  <button onClick={()=>handleToggleVisible(v.id)} className={`px-3 py-1 rounded-full text-xs font-bold ${v.visible?"bg-emerald-100 text-emerald-700":"bg-zinc-200 text-zinc-500"}`}>{v.visible ? "Видимо" : "Скрыто"}</button>
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="px-3 py-1 bg-rose-100 rounded-lg text-rose-700 hover:bg-rose-200 text-xs font-semibold" onClick={()=>handleDeleteVacancy(v.id)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
