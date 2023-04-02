const { Events } = require("discord.js");
const fs = require("fs");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: Events.GuildMemberRemove,
  once: false,
  async execute(member) {
    const channelID = await db.get(`leave_${member.guild.id}`);
    const text = `**${member}**  a quitté le discord`;
    const channel = member.guild.channels.cache.get(channelID);

    if (!channelID || !channel) return;
    channel.send(text);
  },
};
