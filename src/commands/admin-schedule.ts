import {bot} from "@/bot";
import {Context} from "telegraf";

import {getImagePath} from "@/utils/file";

export const adminSchedule = async (ctx: Context) => {
    const source = getImagePath('admin-schedule.jpg');
    await ctx.replyWithPhoto({source});
}

bot.command('admin_schedule', adminSchedule)
