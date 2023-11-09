import chalk from "chalk";
import { DefaultCommandOptions } from "../base/default-command-options.js";
import { resolve } from "node:path";
import { readdir, stat } from "node:fs/promises";

interface SearchFilesOptions extends DefaultCommandOptions {
  dirPath: string;
  fileType: string | null;
  recursionLevels: number | null;
}

export async function* searchFiles(options: SearchFilesOptions): AsyncGenerator<string> {
  const { dirPath, fileType, recursionLevels } = options;
  
  if (options.debug) {
    console.log(`\n${chalk.bold.yellowBright('Searching files')} in ${chalk.cyan('"' + dirPath) + '"'}`);
    console.log(`Recursion levels: ${chalk.cyanBright(recursionLevels)}, File type: ${chalk.cyanBright(fileType)}`);
  }

  const fileNames = await readdir(dirPath);

  for (const fileName of fileNames) {
    const filePath = resolve(dirPath, fileName);

    if ((await stat(filePath)).isDirectory()) {
      if (recursionLevels === null || recursionLevels > 0) {
        yield* searchFiles({
          debug: options.debug,
          dirPath: filePath,
          fileType,
          recursionLevels: recursionLevels ? recursionLevels - 1 : null
        });
      }
    } else {
      if (fileType === null || filePath.endsWith(fileType)) {
        yield filePath;
      }
    }
  }
}

export async function isExists(filePath: string): Promise<boolean> {
  return !!(await stat(filePath).catch(() => false));
}