import {greeting, onlyPrivate} from "../constants/text";
import {bot} from "../bot";
import {prisma} from "../db";
import {setButtons} from "./reset-menu";
import {setFollowTeacher} from "./reset";

bot.start(async (ctx) => {
    const chat = ctx.chat;

    if (chat.type !== 'private') {
        await ctx.reply(onlyPrivate);
        return;
    }

    let user = await prisma.user.upsert({
        where: {id: chat.id},
        create: {
            id: chat.id,
            name: chat.first_name,
            surname: chat.last_name,
            username: chat.username
        },
        update: {
            id: chat.id,
            name: chat.first_name,
            surname: chat.last_name,
            username: chat.username
        }
    })

    await setButtons(ctx);
    await ctx.replyWithMarkdownV2(greeting(user.name));
    await setFollowTeacher(ctx);
});
