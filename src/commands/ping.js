const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('pong!'),

    async execute(interaction) {
        const ping = interaction.client.ws.ping;

        const embed = new EmbedBuilder()
          .setTitle('🏓 Pong!')
          .setColor('#A020F0') 
          .addFields(
            { name: 'API 핑', value: `${ping}ms`, inline: true }
          );

        await interaction.reply({ embeds: [embed] }); 
    }
};




