import {addHours} from "date-fns";

export const differenceInMinutes = (date1: Date, date2: Date) => {
    const diffInMs: number = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diffInMs / (1000 * 60));
}

export const createDate = (date?: Date | string) => {
    return addHours(date ?? new Date(), 3);
}

export const getDifferenceInHoursAndMinutes = (date1: Date, date2: Date) => {
    const time1 = date1.getHours() * 60 + date1.getMinutes();
    const time2 = date2.getHours() * 60 + date2.getMinutes();

    const diffInMinutes = Math.abs(time2 - time1);

    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return {hours, minutes};
}
