const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'serverinfo',
    description: '서버 정보를 조회합니다.',
  },
  async execute(interaction) {
    const guild = interaction.guild;
    
    const embed = new EmbedBuilder()
      .setTitle(`${guild.name} - Server Information`)
      .setColor('#00FFFF')
      .addFields(
        { name: '서버이름', value: guild.name, inline: true },
        { name: '서버 ID', value: guild.id, inline: true },
        { name: '멤버수', value: `${guild.memberCount}`, inline: true },
        { name: '만들어진 날짜', value: guild.createdAt.toDateString(), inline: true }
      );

    return interaction.reply({ embeds: [embed] });
  }
};