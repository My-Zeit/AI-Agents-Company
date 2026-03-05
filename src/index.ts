import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { orchestrator } from "./orchestrator/orchestrator";

dotenv.config();

const telegramToken = process.env.TELEGRAM_BOT_TOKEN;

if (!telegramToken) {
  throw new Error(
    "Missing TELEGRAM_BOT_TOKEN. Add it to a .env file or set it in your environment.",
  );
}

const bot = new TelegramBot(telegramToken, { polling: true });

console.log("🚀 AI Engineering Team iniciado");
console.log("🤖 Telegram CTO Agent online");

bot.on("message", async (msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text?.trim();

  if (!userMessage) {
    await bot.sendMessage(
      chatId,
      "Envie uma mensagem de texto para falar com o CTO.",
    );
    return;
  }

  try {
    const response = await orchestrator(userMessage);

    await bot.sendMessage(chatId, response ?? "Sem resposta no momento.");
  } catch (error) {
    console.error("Erro ao processar mensagem:", error);
    await bot.sendMessage(
      chatId,
      "Ocorreu um erro ao falar com o CTO. Tente novamente em alguns segundos.",
    );
  }
});

bot.on("polling_error", (error: Error) => {
  console.error("Erro no polling do Telegram:", error.message);
});
