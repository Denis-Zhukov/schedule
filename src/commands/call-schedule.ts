import {bot} from "../bot";

const callSchedule = 'https://www.school27-gomel.by/wp-content/uploads/2022/08/%D0%A0%D0%B0%D1%81%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B7%D0%B2%D0%BE%D0%BD%D0%BA%D0%BE%D0%B2-1086x1536.jpg';

bot.command('call_schedule', async (ctx) => {
    await ctx.replyWithPhoto(callSchedule);
})
