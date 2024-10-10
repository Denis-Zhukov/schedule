export const differenceInMinutes = (date1: Date, date2: Date) => {
    const diffInMs: number = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diffInMs / (1000 * 60));
}
