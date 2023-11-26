const express = require('express');
const bodyParser = require('body-parser');

const telegramBot = require('node-telegram-bot-api');
const TelegramBot = require('node-telegram-bot-api/lib/telegram');
require('dotenv').config();

const TOKEN = process.env.TOKEN;
let botInitialized = false;
var bot;
let chatId = 716656717;
const app = express();
const port = 3000;

let getChatIdMessage= "ChatId Obtido";

async function enviarMensagemAoBot() 
{ 
  if (Number(chatId)){
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
  }else{
    console.log("chatID not Defined yet");
  }
}

if (botInitialized == false) {
   botInitialized = true;
   bot = new TelegramBot(TOKEN, { polling: true });
   console.log("Bot Initialized");
}

bot.on('message', (message) => {
  chatId = message.from.id;
  //let userMessage = message.text;
  bot.sendMessage(chatId, getChatIdMessage)
.then(() => {
  console.log('Mensagem do GetChatID enviada com sucesso.');
  console.log('chatID: ' + chatId);
})
.catch((error) => {
  console.error('Erro ao enviar mensagem do do GetChatID para o bot:', error);
});
});

app.use(bodyParser.json());
app.post('/arduino-sensor', (req, res) => {
    
  res.status(200).json({ mensagem: `Valor de detecção recebido: ${req.body[0].value}` });
  
  if (req.body[0].value== 'DETECTED') 
   {
    console.log('Variável:' + req.body[0].value);
    enviarMensagemAoBot();
    console.log('CHATID ' + chatId);
   }
   else 
   {
   console.log("Variavél detection não presente. erro");// res.status(400).json({ erro: 'Variável "detection" ausente no corpo da requisição JSON' });
   }
});

app.listen( 
  {
   host:'0.0.0.0',
   port: process.env.PORT? Number(process.env.PORT): 3333,
   
 });
 
 console.log('HTTP Server Running');
