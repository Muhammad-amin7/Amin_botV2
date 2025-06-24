import fs from "fs";
import { getDate } from "../utils/date.js";

export class StaticWater {
      constructor(date, userId) {
            this.date = getDate(date);
            this.UserId = userId;

            const data = fs.readFileSync("data.json", "utf8");
            this.DB = JSON.parse(data); // string => object
      }

      day() {
            const info = this.DB[this.UserId]?.water?.[this.date];
            return info
                  ? `🗓Sana: ${this.date}\n🚰Suv iste'moli: ${info}`
                  : `Ma'lumot topilmadi: ${this.date} kuni uchun`;
      }

      week() {
            const weekData = [];
            const startDate = new Date(this.date);
            startDate.setDate(startDate.getDate() - startDate.getDay());

            for (let i = 0; i < 7; i++) {
                  const currentDate = new Date(startDate);
                  currentDate.setDate(currentDate.getDate() + i);
                  const formattedDate = getDate(currentDate);
                  const info = this.DB[this.UserId]?.water?.[formattedDate] || 0;
                  weekData.push(`🗓Sana: ${formattedDate}  🚰Suv iste'moli: ${info}`);
            }

            return weekData.join("\n");
      }
}
