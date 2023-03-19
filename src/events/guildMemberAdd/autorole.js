const { Events } = require("discord.js");
const fs = require("fs");
const DATA = require("../../data/autoRole");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {
    // console.log(`${member.user.id} vient d'arrivé`);
    const role = await db.get(`autorole_${member.guild.id}`);
    const giveRole = await member.guild.roles.cache.get(role);

    member.roles.add(giveRole);
  },
};
