import {bot} from '../bot';
import {Context, Markup} from "telegraf";

export const setButtons = async (ctx: Context) => {
    await bot.telegram.setChatMenuButton({
        menuButton: {type: 'commands'}
    });

    await bot.telegram.setMyCommands([
        {command: 'b', description: 'Пропали кнопки'}
    ]);

    await ctx.reply('Кнопки установлены', Markup.keyboard([
            ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
            ['Сегодня', 'Сейчас', 'Завтра']
        ]).resize()
    )
}

bot.command('b', setButtons)

