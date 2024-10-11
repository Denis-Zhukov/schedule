import {classes} from "./classes";
import {format} from "date-fns";
import {Teacher} from "@prisma/client";
import {createDate} from "../utils/time";

type weekOfDay = {
    className: string,
    subclass?: string,
    timeStart: Date,
    timeEnd: Date,
    classroom?: string,
    teacher: Teacher,
    canteen?: boolean,
    leave?: boolean
};

export const {
    greeting,
    onlyPrivate,
    weekend,
    lesson,
    gap,
    now,
    chill
} = {
    gap: "🙌 *Форточка*",
    onlyPrivate: "Извините, но я работаю только в *личных сообщениях* 😔",
    greeting: (name: string | null) => `Привет, *${name ?? 'Пользователь'}* 🤗\nДанный бот предназначен помочь вам с расписанием в школе СШ\\-27`,
    weekend: `Сегодня уроков _НЕТ_\\! 🥳`,
    lesson: ({
                 classroom,
                 timeEnd,
                 timeStart,
                 subclass,
                 className,
                 teacher: {surname, name, patronymic},
                 canteen,
                 leave
             }: weekOfDay) => {
        let subclassName = '';
        if (subclass) {
            subclassName = ['СИЗО', 'Платные'].includes(subclass) ? ` ${subclass}` : subclass;
        }

        const classroomName = classroom?.replace('-', '\\-') ?? '';
        const teacher = `${surname} ${name[0]}.${patronymic[0]}.`;

        const start = format(createDate(timeStart), 'HH:mm');
        const end = format(createDate(timeEnd), 'HH:mm');

        return `${classes[+className]}*${subclassName}* ${classroomName} \`${teacher}\` _ __${start}\\-${end}__ _${
            canteen ? '\n\t\t\t\t\t\t*Отвести в столовку* 🦮' : ''
        }${
            leave ? '\n\t\t\t\t\t\t*Вывести из школы* 👊' : ''
        }`;
    },
    now: "*Сейчас*",
    chill: "*На сегодня больше ничего нет\\. Отдыхаем\\!* 🫶"
}
