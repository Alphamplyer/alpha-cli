import { rename } from "fs/promises";
import { parse, resolve } from "path";
import chalk from "chalk";
import { DefaultCommandOptions } from "../../base/default-command-options.js";
import { isExists, searchFiles } from "../../helpers/files-helper.js";

export interface MoveFilesToRootDirectoryOptions extends DefaultCommandOptions {
  rootPath: string;
  fileType: string;
  maxRecursionLevels: number;
}

export async function moveFilesToRootDirectory(options: MoveFilesToRootDirectoryOptions) {
  console.log(`${chalk.bold.gray('Moving files to root directory')}`);

  for await (const filePath of searchFiles({
    debug: options.debug,
    dirPath: options.rootPath,
    fileType: options.fileType,
    recursionLevels: options.maxRecursionLevels
  })) {
    if (options.debug) {
      console.log(`  \u2192 ${chalk.yellow('File founded')} at ${chalk.cyan('"' + filePath + '"')}`);
    }

    await moveFileToDirectoryRoot({
      debug: options.debug,
      filePath: filePath,
      rootPath: options.rootPath
    });
  }

  console.log(chalk.green(`\nProcess finished.\n`));
}

interface MoveFileToDirectoryRootOptions extends DefaultCommandOptions {
  filePath: string;
  rootPath: string;
}

async function moveFileToDirectoryRoot(options: MoveFileToDirectoryRootOptions) {
  const fileName = parse(options.filePath).base;
  const newPath = resolve(options.rootPath, fileName);

  if (options.filePath === newPath) {
    console.log(`${options.debug ? "    \u2192" : ""} ${chalk.red('Skiping')} The file ${chalk.cyan('"' + fileName + '"')} is already in the root directory.`);
    return;
  }

  if (options.debug) {
    console.log(`    \u2192 ${chalk.yellow("Moving file")} :`);
    console.log(`        FROM ${chalk.cyan('"' + options.filePath + '"')}`);
    console.log(`        TO   ${chalk.cyan('"' + newPath + '"')}`);
  }
  
  if (await isExists(newPath)) {
    console.log(`${options.debug ? "    \u2192" : ""} ${chalk.red('Skiping')} The file ${chalk.cyan('"' + fileName + '"')} already exists in the root directory.`);
    return;
  }

  await rename(options.filePath, newPath);
  console.log(`${options.debug ? "    \u2192" : ""} ${chalk.green('Successfully moved')} ${chalk.cyan('"' + fileName + '"')} to the root directory.`);
}