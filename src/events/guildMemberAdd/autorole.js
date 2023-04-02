const { Events } = require("discord.js");
const fs = require("fs");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {
    const role = await db.get(`autorole_${member.guild.id}`);
    const giveRole = await member.guild.roles.cache.get(role);

    if (!role || !giveRole) return;

    member.roles.add(giveRole);
  },
};
