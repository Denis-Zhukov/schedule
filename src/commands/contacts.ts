import {bot} from "../bot";
import {Context} from "telegraf";

const developer = '@Denis_Zhukov_Hachiko';

export const contacts = async (ctx: Context)=>{
    await ctx.replyWithMarkdownV2(`Разработчик:\n${developer}`)
}

bot.command('contacts', contacts)
