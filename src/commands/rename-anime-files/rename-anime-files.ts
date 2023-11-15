import { rename } from "fs/promises";
import { SearchNumberSimpleAlgorithm } from "./search-episode-number-algorithms/search-number-simple-algorithm.js";
import { SearchNumberWithEPrefixAlgorithms } from "./search-episode-number-algorithms/search-number-with-prefix-algorithm.js";
import { SearchNumberAlgorithm } from "./search-episode-number-algorithms/search-number-algorithm.js";
import { PreFormatingAlgorithm, PreformatingOptions } from "./preformating-algorithms/preformating-algorithms.js";
import { RemoveCodec } from "./preformating-algorithms/remove-codec.js";
import { RemoveSeasonNumber } from "./preformating-algorithms/remove-season-number.js";
import { DefaultCommandOptions } from "../../base/default-command-options.js";
import { isExists, searchFiles } from "../../helpers/files-helper.js";
import { parse } from "path";
import chalk from "chalk";
import { EpisodeNumber } from "../../entities/episode-number.js";
import { RemoveInSquareBracketsValue } from "./preformating-algorithms/remove-in-square-brackets-value.js";
import { RemoveResolution } from "./preformating-algorithms/remove-resolution.js";
import { LowerCase } from "./preformating-algorithms/lower-case.js";


export interface RenameAnimeFilesOptions extends DefaultCommandOptions {
  fileType: string;
  offset: number;
  preformatingOptions: PreformatingOptions;
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
      console.log(`  \u2192 ${chalk.yellow('File found')} at ${chalk.cyan('"' + path + '"')}`);
    }

    await renameAnimeFile({
      debug: options.debug,
      filePath: path, 
      fileType: options.fileType, 
      offset: 0,
      preformatingOptions: options.preformatingOptions
    });
  }

  console.log(chalk.green(`\nProcess finished.\n`));
}

const formatingAlgorithms : PreFormatingAlgorithm[] = [
  new LowerCase(),
  new RemoveInSquareBracketsValue(),
  new RemoveResolution(),
  new RemoveCodec(),
  new RemoveSeasonNumber(),
];
  

const searchAlgorithms : SearchNumberAlgorithm[] = [
  new SearchNumberWithEPrefixAlgorithms({ prefix: 'E' }),
  new SearchNumberSimpleAlgorithm(),
  new SearchNumberSimpleAlgorithm({ shouldSearchWithSpaces: false }),
];

const searchEpisodeNumber = (fileName: string, options: PreformatingOptions): EpisodeNumber | null => {
  const formatedFileName = preformatFileName(fileName, options);
  for (const searchAlgorithm of searchAlgorithms) {
    const episodeNumber = searchAlgorithm.searchEpisodeNumber(formatedFileName);
    if (episodeNumber) {
      return episodeNumber;
    }
  }

  return null;
};

const preformatFileName = (fileName: string, options: PreformatingOptions): string => {
  let formattedFileName = fileName;
  
  if (options.debug) {
    console.log(`    \u2192 ${chalk.gray('Preformating file :')} ${chalk.cyan('"' + formattedFileName + '"')}`);
  }

  for (const formatingAlgorithm of formatingAlgorithms) {
    formattedFileName = formatingAlgorithm.apply(formattedFileName, options);
  }

  if (options.debug) {
    console.log(`      \u2192 ${chalk.gray('File name after formatting :')} ${chalk.cyan('"' + formattedFileName + '"')}`);
  }

  return formattedFileName;
}

export interface RenameAnimeFileOptions extends DefaultCommandOptions {
  filePath: string;
  fileType: string;
  offset: number;
  preformatingOptions: PreformatingOptions;
}

async function renameAnimeFile (options: RenameAnimeFileOptions) {
  const path = parse(options.filePath);
  const fileName = path.base;
  const fileType = path.ext.substring(1);

  if (isAlreadyRenamed(fileName)) {
    console.log(`${options.debug ? "    \u2192" : ""} ${chalk.red('Skiping')} Episode was already renamed`);
    return;
  }

  const episodeNumber: EpisodeNumber | null = searchEpisodeNumber(fileName, options.preformatingOptions);
  if (!episodeNumber) {
    console.log(`${options.debug ? "    \u2192" : ""} ${chalk.red('Skiping')} Episode number not found in file name : ${chalk.cyan('"' + fileName + '"')}`);
    return;
  }

  episodeNumber.addOffset(options.offset);

  const newFileName = `Épisode ${episodeNumber.toString()}.${fileType}`;

  const newPath = options.filePath.replace(fileName, newFileName);
  if (await isExists(newPath)) {
    console.log(`${options.debug ? "    \u2192" : ""} ${chalk.red('Skiping')} The file ${chalk.cyan('"' + fileName + '"')} already exists in the directory.`);
    return;
  }

  await rename(options.filePath, newPath);
  console.log(`${options.debug ? "    \u2192" : ""} ${chalk.green('Successfully renamed')} file:`);
  console.log(`${options.debug ? "        FROM" : "  FROM"} ${chalk.cyan('"' + fileName + '"')}`);
  console.log(`${options.debug ? "        TO" : "  TO"} ${chalk.cyan('"' + newFileName + '"')}`);
}

const alreadyRenamedRegex = new RegExp(`Épisode \\d+\\.?\\d?`, 'i');

function isAlreadyRenamed(fileName: string) {
  return alreadyRenamedRegex.test(fileName);
}