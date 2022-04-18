const {Markup} = require('telegraf')
const {bot} = require('../core/bot');

bot.command('inline',   ctx => {

    const keyboard = Markup.inlineKeyboard([
       Markup.button.url('Google', 'https://google.com'),

        ],
        {columns: 2}
    )
        ctx.reply('testing url buttons', keyboard)

});