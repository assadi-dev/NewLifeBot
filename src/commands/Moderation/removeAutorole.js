const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`remove-autorole`)
    .setDescription("Désactiver le rôle automatique"),
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

    const channelID = await db.get(`autorole_${interaction.guild.id}`);
    if (channelID) {
      await db.delete(`autorole_${interaction.guild.id}`);
      const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(
          `:white_check_mark: Vous avez desactivé le rôle automatique`
        );

      await interaction.reply({ embeds: [embed] });
    } else {
      const embedAlert = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(
          `:white_check_mark: Vous avez déjà desactivé le rôle automatique`
        );
      await interaction.reply({ embeds: [embedAlert] });
    }
  },
};
