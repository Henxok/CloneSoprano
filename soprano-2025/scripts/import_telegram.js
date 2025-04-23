const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require("fs");
const input = require("input"); // npm install input

const apiId = 2040;
const apiHash = "b18441a1ff607e10a989891a5462e627";
const session = new StringSession(""); // Пустая, для первого раза

const CHANNEL = "testpubbblication"; // username без @

(async () => {
  const client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Number:"),
    password: async () => await input.text("Password:"),
    phoneCode: async () => await input.text("Code:"),
    onError: (err) => console.log(err),
  });
  console.log("=> Авторизация прошла!");
  const result = [];
  // Получаем все сообщения
  for await (const message of client.iterMessages(CHANNEL, { limit: 0 })) {
    if (message.message) {
      result.push({
        id: message.id,
        date: message.date,
        text: message.message,
        media: !!message.media,
      });
      if (result.length % 50 === 0) console.log(`Загружено ${result.length} сообщений...`);
    }
  }
  fs.writeFileSync(
    "soprano-2025/scripts/vacancies_raw.json",
    JSON.stringify(result, null, 2),
    "utf8"
  );
  console.log(`Готово! Всего сообщений: ${result.length}`);
  await client.disconnect();
})();
