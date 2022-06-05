import fs from "node:fs";
import path from "node:path";
import { Client, Collection, Intents, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import dotenv from "dotenv";
import { getJSFiles } from "./util/method";
dotenv.config();

interface Command {
  data: SlashCommandBuilder;
  execute(interaction: CommandInteraction): void;
}

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

export const commands = new Collection<string, Command>();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = getJSFiles(commandsPath);

for (const filePath of commandFiles) {
  const command = require(filePath).default;
  commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath).default;

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.TOKEN_ID);
