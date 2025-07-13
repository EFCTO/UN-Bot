require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('command')
    .setDescription('Shows the list of commands.'),

  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Checking the bot\'s API ping.'),

  new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Shows information about the server.'),

  new SlashCommandBuilder()
    .setName('role')
    .setDescription('Assign a role to a user.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Select a user to assign the role to.')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('Select the role to assign to the user.')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to kick')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for kicking the user')
        .setRequired(false)),

  new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to ban')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for banning the user')
        .setRequired(false)),

  new SlashCommandBuilder()
    .setName('warning')
    .setDescription('Issue a warning to a user.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to warn.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for the warning.')
        .setRequired(false)),

  new SlashCommandBuilder()
    .setName('warning-check')
    .setDescription('Check a user\'s warning count.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to check.')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('warning-deduct')
    .setDescription('Deduct a warning from a user.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user whose warning you want to deduct.')
        .setRequired(true)),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('Deleting all existing global slash commands...');

    const existingCommands = await rest.get(Routes.applicationCommands(process.env.CLIENT_ID));
    
    if (existingCommands.length > 0) {
      for (const command of existingCommands) {
        await rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, command.id));
        console.log(`Deleted command: ${command.name}`);
      }
    } else {
      console.log('No existing commands found.');
    }

    console.log('Registering new global slash commands...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('New slash commands were registered globally!');
  } catch (error) {
    console.error('Error occurred while registering commands:', error);
  }
})();
