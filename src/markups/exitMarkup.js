import { Markup } from 'telegraf';
export const ExitMainMenu = () => Markup.inlineKeyboard([
    [Markup.button.callback('🏠Bosh sahifa', '/start')]
]);