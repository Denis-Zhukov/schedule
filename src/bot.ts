import {Telegraf} from 'telegraf';
import {config} from 'dotenv';

config()

export const bot = new Telegraf((process.env.TOKEN as string));

import './commands';

bot.launch();
