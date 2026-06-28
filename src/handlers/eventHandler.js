const ticketHandler = require("./ticketHandler");

module.exports.handleEvents = (client) => {

  client.once("clientReady", () => {
    console.log(`🦸 SuperGOODMan aktif: ${client.user.tag}`);
  });

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const prefix = process.env.PREFIX || "!";
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ticket") {
      await ticketHandler.openTicket(message);
    }

    if (cmd === "close") {
      await ticketHandler.closeTicket(message);
    }
  });
};