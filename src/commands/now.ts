import {bot} from "../bot";
import {daysOfWeek, rusDayOfWeek} from "../constants/daysOfWeek";
import {prisma} from "../db";
import {chill, lesson, now} from "../constants/text";
import {format} from "date-fns";
import {createDate} from "../utils/time";

bot.hears('Сейчас', async (ctx) => {
    const nowDate = createDate();
    const dayIndex = nowDate.getDay();
    const dayOfWeek = daysOfWeek[rusDayOfWeek[dayIndex - 1]];

    let currentTime = format(nowDate, "HH:mm:ss");
    const currentDateTime = `1970-01-01T${currentTime}+03:00`;

    const data = await prisma.schedule.findFirst({
        where: {
            teacherId: 1,
            dayOfWeek,
            OR: [
                {
                    timeStart: {
                        lte: currentDateTime,
                    },
                    timeEnd: {
                        gte: currentDateTime,
                    },
                },
                {
                    timeStart: {
                        gt: currentDateTime,
                    },
                }
            ],
        },
        orderBy: {
            timeStart: 'asc',
        },
        select: {
            dayOfWeek: true,
            class: {select: {name: true}},
            subclass: {select: {name: true}},
            timeStart: true,
            timeEnd: true,
            classroom: {select: {name: true}},
            teacher: true
        }
    });

    if (!data) return ctx.replyWithMarkdownV2(chill);

    const {
        class: {name: className},
        subclass,
        classroom,
        timeStart,
        timeEnd,
        teacher
    } = data;

    await ctx.replyWithMarkdownV2(`${now}\\:\n\n${lesson({
        className,
        subclass: subclass?.name,
        classroom: classroom?.name,
        teacher,
        timeEnd,
        timeStart
    })}`);
});
