import fs from "fs"

export const NamazNotifCont = async (id) => {
      const DB = JSON.parse(fs.readFileSync("data.json", "utf8"))

      if (!DB[id]) {
            DB[id] = {}
      }

      if (!DB[id].namaz_notification) {
            DB[id] = { namaz_notification: false }
      }
      return DB[id].namaz_notification ? "yoqilgan" : "o'chirilgan"
}