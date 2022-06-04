"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const util_1 = require("./util");
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
exports.commands = new discord_js_1.Collection();
const commandsPath = node_path_1.default.join(__dirname, "commands");
const commandFiles = (0, util_1.getJSFiles)(commandsPath);
for (const filePath of commandFiles) {
    const command = require(filePath).default;
    exports.commands.set(command.data.name, command);
}
const eventsPath = node_path_1.default.join(__dirname, "events");
const eventFiles = node_fs_1.default
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
    const filePath = node_path_1.default.join(eventsPath, file);
    const event = require(filePath).default;
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
client.login(process.env.TOKEN);
