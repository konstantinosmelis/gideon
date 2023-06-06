const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('twitter').setDescription('Returns my twitter profile'),
	async execute(interaction) {
		await interaction.reply(`[@kmelissaratos](https://www.twitter.com/kmelissaratos/)`);
	}
};
