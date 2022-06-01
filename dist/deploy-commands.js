"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;
const token = process.env.TOKEN;
const commands = [];
const commandsPath = node_path_1.default.join(__dirname, "commands");
const commandFiles = node_fs_1.default
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const filePath = node_path_1.default.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}
const rest = new rest_1.REST({ version: "9" }).setToken(token);
rest
    .put(v9_1.Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
