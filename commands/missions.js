const response = require("../assets/missions.json");

const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  MessageFlags,
} = require("discord.js");

const eventDetails = response[0];
const roundsDetails = response[1].rounds;
const missionLength = roundsDetails.length;

const buttonCollection = roundsDetails.map((round, i) => {
  return new ButtonBuilder()
    .setCustomId(`round ${i + 1}`)
    .setLabel(` Round ${round.round}`)
    .setStyle(ButtonStyle.Primary);
});

const missionCollection = roundsDetails.map((round, i) => {
  return new EmbedBuilder()
    .setTitle(round.title)
    .setDescription(round.missionDescription)
    .setColor("Red")
    .setImage(round.image)
    .addFields({
      name: "Deployment Map",
      value: round.fields["Deployment Map"],
    });
});

const twinswordsPic = new AttachmentBuilder("assets/twinswordsImage.png");

//example button in isolation if needed
// const r1btn = new ButtonBuilder()
//   .setCustomId("round 1")
//   .setLabel("Round 1")
//   .setStyle(ButtonStyle.Primary);

const buttonRow = new ActionRowBuilder().addComponents(...buttonCollection);

const baseEmbed = new EmbedBuilder()
  .setTitle(eventDetails.eventDetails.eventTitle)
  .setDescription("MISSIONS")
  .setImage(eventDetails.eventDetails.image)
  .setColor("Red")
  .addFields(
    { name: "Rules Format", value: eventDetails.eventDetails.rulesFormat },
    {
      name: "Rules Format Link",
      value: eventDetails.eventDetails.rulesFormatLink,
    },
    {
      name: "Select a round",
      value: `Select round 1-${missionLength}`,
    },
  );

module.exports = {
  data: new SlashCommandBuilder()
    .setName("missions")
    .setDescription("View Missions"),
  async execute(interaction) {
    const response = await interaction.reply({
      embeds: [baseEmbed],
      files: [twinswordsPic],
      components: [buttonRow],
      flags: MessageFlags.Ephemeral,
      withResponse: true,
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;
    try {
      const confirmation =
        await response.resource.message.awaitMessageComponent({
          filter: collectorFilter,
          time: 60_000,
        });

      if (confirmation.customId === "round 1") {
        await confirmation.update({
          embeds: [missionCollection[0]],
          files: [],
          components: [],
        });
      } else if (confirmation.customId === "round 2") {
        await confirmation.update({
          embeds: [missionCollection[1]],
          files: [],
          components: [],
        });
      } else if (confirmation.customId === "round 3") {
        await confirmation.update({
          embeds: [missionCollection[2]],
          files: [],
          components: [],
        });
      } else if (confirmation.customId === "round 4") {
        await confirmation.update({
          embeds: [missionCollection[3]],
          files: [],
          components: [],
        });
      } else if (confirmation.customId === "round 5") {
        await confirmation.update({
          embeds: [missionCollection[4]],
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

// files: [coclogo, celticCupLogo]
