const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: {
    name: 'ban',
    description: '사용자를 밴합니다.',
    options: [
      {
        name: 'target',
        type: 'USER',
        description: '밴할 사용자',
        required: true,
      },
      {
        name: 'reason',
        type: 'STRING',
        description: '밴 사유',
        required: false,
      },
    ],
  },
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({ content: '🚫 이 명령어를 실행할 권한이 없습니다! (밴 권한 필요)', ephemeral: true });
    }

    const targetUser = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || '사유 없음';
    const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

    if (!member || !member.bannable) {
      return interaction.reply({ content: '⚠️ 이 사용자를 밴할 수 없습니다!', ephemeral: true });
    }

    await member.ban({ reason });
    return interaction.reply({ content: `✅ ${targetUser.tag}님이 밴되었습니다. (사유: ${reason})` });
  }
};