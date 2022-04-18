const { Markup } = require('telegraf')

const  keyboards = {
    "start": Markup.inlineKeyboard([
        Markup.button.callback("Komandalar ko'rsatish", "help")
    ])
}
module.exports = keyboards