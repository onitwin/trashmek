const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  MessageFlags,
} = require("discord.js");

const twinSwordsCompetitivePack = new AttachmentBuilder(
  "assets/TTB Twin Swords - Competetive.pdf",
);

const twinSwordsFluffyPack = new AttachmentBuilder(
  "assets/TTB Twin Swords - Fluffy.pdf",
);

const twinswordsImageLogo = new AttachmentBuilder("assets/twinswordsImage.png");

const baseEmbed = new EmbedBuilder()
  .setTitle("EVENTS")
  .setDescription("Details for Trash Bandits Events in 2026")
  .setImage("attachment://twinswordsImage.png")
  .setColor("Red")
  .addFields({ name: "Event List", value: "Select an event for more details" });

const twinswordsembed = new EmbedBuilder()
  .setTitle("Twin Swords Competitive Event")
  .setDescription("Info for the 2026 competitive event")
  .setThumbnail("attachment://twinswordsImage.png")
  .setColor("Red")
  .addFields(
    { name: "Date of Event", value: "15/03/2026" },
    { name: "Time of Event", value: "09:00 AM" },
    {
      name: "Location",
      value: "Merchants Guild, 50 Albion St, Glasgow G1 1LH",
    },
    {
      name: "Best Coast Pairings Link",
      value: "https://web.bestcoastpairings.com/event/7ZQh3RQDPaSr",
    },
  );

const twinSwordsFluffyEmbed = new EmbedBuilder()
  .setTitle("Twin Swords Fluffy Event 2026")
  .setDescription("Info for the 2026 fluffy event")
  .setThumbnail("attachment://twinswordsImage.png")
  .setColor("Red")
  .addFields(
    { name: "Date of Event", value: "15/03/2026" },
    { name: "Time of Event", value: "09:00 AM" },
    {
      name: "Location",
      value: "Merchants Guild, 50 Albion St, Glasgow G1 1LH",
    },
  );

const evnt1btn = new ButtonBuilder()
  .setCustomId("Twinswords competitive")
  .setLabel("Twin Swords Competitive 2026")
  .setStyle(ButtonStyle.Primary);

const evnt2btn = new ButtonBuilder()
  .setCustomId("Twinswords fluffy")
  .setLabel("Twin Swords Fluffy 2026")
  .setStyle(ButtonStyle.Primary);

// const evnt3btn = new ButtonBuilder()
//   .setCustomId("Glasvegas")
//   .setLabel("Glasvegas Summer Series 2025")
//   .setStyle(ButtonStyle.Primary);

const buttonRow = new ActionRowBuilder().addComponents(evnt1btn, evnt2btn);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("events")
    .setDescription(" Trash Bandits Events for 2026"),
  async execute(interaction) {
    const response = await interaction.reply({
      embeds: [baseEmbed],
      files: [twinswordsImageLogo],
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

      if (confirmation.customId === "Twinswords competitive") {
        await confirmation.update({
          embeds: [twinswordsembed],
          files: [twinSwordsCompetitivePack],
          flags: MessageFlags.Ephemeral,
          components: [],
        });
      } else if (confirmation.customId === "Twinswords fluffy") {
        await confirmation.update({
          embeds: [twinSwordsFluffyEmbed],
          files: [twinSwordsFluffyPack],
          flags: MessageFlags.Ephemeral,
          components: [],
        });
      } else if (confirmation.customId === "PUT CUSTOM ID HERE") {
        await confirmation.update({
          embeds: [embedNameGoesHere],
          files: [],
          flags: MessageFlags.Ephemeral,
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
