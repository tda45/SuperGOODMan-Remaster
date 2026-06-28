require("dotenv").config();

const client = require("./client");
const { handleEvents } = require("./handlers/eventHandler");

handleEvents(client);

client.login(process.env.TOKEN);