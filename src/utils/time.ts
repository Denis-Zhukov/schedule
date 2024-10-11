import {TZDate} from "@date-fns/tz";
import {setHours, setMinutes, setSeconds} from "date-fns";
import {toZonedTime} from 'date-fns-tz';

export const differenceInMinutes = (date1: Date, date2: Date) => {
    const diffInMs: number = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diffInMs / (1000 * 60));
}

export const createDate = (date?: Date) => {
    return date ? new TZDate(date, 'Europe/Minsk') : TZDate.tz('Europe/Minsk');
}

export const getDifferenceInHoursAndMinutes = (date1: Date, date2: Date) => {
    const time1 = date1.getHours() * 60 + date1.getMinutes();
    const time2 = date2.getHours() * 60 + date2.getMinutes();
    const diffInMinutes = time2 - time1;

    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return {hours, minutes};
}

export const getNormalizedTime = (date: Date) => {
    const zonedDate = toZonedTime(date, 'Europe/Minsk');
    return setSeconds(setMinutes(setHours(new TZDate(1970, 0, 1, 'Europe/Minsk'), zonedDate.getHours()), zonedDate.getMinutes()), 0);
}
