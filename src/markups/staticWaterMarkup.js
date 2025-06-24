import { Markup } from 'telegraf';
export const StaticWaterMarkup = () => Markup.inlineKeyboard([
      [
            Markup.button.callback("Oldingi kun", "/water_prev_day"),
            Markup.button.callback("Bugungi", "/water_today")
      ],
      [
            Markup.button.callback("Xaftalik", "/water_week")
      ],
      [
            Markup.button.callback("🏠Bosh sahifa", "/start")
      ]
])