import {bot} from "../bot";
import {daysOfWeek, rusDayOfWeek} from "../constants/daysOfWeek";
import {prisma} from "../db";
import {chill, lesson, now} from "../constants/text";
import {format, setHours, setMinutes, setSeconds} from "date-fns";
import {createDate, getDifferenceInHoursAndMinutes, getNormalizedTime} from "../utils/time";
import {setFollowTeacher} from "./reset";

bot.hears('Сейчас', async (ctx) => {
    const user = await prisma.user.findFirst({where: {id: ctx.chat.id}});

    if (!user) return;
    if (!user.teacherId) return setFollowTeacher(ctx);

    const nowDate = createDate();
    const dayIndex = nowDate.getDay();
    const dayOfWeek = daysOfWeek[rusDayOfWeek[dayIndex - 1]];

    let currentTime = format(nowDate, "HH:mm:ss");
    const currentDateTime = `1970-01-01T${currentTime}+03:00`;

    const data = await prisma.schedule.findFirst({
        where: {
            teacherId: user.teacherId,
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

    const normalizedTimeStart = getNormalizedTime(timeStart);
    const normalizedTimeEnd = getNormalizedTime(timeEnd);
    let toLesson = '';
    if (normalizedTimeStart < nowDate || nowDate > normalizedTimeEnd) {
        const {hours, minutes} = getDifferenceInHoursAndMinutes(nowDate, normalizedTimeStart);
        toLesson = `\n\nСейчас урока нет\\. До следущего урока\\: ${hours > 0 ? `${hours} ч\\. ` : ''} ${minutes > 0 ? `${minutes} мин\\.` : ''}`
    }


    await ctx.replyWithMarkdownV2(`${now}\\:${toLesson}\n\n${lesson({
        className,
        subclass: subclass?.name,
        classroom: classroom?.name,
        teacher,
        timeEnd,
        timeStart
    })}`);
});

