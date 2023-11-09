import { rename } from "fs/promises";
import { SearchNumberSimpleAlgorithm } from "./search-episode-number-algorithms/search-number-simple-algorithm.js";
import { SearchNumberWithEPrefixAlgorithms } from "./search-episode-number-algorithms/search-number-with-prefix-algorithm.js";
import { SearchNumberAlgorithm } from "./search-episode-number-algorithms/search-number-algorithm.js";
import { FormatingAlgorithm } from "./formating-algorithms/formating-algorithms.js";
import { RemoveCodec } from "./formating-algorithms/remove-codec.js";
import { RemoveSeasonNumber } from "./formating-algorithms/remove-season-number.js";
import { DefaultCommandOptions } from "../../base/default-command-options.js";
import { isExists, searchFiles } from "../../helpers/files-helper.js";
import { parse } from "path";
import chalk from "chalk";


export interface RenameAnimeFilesOptions extends DefaultCommandOptions {
  fileType: string;
  offset: number;
}

export async function renameAnimeFiles(options: RenameAnimeFilesOptions) {
  console.log(chalk.gray(`Renaming anime files...`));

  for await (const path of searchFiles({
    debug: options.debug,
    dirPath: process.cwd(),
    fileType: options.fileType,
    recursionLevels: 0
  })) {
    if (options.debug) {
      console.log(`  \u2192 ${chalk.yellow('File founded')} at ${chalk.cyan('"' + path + '"')}`);
    }

    await renameAnimeFile({
      debug: options.debug,
      filePath: path, 
      fileType: options.fileType, 
      offset: 0
    });
  }

  console.log(chalk.green(`\nProcess finished.\n`));
}

const formatingAlgorithms : FormatingAlgorithm[] = [
  new RemoveCodec(),
  new RemoveSeasonNumber(),
];
  

const searchAlgorithms : SearchNumberAlgorithm[] = [
  new SearchNumberSimpleAlgorithm(),
  new SearchNumberWithEPrefixAlgorithms({ prefix: 'E' }),
  new SearchNumberSimpleAlgorithm({ shouldSearchWithSpaces: false }),
];

const searchEpisodeNumber = (fileName: string): number | null => {
  fileName = formatFileName(fileName);
  for (const searchAlgorithm of searchAlgorithms) {
    const episodeNumber = searchAlgorithm.searchEpisodeNumber(fileName);
    if (episodeNumber) {
      return episodeNumber;
    }
  }
  return null;
};

const formatFileName = (fileName: string): string => {
  let formattedFileName = fileName;
  for (const formatingAlgorithm of formatingAlgorithms) {
    formattedFileName = formatingAlgorithm.apply(formattedFileName);
  }
  return formattedFileName;
}

export interface RenameAnimeFileOptions extends DefaultCommandOptions {
  filePath: string;
  fileType: string;
  offset: number;
}

async function renameAnimeFile (options: RenameAnimeFileOptions) {
  const path = parse(options.filePath);
  const fileName = path.base;
  const fileType = path.ext.substring(1);

  if (fileName.startsWith('Épisode')) {
    console.log(`${options.debug ? "    \u2192" : ""} ${chalk.red('Skiping')} Episode was already renamed`);
    return;
  }

  const episodeNumber = searchEpisodeNumber(fileName);
  if (!episodeNumber) {
    console.log(`${options.debug ? "    \u2192" : ""} ${chalk.red('Skiping')} Episode number not found in file name : ${chalk.cyan('"' + fileName + '"')}`);
    return;
  }

  const newFileName = `Épisode ${(episodeNumber + options.offset)}.${fileType}`;

  const newPath = options.filePath.replace(fileName, newFileName);
  if (await isExists(newPath)) {
    console.log(`${options.debug ? "    \u2192" : ""} ${chalk.red('Skiping')} The file ${chalk.cyan('"' + fileName + '"')} already exists in the directory.`);
    return;
  }

  await rename(options.filePath, newPath);
  console.log(`${options.debug ? "    \u2192" : ""} ${chalk.green('Successfully renamed')} file ${chalk.cyan('"' + fileName + '"')} \u2192 ${chalk.cyan('"' + fileName + '"')}`);
  console.log(`${options.debug ? "        FROM" : "  FROM"} ${chalk.cyan('"' + fileName + '"')})`);
  console.log(`${options.debug ? "        TO" : "  TO"} ${chalk.cyan('"' + newFileName + '"')})`);
}
