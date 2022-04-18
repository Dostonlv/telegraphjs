const  {bot} = require('../core/bot');
bot.help(ctx => {
let text= `<b> Bizning botimizda bajarish mumkin bo'lgan komandalar: </b> \n `+
    `/start - <code> botni ishga tushirish </code> \n `

    ctx.replyWithHTML(text).then()
})