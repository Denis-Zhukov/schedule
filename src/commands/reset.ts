import {bot} from "../bot";
import {Context, Markup} from "telegraf";
import {prisma} from "../db";

export const setFollowTeacher = async (ctx: Context) => {
    const teachers = await prisma.teacher.findMany();

    const buttons = teachers.map(({id, surname, name, patronymic}) => (
        [Markup.button.callback(`${surname} ${name} ${patronymic}`, `teacher ${id}`)]
    ))

    await ctx.reply('Выбери учителя', Markup.inlineKeyboard(buttons))
}

bot.action(/teacher \d+/, async (ctx) => {
    const teacherId = +ctx.match[0].split(' ')[1];

    const userId = ctx.chat?.id;

    if(!userId) return ctx.answerCbQuery();

    await prisma.user.update({
        where: {id: userId},
        data:{teacherId}
    })

    await ctx.answerCbQuery('Установлено');
    await ctx.reply('Установлено');
});

bot.command('reset', setFollowTeacher);
