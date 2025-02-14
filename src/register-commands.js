require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

// 슬래시 명령어 등록 내용
const commands = [
  {
    name: 'serverinfo',
    description: 'Shows information about the server.',
  },
  {
    name: 'verify',
    description: 'Verifies a user and gives them a role.',
    options: [
      {
        name: 'target',
        type: ApplicationCommandOptionType.User,
        description: 'The user to verify',
        required: true, // 필수로 설정
      },
      {
        name: 'role',
        type: ApplicationCommandOptionType.Role,
        description: 'The role to assign to the user',
        required: true, // 필수로 설정
      },
    ],
  },
  {
    name: 'kick',
    description: 'Kick a user from the server.',
    options: [
      {
        name: 'target',
        type: ApplicationCommandOptionType.User,
        description: 'The user to kick',
        required: true,
      },
      {
        name: 'reason',
        type: ApplicationCommandOptionType.String,
        description: 'The reason for kicking the user',
        required: false,
      },
    ],
  },
  {
    name: 'ban',
    description: 'Ban a user from the server.',
    options: [
      {
        name: 'target',
        type: ApplicationCommandOptionType.User,
        description: 'The user to ban',
        required: true,
      },
      {
        name: 'reason',
        type: ApplicationCommandOptionType.String,
        description: 'The reason for banning the user',
        required: false,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();