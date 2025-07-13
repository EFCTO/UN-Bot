const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('You can assign roles to server members.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Select a user to assign the role to.')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('Select the role to assign.')
        .setRequired(true)),
  async execute(interaction) {
    
    const targetUser = interaction.options.getMember('target');
    const roleOption = interaction.options.getRole('role');

    if (!targetUser) {
      return interaction.reply({ content: '대상 사용자를 찾을 수 없습니다.', ephemeral: true });
    }

    if (!roleOption) {
      return interaction.reply({ content: '역할을 선택해주세요!', ephemeral: true });
    }

   
    if (interaction.member.roles.highest.comparePositionTo(roleOption) <= 0) {
      return interaction.reply({ content: '이 역할을 부여할 권한이 없습니다.', ephemeral: true });
    }

    
    try {
      await targetUser.roles.add(roleOption);
      return interaction.reply({ content: `${targetUser.user.tag}에게 ${roleOption.name} 역할을 부여했습니다!`, ephemeral: true });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: '역할 부여 중 오류가 발생했습니다.', ephemeral: true });
    }
  },
};


