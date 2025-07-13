// commands/warning_deduct.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('../../database/db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warning-deduct')
    .setDescription('사용자의 가장 최근 경고 1개를 제거합니다.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('차감할 사용자')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');

    const [latest] = await db.query(
      `SELECT id FROM warnings WHERE guild_id = ? AND user_id = ? ORDER BY timestamp DESC LIMIT 1`,
      [interaction.guild.id, user.id]
    );

    if (!latest) {
      return interaction.reply(`❌ **${user.tag}**님은 차감할 경고가 없습니다.`);
    }

    await db.query(`DELETE FROM warnings WHERE id = ?`, [latest.id]);

    await interaction.reply(`✅ **${user.tag}**님의 최근 경고 1개를 제거했습니다.`);
  }
  
};
