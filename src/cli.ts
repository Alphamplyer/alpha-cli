#!/usr/bin/env node

import { Command } from "commander";
import { moveFilesToRootDirectory } from "./commands/move-files-to-root-directory/move-files-to-root-directory.js";
import { renameAnimeFiles } from "./commands/rename-anime-files/rename-anime-files.js";
import { isExists } from "./helpers/files-helper.js";
import chalk from "chalk";

const program = new Command();
program
  .name("alpha-cli")
  .description("A CLI containing custom commands that Alphamplyer uses.")
  .version("0.0.1");

program.command("mvfiles2root")
  .description("Move all files contained in sub-directories to the given root directory. If no root directory is given, the current directory is used.")
  .option("-d, --debug", "Print logs to the console.")
  .option("-r, --root <path>", "The root directory to move the files to.")
  .option("-t, --file-type <type>", "The type of the files to move.")
  .option("-n, --max-recursion-levels <number>", "The number of levels to recurse into the sub-directories.")
  .action(async (options) => {
    if (options.root && !await isExists(options.root)) {
      console.log(chalk.red(`Error: the root directory ${options.root} doesn't exist.`));
      return;
    }

    if (options.maxRecursionLevels && options.maxRecursionLevels < 0) {
      console.log(chalk.red(`Error: the max recursion levels must be a positive number.`));
      return;
    }

    moveFilesToRootDirectory({
      debug: options.debug || false,
      rootPath: options.root || process.cwd(),
      fileType: options.fileType || null,
      maxRecursionLevels: options.maxRecursionLevels || null
    });
  });

program.command("rnanimefiles")
  .description("Rename anime files to a more readable format.")
  .option("-d, --debug", "Print logs to the console.")
  .option("-t, --file-type <type>", "The type of the files to rename.")
  .option("-o, --offset <number>", "The offset to add to the episode number.")
  .option("--dsp, --disable-season-formating", "Disable the season preformating.")
  .option("--drp, --disable-resolution-preformating", "Disable the resolution preformating.")
  .option("--dcp, --disable-codec-preformating", "Disable the codec preformating.")
  .option("--dsbp, --disable-square-brackets-preformating", "Disable the square brackets preformating.")
  .action(async (options) => {
    if (options.offset && options.offset < 0) {
      console.log(chalk.red(`Error: the offset must be a positive number.`));
      return;
    }

    renameAnimeFiles({
      debug: options.debug || false,
      fileType: options.fileType || null,
      offset: options.offset || 0,
      preformatingOptions: {
        debug: options.debug || false,
        isSeasonFormatingIsDisabled: options.disableSeasonFormating || false,
        isResolutionFormatingIsDisabled: options.disableResolutionPreformating || false,
        isCodecFormatingIsDisabled: options.disableCodecPreformating || false,
        isSquareBracketsFormatingIsDisabled: options.disableSquareBracketsPreformating || false
      }
    });
  });

program.parse();