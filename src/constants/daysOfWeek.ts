import {DayOfWeek} from "@prisma/client";

export const daysOfWeek: Record<string, DayOfWeek> = {
    'ПН': 'MONDAY',
    'ВТ': 'TUESDAY',
    'СР': 'WEDNESDAY',
    'ЧТ': 'THURSDAY',
    'ПТ': 'FRIDAY',
    'СБ': 'SATURDAY',
    'ВС': 'SUNDAY'
};

export const rusDayOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
