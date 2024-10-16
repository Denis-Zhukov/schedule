import {bot} from "@/bot";
import {Markup} from "telegraf";
import {callSchedule} from "./call-schedule";
import {setFollowTeacher} from "./set-follow-teacher";
import {prisma} from "@/db";
import {contacts} from "./contacts";
import {adminSchedule} from "@/commands/admin-schedule";

bot.hears('Ещё', async (ctx) => {
    const id = ctx.chat.id;

    const user = await prisma.user.findFirst({
        where: {id},
        include: {followTeacher: true}
    });

    let text = 'Настройки не установлены';
    if (user?.followTeacher) {
        const {surname, name, patronymic} = user.followTeacher;
        text = `Учитель: \`${surname} ${name} ${patronymic}\``;
    }

    await ctx.replyWithMarkdownV2(text, Markup.inlineKeyboard([
        [Markup.button.callback('Дежурный администратор', 'admin-schedule')],
        [Markup.button.callback('Расписание звонков', 'call-schedule')],
        [Markup.button.callback('Сбросить настройки', 'reset')],
        [Markup.button.callback('Контакты', 'contacts')]
    ]));

});

bot.action('admin-schedule', async (ctx) => {
    await adminSchedule(ctx);
    await ctx.answerCbQuery();
})
bot.action('call-schedule', async (ctx) => {
    await callSchedule(ctx);
    await ctx.answerCbQuery();
})
bot.action('reset', async (ctx) => {
    await setFollowTeacher(ctx);
    await ctx.answerCbQuery();
})
bot.action('contacts', async (ctx) => {
    await contacts(ctx);
    await ctx.answerCbQuery();
})

