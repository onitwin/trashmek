const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  MessageFlags,
} = require("discord.js");

const celticCupPack = new AttachmentBuilder(
  "assets/Celtic Cup 2025 Event Pack V2.pdf"
);

const highlanderPack = new AttachmentBuilder(
  "assets/Highlander Painting Awards 2025.pdf"
);

const glasvegasPack = new AttachmentBuilder("assets/TournamentPack2025.pdf");
const reaperLogo = new AttachmentBuilder("assets/reaperLogo.jpg");

const baseEmbed = new EmbedBuilder()
  .setTitle("EVENTS")
  .setDescription("List and details for Reaper Wargaming Events")
  .setImage("attachment://reaperLogo.jpg")
  .setColor("Purple")
  .addFields({ name: "Event List", value: "Select an event for more details" });

const ccembed = new EmbedBuilder()
  .setTitle("Celtic Cup 2025 Tournament Pack")
  .setDescription("Missions and info for the 2025 event")
  .setThumbnail("attachment://celticCupLogo.jpg")
  .setColor("Purple")
  .addFields(
    { name: "Date of Event", value: "23/11/2025" },
    { name: "Time of Event", value: "09:00 AM" },
    {
      name: "Best Coast Pairings Link",
      value: "https://www.bestcoastpairings.com/event/vzvEQEu88Oqf",
    },
    {
      name: "Direct Link to Event Pack",
      value:
        "https://drive.google.com/file/d/1Vd1xRJTi3YsPxg4p6QQTvX0ragkKc2nT/view",
    }
  );

const highlanderEmbed = new EmbedBuilder()
  .setTitle("Highlander Painting Competition 2025")
  .setDescription("Info for the 2025 event")
  .setThumbnail("attachment://reaperLogo.jpg")
  .setColor("Purple")
  .addFields(
    { name: "Date of Event", value: "23/11/2025" },
    { name: "Time of Event", value: "09:00 AM" },
    {
      name: "Direct Link to Event Pack",
      value:
        "https://drive.google.com/file/d/1nW2_hDSw8hYzPAAFGEiP6JMsdB2m3sLg/view",
    }
  );

const glasvegasEmbed = new EmbedBuilder()
  .setTitle("Glasvegas 2026")
  .setDescription("Info for the January 2026 Event")
  .setThumbnail("attachment://reaperLogo.jpg")
  .setColor("Purple")
  .addFields(
    { name: "Date of Event", value: "17/01/2026" },
    { name: "Time of Event", value: "09:00 AM" },
    { name: "Number of Rounds", value: "Three" },
    {
      name: "Best Coast Pairings Link",
      value: "https://web.bestcoastpairings.com/event/qEDlmK34LsVf",
    },
    {
      name: "Purchase Tickets",
      value:
        "https://reaper-wargaming-glasgow.sumupstore.com/product/glasvegas-open-winter-rtt-january-17th",
    }
  );

const evnt1btn = new ButtonBuilder()
  .setCustomId("Glasvegas")
  .setLabel("GlasVegas Open January 2026")
  .setStyle(ButtonStyle.Primary);

// const evnt2btn = new ButtonBuilder()
//   .setCustomId("Highlander Painting")
//   .setLabel("Highlander Painting Awards 2025")
//   .setStyle(ButtonStyle.Primary);

// const evnt3btn = new ButtonBuilder()
//   .setCustomId("Glasvegas")
//   .setLabel("Glasvegas Summer Series 2025")
//   .setStyle(ButtonStyle.Primary);

const buttonRow = new ActionRowBuilder().addComponents(evnt1btn);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("events")
    .setDescription(" Events From Reaper in 2026"),
  async execute(interaction) {
    const response = await interaction.reply({
      embeds: [baseEmbed],
      files: [reaperLogo],
      flags: MessageFlags.Ephemeral,
      components: [buttonRow],
      withResponse: true,
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;
    try {
      const confirmation =
        await response.resource.message.awaitMessageComponent({
          filter: collectorFilter,
          time: 60_000,
        });

      if (confirmation.customId === "Celtic Cup") {
        await confirmation.update({
          embeds: [ccembed],
          files: [celticCupPack],
          components: [],
        });
      } else if (confirmation.customId === "Highlander Painting") {
        await confirmation.update({
          embeds: [highlanderEmbed],
          files: [highlanderPack],
          components: [],
        });
      } else if (confirmation.customId === "Glasvegas") {
        await confirmation.update({
          embeds: [glasvegasEmbed],
          files: [],
          components: [],
        });
      }
    } catch {
      await interaction.editReply({
        content: "Confirmation not received within 1 minute, cancelling",
        components: [],
      });
    }
  },
};
