module.exports = {
    data: {
      name: 'verify',
      description: '사용자에게 역할을 부여합니다.',
      options: [
        {
          name: 'role',
          type: 'ROLE',
          description: '부여할 역할',
          required: true,
        },
      ],
    },
    async execute(interaction) {
      const roleOption = interaction.options.getRole('role');
      const member = interaction.guild.members.cache.get(interaction.user.id);
  
      if (!roleOption) {
        return interaction.reply({ content: '역할을 선택해주세요!', ephemeral: true });
      }
  
      await member.roles.add(roleOption);
      return interaction.reply({ content: `${roleOption.name} 역할이 부여되었습니다!`, ephemeral: true });
    }
  };