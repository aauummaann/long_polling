const { Telegraf, Markup } = require('telegraf');
const token = process.env.BOT_TOKEN;
if (token === undefined){
  throw new Error ('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(token, {polling: true});

const pollingSettings = {
    interval: 3000,
    timeout: 10,
    limit:100
};

bot.use(Telegraf.log())

bot.start((ctx) => ctx.reply('Selamat datang di Chatbot Telegram Admisi UKDW'));

bot.command('jadwal_pmb', (ctx) => {
  return ctx.reply('Pilih Jalur Pendaftaran', {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      Markup.button.callback('Jalur Prestasi (dari DynamoDB)', 'prestasi'),
      Markup.button.callback('Jalur Mandiri(dari DynamoDB', 'mandiri'),
      Markup.button.callback('Jalur 3', 'skl'),
      Markup.button.callback('Jalur 4', 'utbk'),
      Markup.button.callback('Jalur 5', 'tes_kedokteran'),
      Markup.button.callback('Jalur 6', 'tes_filsafat'),
    ])
  })
})

bot.launch({
    polling: pollingSettings,
  }).then(() => {
    console.log('Bot started with long polling');
  }).catch((err) => {
    console.error('Error starting the bot:', err);
  });
