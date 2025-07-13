const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('사용자를 킥합니다.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('킥할 사용자')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('킥 사유')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      return interaction.reply({ content: '🚫 이 명령어를 실행할 권한이 없습니다! (킥 권한 필요)', ephemeral: true });
    }

    const targetUser = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || '사유 없음';
    const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

    if (!member || !member.kickable) {
      return interaction.reply({ content: '⚠️ 이 사용자를 킥할 수 없습니다!', ephemeral: true });
    }

    await member.kick(reason);
    return interaction.reply({ content: `✅ ${targetUser.tag}님이 킥되었습니다. (사유: ${reason})` });
  }
};



