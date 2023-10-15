#!/usr/bin/env node

import moveFilesAt from "./commands/move-file-at";
import renameAnimeFiles from "./commands/rename-anime-files";

const command: string = process.argv[2];

console.log(`Running command ${command}...\n`);

switch (command) {
  case "mfa":
    moveFilesAt();
    break;
  case "raf":
    renameAnimeFiles();
    break;
  default:
    console.log("Error - command not found.");
    break;
}
