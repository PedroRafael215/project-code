


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/sensor-arduino', (req, res) => {
  // Verifica se a variável "detection" está presente no corpo da requisição
  console.log(req.body.detection);
  if (req.body && req.body.detection) {
    const valorDetection = req.body.detection;
    res.status(200).json({ mensagem: `Valor de detection recebido: ${valorDetection}` });
  } else {
    res.status(400).json({ erro: 'Variável "detection" ausente no corpo da requisição JSON' });
  }
});

app.listen( 
 {
  host:'0.0.0.0',
  port: process.env.PORT? Number(process.env.PORT): 3333,
  
});


//BOT ABAIXO

const telegramBot = require('node-telegram-bot-api');
const TelegramBot = require('node-telegram-bot-api/lib/telegram');
require('dotenv').config();

const TOKEN = process.env.TOKEN;

const bot = new telegramBot(TOKEN, {polling: true});

bot.on('message', (message) => {
    console.log("Pedro says: "+ message.text);
    if (message.text == '-DETECTADO-' ) {
      bot.sendMessage(chatId,'Atenção!!! Alarme Acionado!!!');
    }
    console.log(message.from.id);
    let chatId = message.from.id;
    if(message.text!= "/command1" && message.text!= "/command2" & message.text!= "/command3" && message.text!= "/command4")
    {
        bot.sendMessage(chatId, 'Por favor, especifique um comando válido disponível');
        bot.sendMessage(chatId, `/command1 - para Habilitar o Sensor
        \n\n\n/command2 - para Desabilitar o Sensor
        \n\n\n/command3 - para Exibir status atual
        \n\n\n/command2 - para Exibir ultima detecção`);
    
    }

    
});



console.log('HTTP Server Running');