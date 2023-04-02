const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`remove-leave`)
    .setDescription("Désactiver le message de départ"),
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

    const channelID = await db.get(`leave_${interaction.guild.id}`);
    if (channelID) {
      await db.delete(`leave_${interaction.guild.id}`);
      const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(
          `:white_check_mark: Vous avez desactivé le message de départ`
        );

      await interaction.reply({ embeds: [embed] });
    } else {
      const embedAlert = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(
          `:white_check_mark: Vous avez déjà desactivé le message de départ`
        );
      await interaction.reply({ embeds: [embedAlert] });
    }
  },
};
