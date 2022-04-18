const {bot} = require('../core/bot');
const  {Composer, Markup,Extra} = require('telegraf')
const axios = require('axios');
const fuzzy = require('fuzzy');

const composer = new Composer();

let url = "https://raw.githubusercontent.com/denoland/registry/master/src/database.json"

composer.on('inline-query', async ({inlineQuery, answerInlineQuery}) => {
    let results = [];
    let indexation = 0;
    let database = await axios.get(url).then(res => {return res.data});
    let packs = Object.keys(database).map(function (obj) {return obj;});
    let similarities = fuzzy.filter(inlineQuery.query, packs).sort().slice(0, 20);
     let found = similarities.map(function(it){return it.string;});
     for(let key of found){
         let data = database['key'];
         let desc = data['desc']
         let repo = data['repo'];
         let auth = data['owner'];
         let deno = `https://deno.land/x/${key}`;
         let github = `https://github.com/${auth}/${repo}`;
         let prefix = key.replace(/_/g,' ');

         let text = `<b>Package</b>: ${prefix}` + `\n` +
                     `<b>Description:</b> ${desc}` + `\n`
         const keyboard = Markup.inlineKeyboard([
             Markup.button.url(`Github`, github),
             Markup.button.url(`Deno`, deno)
         ], {columns: 2});

            let serializer = () => {
                const querylizer = {
                    type: 'article',
                    id: ++indexation,
                    url: deno,
                    title: prefix,
                    description: desc,
                    reply_markup: keyboard,
                     input_message_content: {
                        message_text: text,
                        parse_mode: 'HTML'
                    }
                };
                results.push(querylizer)
                indexation++;
            }; serializer();

     }
            return answerInlineQuery(results)
})
bot.use(composer.middleware());