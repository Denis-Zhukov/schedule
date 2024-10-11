import {bot} from '../bot';
import {Context, Markup} from "telegraf";

export const setButtons = async (ctx: Context) => {
    await bot.telegram.setChatMenuButton({
        menuButton: {type: 'commands'}
    });

    await bot.telegram.setMyCommands([
        {command: 'b', description: 'Пропали кнопки'},
        {command: 'reset', description: 'Сбросить настройки'},
        {command: 'call_schedule', description: 'Расписание звонков'},
    ]);

    await ctx.reply('Кнопки установлены', Markup.keyboard([
            ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
            ['Сегодня', 'Сейчас', 'Завтра']
        ]).resize()
    )
}

bot.command('b', setButtons)

