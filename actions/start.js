const  {bot} = require('../core/bot');
const {Composer} = require('telegraf')
const {messages} = require('../lib/message')
const {keyboards} = require('../lib/keyboard')
const composer = new Composer()

composer.start(ctx => {

    ctx.replyWithHTML(messages["start"], keyboards).then(r => console.log(r));

})

composer.action("help", ctx => {
    ctx.editMessageText(messages["help"],{
        parse_mode: "HTML"
    }).then()
})

bot.use(composer.middleware())

