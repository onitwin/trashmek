const { SlashCommandBuilder } = require('discord.js');
const { rollDice } = require('../helperCommands/diceRoller');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls a D6'),
	async execute(interaction) {
		const result=rollDice(1,6)
		await interaction.reply({content:`${interaction.user.username} rolled : ${result}`});
	},
};