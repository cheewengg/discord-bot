import fs from "node:fs";

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
