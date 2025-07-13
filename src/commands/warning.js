// commands/warning.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('../../database/db.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warning')
    .setDescription('사용자에게 경고를 줍니다.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('경고를 줄 대상')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('경고 사유')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || '사유 없음';

    await db.query(
      `INSERT INTO warnings (guild_id, user_id, moderator_id, reason) VALUES (?, ?, ?, ?)`,
      [interaction.guild.id, user.id, interaction.user.id, reason]
    );

    await interaction.reply(`⚠️ **${user.tag}**님에게 경고를 추가했습니다.\n사유: ${reason}`);
  }
};
