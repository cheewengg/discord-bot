"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuild = exports.getUser = exports.getJSFiles = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const db_1 = require("../db");
const getJSFiles = (filePath) => {
    if (filePath.endsWith(".js"))
        return [filePath];
    if (!node_fs_1.default.lstatSync(filePath).isDirectory())
        return [];
    const filePaths = [];
    for (const file of node_fs_1.default.readdirSync(filePath)) {
        const absPath = filePath + "/" + file;
        filePaths.push(...(0, exports.getJSFiles)(absPath));
    }
    return filePaths;
};
exports.getJSFiles = getJSFiles;
const getUser = (discordUrl) => {
    // KIV API call
    return db_1.users.find((user) => user.discordUrl === discordUrl);
};
exports.getUser = getUser;
const getGuild = (guildId) => {
    if (guildId == undefined)
        return;
    // KIV API call
    return db_1.guilds.find((guild) => guild.id === guildId);
};
exports.getGuild = getGuild;
