import { readFile } from 'fs/promises';
import { getDate } from '../utils/date.js';

export const waterController = async (ctx) => {
      const id = ctx.from.id;
      const file = await readFile('data.json', 'utf8');
      const data = JSON.parse(file);

      if (!data[id]) {
            data[id] = {};
      }

      if (!data[id]["water"]) {
            data[id]["water"] = {};
      }

      const res = data[id]["water"][getDate()];
      return res || 0;
};
