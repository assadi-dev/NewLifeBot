const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-autorole")
    .setDescription(
      "Definir le rôle qui sera attribué automatiquement aux personnes qui rejoins le serveur"
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription(
          "Selectionner le rôle que vous souhaitez attribuer aux nouveau arrivants"
        )
        .setRequired(true)
    ),
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

    const role = interaction.options.getRole("role");

    console.log("guild_id", interaction.guild.id);

    await db.set(`autorole_${interaction.guild.id}`, role.id);

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setDescription(
        `:white_check_mark: Vous avez defini le rôle ${role} par defaut ce rôle sera assigné aux nouveaux venue`
      );

    return await interaction.reply({ embeds: [embed] });
  },
};
