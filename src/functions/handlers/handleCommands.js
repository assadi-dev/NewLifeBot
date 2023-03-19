const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { GUILD_ID, APPLICATION_ID, TOKEN } = require("../../../config");

module.exports = (client) => {
  const { commands, commandArray } = client;
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST({ version: "9" }).setToken(TOKEN);
    try {
      console.log("Started refreshingg application (/) commands.");
      await rest.put(
        Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID),
        {
          body: commandArray,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
};
