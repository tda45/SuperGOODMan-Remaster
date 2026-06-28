const fs = require("fs-extra");

console.log("🚀 SuperGOODMan PRO setup başlıyor...");

// 📁 Klasörler (senin mimari)
const folders = [
  "src",
  "src/commands/moderation",
  "src/commands/fun",
  "src/commands/system",
  "src/events",
  "src/handlers",
  "src/utils"
];

// 📁 klasör oluştur
folders.forEach(folder => {
  fs.ensureDirSync(folder);
  console.log("✔ klasör:", folder);
});

// 🤖 index.ts
fs.outputFileSync("src/index.ts", `
require("dotenv").config();
const { client } = require("./client");
const { handleEvents } = require("./handlers/eventHandler");

handleEvents(client);

client.login(process.env.TOKEN);
`);

// 🤖 client.ts
fs.outputFileSync("src/client.ts", `
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

module.exports = { client };
`);

// 📡 event handler
fs.outputFileSync("src/handlers/eventHandler.js", `
module.exports.handleEvents = (client) => {
  client.once("ready", () => {
    console.log("🦸 SuperGOODMan ONLINE!");
  });

  client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    if (message.content === "!ping") {
      message.reply("🏓 Pong!");
    }
  });
};
`);

// ⚙️ .env
fs.outputFileSync(".env", `
TOKEN=BURAYA_TOKEN
PREFIX=!
`);

// ⚙️ tsconfig (şimdilik hazır şablon)
fs.outputFileSync("tsconfig.json", `
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  }
}
`);

// 📘 README
fs.outputFileSync("README.md", `
# 🦸 SuperGOODMan

Discord bot framework generated automatically 🚀
`);

console.log("🎉 PRO SETUP TAMAMLANDI!");