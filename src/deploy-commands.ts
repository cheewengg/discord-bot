import path from "node:path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";
import { getJSFiles } from "./util/method";
dotenv.config();

const clientId = process.env.CLIENT_ID!;
const guildId = process.env.GUILD_ID!;
const token = process.env.TOKEN_ID!;

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = getJSFiles(commandsPath);

for (const filePath of commandFiles) {
  const command = require(filePath).default;
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
