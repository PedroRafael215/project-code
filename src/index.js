


const express = require('express');
const bodyParser = require('body-parser');
const telegramBot = require('node-telegram-bot-api');
const TelegramBot = require('node-telegram-bot-api/lib/telegram');
require('dotenv').config();

const TOKEN = process.env.TOKEN;

const app = express();
const port = 3000;

var d = new Date(); 
let dataAtual = d.toLocaleString('pt-BR');


const bot = new telegramBot(TOKEN, {polling: true});



app.use(bodyParser.json());

app.post('/arduino', (req, res) => {
  
  // Verifica se a variável "detection" está presente no corpo da requisição
  console.log('Variável:' + req.body[0].detection);
  
  if (req.body[0] && req.body[0].detection) {
    const valorDetection = req.body[0].detection;
    res.status(200).json({ mensagem: `Valor de detection recebido: ${valorDetection}` });
  } else {
    res.status(400).json({ erro: 'Variável "detection" ausente no corpo da requisição JSON' });
  }

  if (req.body && req.body.detection) {
    const valorDetection = req.body.detection;
    res.status(200).json({ mensagem: `Valor de detection recebido: ${valorDetection}` });
  } else {
    res.status(400).json({ erro: 'Variável "detection" ausente no corpo da requisição JSON' });
  }
//-----------------------------------------
  
let Sensor = req.body[0].detection;
let setSensor = 'on';

  bot.on('message', (message) => {
      console.log("Pedro says: "+ message.text);
      //console.log(message.from.id);
  
      let chatId = message.from.id;
      let userMessage = message.text;

      if( userMessage == "/command2" )
      {
        setSensor = 'off'
      }
      if( userMessage == "/command1" )
      {
        setSensor = 'on';
      }


      if( Sensor == "-DETECTADO-" && setSensor != 'off' )
      {
        bot.sendMessage("ALERTA\n\nAlarme acionado em:\n");
      }

      

      if(userMessage != "/command1" || userMessage == "/command2")
      {
          bot.sendMessage(chatId, 'Por favor, especifique um comando válido disponível');
          bot.sendMessage(chatId, `/command1 - para Habilitar o Sensor\n/command2 - para Desabilitar o Sensor`);
      }
  
  });

});

app.listen( 
 {
  host:'0.0.0.0',
  port: process.env.PORT? Number(process.env.PORT): 3333,
  
});

console.log('HTTP Server Running');