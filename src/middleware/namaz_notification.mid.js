import fs from 'fs';

export const namazNotification = async (id) => {
      const DB = JSON.parse(fs.readFileSync("data.json", "utf8"));

      if (!DB[id]) {
            DB[id] = { namaz_notification: false }
      }

      const isOn = DB[id].namaz_notification;

      DB[id].namaz_notification = !isOn;

      fs.writeFileSync("data.json", JSON.stringify(DB, null, 2));

      return isOn
            ? "🔕 Namoz vaqtini eslatish o‘chirildi"
            : "🔔 Namoz vaqtini eslatish yoqildi";
};
