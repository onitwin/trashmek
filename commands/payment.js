const {
  SlashCommandBuilder,
  EmbedBuilder,
  MessageFlags,
  AttachmentBuilder,
} = require("discord.js");

const file = new AttachmentBuilder("assets/twinswordsImage.png");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("payment")
    .setDescription("How to pay for your tournament ticket"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Ticket Info")
      .setDescription("Twin Swords Tournament Tickets Payment Details")
      .setColor("Red")
      .setImage("attachment://twinswordsImage.png")
      .addFields(
        {
          name: "Ticket Cost",
          value: "£20",
          inline: false,
        },
        {
          name: "Sort Code",
          value: "608407",
          inline: false,
        },
        {
          name: "Account Number",
          value: "22304855",
          inline: false,
        },
        {
          name: "Payee Name",
          value: "Alistair Donaldson",
          inline: false,
        },
      );

    interaction.reply({
      embeds: [embed],
      files: [file],
      flags: MessageFlags.Ephemeral,
    });
  },
};
