const express = require('express');
const bodyParser = require('body-parser');

const telegramBot = require('node-telegram-bot-api');
const TelegramBot = require('node-telegram-bot-api/lib/telegram');
require('dotenv').config();

const TOKEN = process.env.TOKEN;
let botInitialized = false;
let BOT;
let chatId;
const app = express();
const port = 3000;


let getChatIdMessage= "ChatId Obtido";

if (botInitialized == false) {
  botInitialized = true;
  //botInitialized = true;
  const BOT = new TelegramBot(TOKEN, { polling: true });
  bot = BOT;
  bot.on('message', (message) => {
    chatId = message.from.id;
    //let userMessage = message.text;
  
    bot.sendMessage(chatId, getChatIdMessage)
  .then(() => {
    console.log('Mensagem do GetChatID enviada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao enviar mensagem do do GetChatID para o bot:', error);
  });
});
  console.log("Bot Initialized");
}


app.use(bodyParser.json());
app.post('/arduino-sensor', (req, res) => {
  console.log(req.body[0].detection);
  console.log("DEBUGGGGGG "+req.body.detection);
  res.status(200).json({ mensagem: `Valor de detection recebido: ${req.body[0].detection}` });
  
  // Verifica se a variável "detection" está presente no corpo da requisição
  
  if (req.body[0] && req.body[0].detection) {
    console.log('Variável:' + req.body[0].detection);


    if(req.body[0].detection == "DETECTED"){
      
    console.log('Variável:' + req.body[0].detection);
      enviarMensagemAoBot();
      
  }
  
  } else {
   console.log("Variavél detection não presente. erro");// res.status(400).json({ erro: 'Variável "detection" ausente no corpo da requisição JSON' });
  }
});

async function enviarMensagemAoBot() {
  var d = new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"});
let dataAtual = d.toLocaleString('pt-BR');
    // Envia uma mensagem para um chat específico ou para todos os chats, dependendo dos requisitos
    const chatIdBot = chatId; // Substitua pelo ID real do chat

    // Mensagem a ser enviada
    const mensagem = "ALERTA\n\nAlarme acionado em:\n" + dataAtual;

    // Envia a mensagem
    await bot.sendMessage(chatIdBot, mensagem)
      .then(() => {
        console.log('Mensagem enviada com sucesso.');
      })
      .catch((error) => {
        console.error('Erro ao enviar mensagem para o bot:', error);
      });
  }


app.listen( 
  {
   host:'0.0.0.0',
   port: process.env.PORT? Number(process.env.PORT): 3333,
   
 });
 
 console.log('HTTP Server Running');
