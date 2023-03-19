const { ActivityType } = require("discord.js");

const status = [{ name: "New Life", type: ActivityType.Playing }];

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} est en ligne`);
    setInterval(() => {
      let random = Math.floor(Math.random() * status.length);
      client.user.setActivity(status[random]);
    }, 10000);
  },
};
