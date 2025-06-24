import { readFile, writeFile } from 'fs/promises';
import { getDate } from '../utils/date.js'; // YYYY-MM-DD formatda qaytaradi deb faraz qilamiz

export const waterMiddleware = async (ctx) => {
      const userId = ctx.from?.id;
      const date = getDate(); // Masalan: '2025-06-22'

      let data = {};

      try {
            const file = await readFile('data.json', 'utf8');
            data = JSON.parse(file);
      } catch (err) {
            console.log("Yangi fayl yoki bo'sh fayldan boshlanmoqda.");
      }


      if (!data[userId]) {
            data[userId] = {}
      }

      if (!data[userId].water) {
            data[userId].water = {};
      }

      if (!data[userId].water[date]) {
            data[userId].water[date] = 0;
      }

      // 250 ml qo‘shamiz
      data[userId].water[date] += 250;

      await writeFile('data.json', JSON.stringify(data, null, 2));
};
