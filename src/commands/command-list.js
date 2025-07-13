const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('command')
    .setDescription('Shows the list of commands.'),
  async execute(interaction) {
    const guild = interaction.guild;
    
    const embed = new EmbedBuilder()
      .setTitle(`현재 사용할수있는 슬래시 명령어 목록입니다`)
      .setColor('#00FFFF')
      .addFields(
        { name: '/serverinfo', value: '서버의 정보를 표시합니다', inline: true },
        { name: '/role', value: '멤버에게 역할을 부여할수 있습니다', inline: true },
        { name: '/kick', value: '구성원을 추방시킵니다', inline: true },
        { name: '/ban', value: '구성원을 차단합니다', inline: true },
        { name: '/ping', value: '봇 API 핑을 보여줍니다', inline: true }
      );

    return interaction.reply({ embeds: [embed] });
  }
};