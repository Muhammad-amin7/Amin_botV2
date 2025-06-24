import { Markup } from 'telegraf';
export const MenuMarkups = () => Markup.inlineKeyboard([
      [
            Markup.button.callback("💧Suv qoshish", "/water"),
            Markup.button.callback("📊Statistika", "/static_water")
      ],
      [
            Markup.button.callback("🕌Namoz vaqti", "/time_namaz")
      ],
      [
            Markup.button.callback("🔔Namoz vaqtlarini eslatish", "/namaz_notification")
      ],


])