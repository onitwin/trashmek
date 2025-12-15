const {
  SlashCommandBuilder,
  EmbedBuilder,
  MessageFlags,
  AttachmentBuilder,
} = require("discord.js");

const file = new AttachmentBuilder("assets/reaperLogo.jpg");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("payment")
    .setDescription("How to pay for your table"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Table Cost")
      .setDescription("Game table access is £5 a week, paid at the door")
      .setColor("Purple")
      .setImage("attachment://reaperLogo.jpg");

    interaction.reply({
      embeds: [embed],
      files: [file],
      flags: MessageFlags.Ephemeral,
    });
  },
};
