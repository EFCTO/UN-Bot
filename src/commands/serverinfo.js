const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('서버 정보를 조회합니다.'),
  async execute(interaction) {
    // 서버에서 실행된 것이 아니면 예외 처리
    if (!interaction.guild) {
      return interaction.reply({
        content: '❗ 이 명령어는 서버에서만 사용할 수 있습니다.',
        ephemeral: true, // 사용자에게만 보이도록
      });
    }

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
