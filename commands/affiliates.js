const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  AttachmentBuilder,
} = require("discord.js");

const button1 = new ButtonBuilder()
  .setLabel("Wayland Games")
  .setStyle(ButtonStyle.Link)
  .setURL("https://affiliates.waylandgames.co.uk/1248.html");

const button2 = new ButtonBuilder()
  .setLabel("Warmag")
  .setStyle(ButtonStyle.Link)
  .setURL("https://www.warmag.com/");

const button3 = new ButtonBuilder()
  .setLabel("Celtic Cup")
  .setStyle(ButtonStyle.Link)
  .setURL("https://celticcupgt.sumupstore.com/");

// const button4 = new ButtonBuilder()
//   .setLabel("goonhammer")
//   .setStyle(ButtonStyle.Link)
//   .setURL("https://www.goonhammer.com");

// const row1 = new ActionRowBuilder().addComponents(button1, button3); can add up to 5 buttons as in example here

// const row1 = new ActionRowBuilder().addComponents(button1);

// const row2 = new ActionRowBuilder().addComponents(button2);

// const row3 = new ActionRowBuilder().addComponents(button3);

const file = new AttachmentBuilder("assets/reaperLogo.jpg");

// const file = new AttachmentBuilder("assets/reaperLogo.jpg");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("affiliates")
    .setDescription("List of affiliates"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Select Affiliate Link")
      .setDescription("Buying from our affiliates supports Reaper")
      .setColor("Purple")
      .setThumbnail("attachment://reaperLogo.jpg")
      .addFields(
        {
          name: "Wayland Games",
          value: "https://affiliates.waylandgames.co.uk/1248.html",
        },
        {
          name: "Warmag",
          value: "https://www.warmag.com",
        },
        {
          name: "Celtic Cup",
          value: "https://celticcupgt.sumupstore.com",
        }
      );

    interaction.reply({
      // content: "Hello",
      embeds: [embed],
      // components: [row1, row2, row3],
      files: [file],
      flags: MessageFlags.Ephemeral,
    });
  },
};

// const row1 = new ActionRowBuilder({
//   components: [{ label: "This is Rosmary and co" }],
// }).addComponents(button1);
