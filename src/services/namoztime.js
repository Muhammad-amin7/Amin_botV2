export async function getNamozTime() {
      try {
            const response = await fetch("https://islomapi.uz/api/present/day?region=Toshkent");
            const res = await response.json();

            const data = `*Bomdod*: ${res.times.tong_saharlik}\n*Peshin*: ${res.times.peshin}\n*Asr*: ${res.times.asr}\n*Shom*: ${res.times.shom_iftor}\n*Hufton*: ${res.times.hufton}`;

            return data;
      } catch (error) {
            console.error("Xatolik:", error);
            return "Namoz vaqtlarini olishda xatolik yuz berdi.";
      }
}
