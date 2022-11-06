import { Bot } from "grammy";
import * as dotenv from "dotenv";
import fs from "node:fs/promises"
import { resize_dick, is_resize_time, set_name, auto_register } from "./actions.js"

dotenv.config();

export const locale = JSON.parse(await fs.readFile("./src/locales/ru.json"));
const bot = new Bot(process.env.token);

bot.on("message::bot_command", auto_register);
bot.on("message::bot_command", set_name);

bot.command("dick", is_resize_time);
bot.command("dick", resize_dick);

bot.command("ping", (ctx) => {
    ctx.reply(`PONG`);
})

bot.start();
