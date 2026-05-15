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

const funeralPack = new AttachmentBuilder(
  "assets/The Funeral of 10th Edition.pdf",
);

const funeralImage = new AttachmentBuilder("assets/funeral.jpeg");

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

const funeralEmbed = new EmbedBuilder()
  .setTitle("Funeral of 10th Edition")
  .setDescription("Info for the 2026 fluffy event")
  .setThumbnail("attachment://funeral.jpeg")
  .setColor("Red")
  .addFields(
    { name: "Date of Event", value: "23/05/2026" },
    { name: "Time of Event", value: "10 AM till 10 PM" },
    {
      name: "Location",
      value: "4a, 12 Orton Pl, Glasgow G51 2HF",
    },
  );

const evnt1btn = new ButtonBuilder()
  .setCustomId("Funeral for 10th")
  .setLabel("Funeral of 10th Edition")
  .setStyle(ButtonStyle.Primary);

const evnt2btn = new ButtonBuilder()
  .setCustomId("Twinswords fluffy")
  .setLabel("Twin Swords Fluffy 2026")
  .setStyle(ButtonStyle.Primary);

// const evnt3btn = new ButtonBuilder()
//   .setCustomId("Glasvegas")
//   .setLabel("Glasvegas Summer Series 2025")
//   .setStyle(ButtonStyle.Primary);

const buttonRow = new ActionRowBuilder().addComponents(evnt1btn);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("events")
    .setDescription("Funeral of 10th Edition"),
  async execute(interaction) {
    const response = await interaction.reply({
      embeds: [baseEmbed],
      files: [funeralImage],
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

      if (confirmation.customId === "Funeral for 10th") {
        await confirmation.update({
          embeds: [funeralEmbed],
          files: [funeralPack],
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
