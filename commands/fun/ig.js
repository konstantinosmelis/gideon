const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('ig').setDescription('Returns my instagram profile'),
    async execute(interaction) {
        await interaction.reply(`[@konstantinos_melis](https://www.instagram.com/konstantinos_melis/)`);
    }
};
