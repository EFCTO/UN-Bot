
require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


client.once('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

 
  client.user.setPresence({
    activities: [
      {
        name: '아무거나', 
        type: 0,
      },
    ],
    status: 'online',
  });
});


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


client.commands = new Map();


for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}


client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (command) {
    try {
      await command.execute(interaction); 
    } catch (error) {
      console.error('명령어 처리 중 오류 발생:', error);
      interaction.reply({ content: '오류가 발생했습니다. 다시 시도해주세요.', ephemeral: true });
    }
  }
});


require('./etc/Mention-response')(client);

client.on('messageCreate', message => {
  if (message.author.bot) return;

  
  if (message.content === "?명령어") {
      message.reply("해당 명령어는 봇의 구버전 명령어입니다 현재는 /명령어로 바뀌었으니 참고해주세요 :) ");
  }
});


client.login(process.env.BOT_TOKEN);

