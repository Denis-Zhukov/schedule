import {bot} from "@/bot";
import {Context} from "telegraf";
import {getImagePath} from "@/utils/file";

export const callSchedule = async (ctx: Context) => {
    const source = getImagePath('call-schedule.jpg');
    await ctx.replyWithPhoto({source});
}

bot.command('call_schedule', callSchedule)
