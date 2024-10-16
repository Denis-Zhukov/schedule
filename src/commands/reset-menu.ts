import {bot} from '@/bot';
import {Context, Markup} from "telegraf";

export const resetMenu = async (ctx: Context) => {
    await bot.telegram.setChatMenuButton({
        menuButton: {type: 'commands'}
    });

    await bot.telegram.setMyCommands([
        {command: 'b', description: 'Пропали кнопки'},
        {command: 'reset', description: 'Сбросить настройки'},
        {command: 'admin_schedule', description: 'Дежурный администратор'},
        {command: 'call_schedule', description: 'Расписание звонков'},
        {command: 'contacts', description: 'Контакты'},
    ]);

    await ctx.reply('Кнопки установлены', Markup.keyboard([
            ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
            ['Сегодня', 'Сейчас', 'Завтра', 'Ещё']
        ]).resize()
    )
}

bot.command('b', resetMenu)

