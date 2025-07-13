const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('사용자를 밴합니다.')
    .addUserOption(option =>
      option.setName('target')  
        .setDescription('밴할 사용자')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('밴 사유')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers), 

  async execute(interaction) {
    
    if (!interaction.memberPermissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({ content: '🚫 이 명령어를 실행할 권한이 없습니다! (밴 권한 필요)', ephemeral: true });
    }

    
    const targetUser = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || '사유 없음';

    
    const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

    if (!member) {
      return interaction.reply({ content: '⚠️ 해당 사용자를 찾을 수 없습니다!', ephemeral: true });
    }

   
    if (!member.bannable) {
      return interaction.reply({ content: '⚠️ 해당 사용자를 밴할 수 없습니다! (봇보다 높은 역할)', ephemeral: true });
    }

   
    try {
      await member.ban({ reason });
      return interaction.reply({ content: `✅ **${targetUser.tag}**님이 밴되었습니다. (사유: ${reason})` });
    } catch (error) {
      console.error('밴 실행 중 오류 발생:', error);
      return interaction.reply({ content: '❌ 밴을 실행하는 동안 오류가 발생했습니다.', ephemeral: true });
    }
  }
};

