const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: {
    name: 'kick',
    description: '사용자를 킥합니다.',
    options: [
      {
        name: 'target',
        type: 'USER',
        description: '킥할 사용자',
        required: true,
      },
      {
        name: 'reason',
        type: 'STRING',
        description: '킥 사유',
        required: false,
      },
    ],
  },
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

