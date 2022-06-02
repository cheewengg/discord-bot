"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const dotenv_1 = __importDefault(require("dotenv"));
const util_1 = require("./util");
dotenv_1.default.config();
const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;
const token = process.env.TOKEN;
const commands = [];
const commandsPath = node_path_1.default.join(__dirname, "commands");
const commandFiles = (0, util_1.getJSFiles)(commandsPath);
for (const filePath of commandFiles) {
    const command = require(filePath).default;
    commands.push(command.data.toJSON());
}
const rest = new rest_1.REST({ version: "9" }).setToken(token);
rest
    .put(v9_1.Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
