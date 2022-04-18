const axios = require('axios');
const {bot} = require('../core/bot');
const  {Composer, Markup,Extra} = require('telegraf')
const url = "https://raw.githubusercontent.com/RisingStack/deno_website2/master/deno_std_versions.json"
const composer = new Composer();

composer.command('std', async ctx => {
    let versions = []
    let keyboards = []

    let data = await  axios.get(url).then(res => {return res.data})

    for(let version of data){
        keyboards.push(
        [Markup.button.url(`${version}`, `https://deno.land/std@${version}`)])
    }
    ctx.replyWithHTML('Choose  version from list', Markup.inlineKeyboard(keyboards), parse_mode='HTML')
})


bot.use(composer.middleware());