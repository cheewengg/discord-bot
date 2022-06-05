import fs from "node:fs";
import { users, guilds } from "../db";

export const getJSFiles = (filePath: string): string[] => {
  if (filePath.endsWith(".js")) return [filePath];
  if (!fs.lstatSync(filePath).isDirectory()) return [];

  const filePaths = [];

  for (const file of fs.readdirSync(filePath)) {
    const absPath = filePath + "/" + file;
    filePaths.push(...getJSFiles(absPath));
  }

  return filePaths;
};

export const getUser = (discordUrl: string) => {
  // KIV API call
  return users.find((user) => user.discordUrl === discordUrl);
};

export const getGuild = (guildId: number | null | undefined) => {
  if (guildId == undefined) return;
  // KIV API call
  return guilds.find((guild) => guild.id === guildId);
};
