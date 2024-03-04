const { Telegraf, Markup } = require('telegraf');
require('dotenv').config()

const token = process.env.BOT_TOKEN;
if (token === undefined){
  throw new Error ('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(token, {polling: true});

const pollingSettings = {
    interval: 3000,
    timeout: 30,
    limit:100
};

// Response Time Calcuation
bot.use((ctx, next) => {
  const messageReceivedTime = new Date();
  console.log(`Message received at: ${messageReceivedTime}`);

  return next().then(() => {
    const responseSentTime = new Date();
    console.log(`Response sent at: ${responseSentTime}`);

    const responseTime = responseSentTime - messageReceivedTime;
    console.log(`Response time: ${responseTime}ms`);
  });
});

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

bot.command('pendaftaran', (ctx) => {
  return ctx.reply('Proses Pendaftaran (AMBIL DARI DYNAMODB)');
});

bot.command('syarat_pendaftaran', (ctx) => {
  return ctx.reply('Pilih Jalur Pendaftaran', {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      Markup.button.callback('Jalur Prestasi (dari DynamoDB)', 's_prestasi'),
      Markup.button.callback('Jalur Mandiri(dari DynamoDB', 's_mandiri'),
      Markup.button.callback('Jalur 3', 's_skl'),
      Markup.button.callback('Jalur 4', 's_utbk'),
      Markup.button.callback('Jalur 5', 's_tes_kedokteran'),
      Markup.button.callback('Jalur 6', 's_filsafat'),
      Markup.button.callback('Jalur 7 (Arsitektur dan Biologi)', 's_khusus'),
    ])
  })
})

bot.command('beasiswa', (ctx) => {
  return ctx.reply('Ambil dari dynamoDB');
});

bot.command('program_studi', (ctx) => {
  return ctx.reply('Pilih Program Studi', {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      Markup.button.callback('Manajemen (dari DynamoDB)', 'p_manajemen'),
      Markup.button.callback('Akuntansi (dari DynamoDB', 'p_akuntansi'),
      Markup.button.callback('Informatika', 'p_informatika'),
      Markup.button.callback('Sistem Informasi', 'p_sistem_informasi'),
      Markup.button.callback('Arsitektur', 'p_arsitektur'),
      Markup.button.callback('Desain Produk', 'p_desain_produk'),
      Markup.button.callback('Biologi', 'p_biologi'),
      Markup.button.callback('Filsafat Keilahian', 'p_filsafat_keilahian'),
      Markup.button.callback('Kedokteran', 'p_kedokteran'),
      Markup.button.callback('Pendidikan Bahasa Inggris', 'p_pbi'),
      Markup.button.callback('Studi Humanitas', 'p_studi_humanitas'),
    ])
  })
})

bot.command('info_terbaru', (ctx) => {
  return ctx.reply('dyanmoDB');
});

// Reply Section For Callbacks provided by the command "jadwal_pmb"
bot.action('prestasi', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('mandiri', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('skl', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('utbk', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('tes_kedokteran', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('tes_filsafat', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

// Reply Section For Callbacks provided by the command "pendaftaran"
bot.action('s_prestasi', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('s_mandiri', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('s_skl', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('s_utbk', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('s_tes_kedokteran', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('s_filsafat', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('s_tes_khusus', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.command('contact', (ctx) => {
  return ctx.reply('No.HP: 08126116632 /nIG: @admisiukdw /nTikTok: @admisiukdw');
});


bot.launch({
    polling: pollingSettings,
  }).then(() => {
    console.log('Bot started with long polling');
  }).catch((err) => {
    console.error('Error starting the bot:', err);
  });
