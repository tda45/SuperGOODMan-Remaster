const { parseArgs } = require("../utils/parseArgs");

const tickets = new Map();

module.exports.openTicket = async (message) => {
  const userId = message.author.id;

  if (tickets.has(userId)) {
    return message.reply("🎫 Zaten açık bir ticket’in var!");
  }

  const args = parseArgs(message.content);

  const isPrivate = args.private !== "no"; // default: private

  const channelName = args.name
    ? `ticket-${args.name.toLowerCase().replace(/ /g, "-")}`
    : `ticket-${message.author.username}`;

  const permissionOverwrites = [
    {
      id: message.guild.id,
      deny: ["ViewChannel"]
    },
    {
      id: message.author.id,
      allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"]
    }
  ];

  // public ticket ise herkes görebilir
  if (!isPrivate) {
    permissionOverwrites[0] = {
      id: message.guild.id,
      allow: ["ViewChannel"]
    };
  }

  const channel = await message.guild.channels.create({
    name: channelName,
    type: 0,
    permissionOverwrites
  });

  tickets.set(userId, channel.id);

  message.reply(`🎫 Ticket açıldı: ${channel}`);
};

module.exports.closeTicket = async (message) => {
  const userId = message.author.id;

  const channelId = tickets.get(userId);

  if (!channelId) {
    return message.reply("❌ Açık ticket bulamadım.");
  }

  const channel = message.guild.channels.cache.get(channelId);

  if (channel) {
    await channel.delete();
  }

  tickets.delete(userId);

  message.reply("🗑️ Ticket kapatıldı.");
};