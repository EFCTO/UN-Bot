// commands/warning_check.js
const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database/db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warning-check')
    .setDescription('Checks the users warnings')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('조회할 사용자')
        .setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');

    const results = await db.query(
      `SELECT * FROM warnings WHERE guild_id = ? AND user_id = ? ORDER BY timestamp DESC`,
      [interaction.guild.id, user.id]
    );

    if (results.length === 0) {
      return interaction.reply(`✅ **${user.tag}**님은 경고가 없습니다.`);
    }

    const messages = results.slice(0, 5).map((warn, idx) =>
      `#${idx + 1} - ${warn.reason} (by <@${warn.moderator_id}> at ${new Date(warn.timestamp).toLocaleString()})`
    ).join('\n');

    await interaction.reply(`📄 **${user.tag}**님의 경고 기록:\n\n${messages}`);
  }
};
