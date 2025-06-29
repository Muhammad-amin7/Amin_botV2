import schedule from "node-schedule";
import fs from "fs";
import { bot } from "../../index.js";
import { getDate } from "../utils/date.js";

schedule.scheduleJob("55 18 * * *", () => {
      const DB = JSON.parse(fs.readFileSync("data.json", "utf8"));
      const users = Object.keys(DB);
      const today = getDate(new Date());

      users.forEach(id => {
            const water = DB[id]["water"]?.[today] || 0;
            bot.telegram.sendMessage(id, `Bugungi umumiy ichilgan suv miqdori: ${water} ml`);
      });
});

schedule.scheduleJob("0 19 * * *", () => {
      const DB = JSON.parse(fs.readFileSync("data.json", "utf8"));
      const users = Object.keys(DB).filter(id => DB[id].namaz_notification);

      const times = getNamozTime();
      users.forEach(id => {
            bot.telegram.sendMessage(id, `🕌 Bugungi namoz vaqtlari:\n\n${times}`);
      });
});

schedule.scheduleJob("10 19 * * *", async () => {
      try {
            const response = await fetch("https://islomapi.uz/api/present/day?region=Toshkent");
            const res = await response.json();

            const times = {
                  Bomdod: res.times.tong_saharlik,
                  Peshin: res.times.peshin,
                  Asr: res.times.asr,
                  Shom: res.times.shom_iftor,
                  Hufton: res.times.hufton
            };

            Object.entries(times).forEach(([nomozNomi, vaqt]) => {
                  const [soat, minut] = vaqt.split(":").map(Number);

                  const date = new Date();
                  date.setHours(soat);
                  date.setMinutes(minut - 20);
                  date.setSeconds(0);
                  date.setMilliseconds(0);

                  if (date < new Date()) return;

                  schedule.scheduleJob(date, () => {
                        const DB = JSON.parse(fs.readFileSync("data.json", "utf8"));
                        const users = Object.keys(DB).filter(id => DB[id].namaz_notification);

                        users.forEach(id => {
                              bot.telegram.sendMessage(id, `⏰ Eslatma: ${nomozNomi.toUpperCase()} namoziga 20 daqiqa qoldi.`);
                        });
                  });
            });
      } catch (error) {
            console.error("Xatolik:", error);
      }
});