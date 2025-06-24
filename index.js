import { Markup, Telegraf } from "telegraf";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { waterMiddleware } from "./src/middleware/water.mid.js";
import { waterController } from "./src/controllers/water.cont.js";
import { MenuMarkups } from "./src/markups/index.js";
import { StaticWaterMarkup } from "./src/markups/staticWaterMarkup.js";
import { StaticWater } from "./src/middleware/static_water.mid.js";
import { ExitMainMenu } from "./src/markups/exitMarkup.js";
import { getNamozTime } from "./src/services/namoztime.js";
import { namazNotification } from "./src/middleware/namaz_notification.mid.js";
import { NamazNotifCont } from "./src/controllers/namazNotification.cont.js";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export default Markup;
import dotenv from 'dotenv';
dotenv.config();


const bot = new Telegraf(process.env.TOKEN);

bot.hears("/start", async (ctx) => {
      const wtr = await waterController(ctx)
      const namazNotifications = await NamazNotifCont(ctx.from.id)
      ctx.reply(`Assalomu alaykum!\n\n💧Kunlik ichilgan suv: ${wtr}ml\n⏱️Namoz vaqtini eslatish: ${namazNotifications}`, MenuMarkups());
});

bot.action("/start", async (ctx) => {
      await ctx.answerCbQuery();
      const wtr = await waterController(ctx)
      const namazNotifications = await NamazNotifCont(ctx.from.id)
      ctx.editMessageText(`Assalomu alaykum!\n\n💧Kunlik ichilgan suv: ${wtr}ml\n⏱️Namoz vaqtini eslatish: ${namazNotifications}`, MenuMarkups())
});

bot.action("/water", async (ctx) => {
      await ctx.answerCbQuery();
      await waterMiddleware(ctx);
      const wtr = await waterController(ctx);
      const namazNotifications = await NamazNotifCont(ctx.from.id)
      await ctx.editMessageText(`Assalomu alaykum!\n\n💧Kunlik ichilgan suv: ${wtr}ml\n⏱️Namoz vaqtini eslatish: ${namazNotifications}`, MenuMarkups());
});

bot.action("/static_water", async (ctx) => {
      await ctx.answerCbQuery();
      ctx.editMessageText("Suv istemoli tarixi!\nO'zingizga kerakli ma'lumotni tanlang", StaticWaterMarkup())
})

bot.action("/water_today", async (ctx) => {
      await ctx.answerCbQuery();

      const staticWater = new StaticWater(new Date(), ctx.from.id);
      const data = staticWater.day();

      await ctx.editMessageText(data, ExitMainMenu());
});

bot.action("/water_prev_day", async (ctx) => {
      await ctx.answerCbQuery();
      const date = new Date();
      date.setDate(date.getDate() - 1);
      const staticWater = new StaticWater(date, ctx.from.id);
      const data = staticWater.day();

      await ctx.editMessageText(data, ExitMainMenu());
});

bot.action("/water_week", async (ctx) => {
      await ctx.answerCbQuery();
      const staticWater = new StaticWater(new Date(), ctx.from.id);
      const data = staticWater.week();

      await ctx.editMessageText(data, ExitMainMenu());
});

bot.action("/time_namaz", async (ctx) => {
      await ctx.answerCbQuery();
      const data = await getNamozTime()
      ctx.reply(data, { parse_mode: "Markdown" })
})

bot.action("/namaz_notification", async (ctx) => {
      await ctx.answerCbQuery()
      const data = await namazNotification(ctx.from.id)
      const wtr = await waterController(ctx)
      const namazNotifications = await NamazNotifCont(ctx.from.id)
      ctx.editMessageText(`Assalomu alaykum!\n\n💧Kunlik ichilgan suv: ${wtr}ml\n⏱️Namoz vaqtini eslatish: ${namazNotifications}`, MenuMarkups());
      ctx.reply(data)
})

bot.launch();