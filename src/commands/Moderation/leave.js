const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`set-leave`)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(` Le message sera envoyé sur ce channel`)
        .setRequired(true)
    )
    .setDescription("Activer le message de départ sur le serveur"),
  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply({
        content: "Vous n'avez pas la permission d'effectué cette commande",
        ephemeral: true,
      });

    const channel = interaction.options.getChannel("channel");

    await db.set(`leave_${interaction.guild.id}`, channel.id);

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setDescription(
        `:white_check_mark: Vous avez defini le channel${channel} pour affiché les messages de départ`
      );

    return await interaction.reply({ embeds: [embed] });
  },
};
