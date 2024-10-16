import {bot} from "@/bot";
import {Context} from "telegraf";
import {prisma} from "@/db";
import {DayOfWeek} from "@prisma/client";
import {gap, weekend, lesson} from "@/constants/text";
import {createDate, differenceInMinutes} from '@/utils/time';
import {daysOfWeek, rusDayOfWeek} from "@/constants/daysOfWeek";
import {addDays} from "date-fns";
import {setFollowTeacher} from "./set-follow-teacher";

const findSchedule = async (ctx: Context, dayOfWeek: DayOfWeek) => {
    const user = await prisma.user.findFirst({where: {id: ctx.chat?.id ?? 0}});

    if (!user) return;
    if (!user.teacherId) return setFollowTeacher(ctx);

    const schedule = await prisma.schedule.findMany({
        where: {
            teacherId: user.teacherId,
            dayOfWeek: dayOfWeek,
        },
        select: {
            dayOfWeek: true,
            class: {select: {name: true}},
            subclass: {select: {name: true}},
            timeStart: true,
            timeEnd: true,
            classroom: {select: {name: true}},
            teacher: true,
            canteenSchedule: true,
            leaveSchedule: true
        },
        orderBy: {timeStart: 'asc'}
    });

    if (schedule.length === 0) {
        return await ctx.replyWithMarkdownV2(weekend);
    }

    const {name, surname, patronymic} = (await prisma.teacher.findFirst({where: {id: 1}}))!

    let prevLessonEndTime = null;
    let currentLessonStart = null;

    let response = `*${surname} ${name} ${patronymic}*\n\n`;
    for (const {
        class: {name: className},
        subclass,
        classroom,
        timeStart,
        timeEnd,
        teacher,
        canteenSchedule,
        leaveSchedule
    } of schedule) {
        currentLessonStart = timeStart;

        if (prevLessonEndTime) {
            const minutes = differenceInMinutes(currentLessonStart, prevLessonEndTime);
            // 75 = 15 + 45 + 15; 75 = максимальный перерыв + урок + максимальный перерыв - максимальное время урока
            // 45 - максимальный перерыв = 30 минут урока + 15 перемена
            if (minutes > 45) response += `${gap}\n\n`.repeat(Math.ceil(minutes / 75));
        }

        response += `${lesson({
            className,
            subclass: subclass?.name,
            timeStart,
            timeEnd,
            classroom: classroom?.name,
            teacher,
            canteen: canteenSchedule.length > 0,
            leave: leaveSchedule.length > 0,
        })}\n\n`;

        prevLessonEndTime = timeEnd;
    }

    await ctx.replyWithMarkdownV2(response);
}

bot.hears(rusDayOfWeek, async (ctx) => {
    const dayOfWeek = daysOfWeek[ctx.text as DayOfWeek];
    await findSchedule(ctx, dayOfWeek);
});
bot.hears('Сегодня', async (ctx) => {
    const today = createDate();
    const dayIndex = today.getDay();
    const dayOfWeek = daysOfWeek[rusDayOfWeek[dayIndex - 1]];
    await findSchedule(ctx, dayOfWeek);
});
bot.hears('Завтра', async (ctx) => {
    const today = addDays(createDate(), 1);
    const dayIndex = today.getDay();
    const dayOfWeek = daysOfWeek[rusDayOfWeek[dayIndex === 0 ? 6 : dayIndex - 1]];
    await findSchedule(ctx, dayOfWeek);
});


