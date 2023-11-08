import { existsSync, renameSync } from "fs";
import { searchFiles } from "../../utils.js";
import { SearchNumberSimpleAlgorithm } from "./search-episode-number-algorithms/search-number-simple-algorithm.js";
import { SearchNumberWithEPrefixAlgorithms } from "./search-episode-number-algorithms/search-number-with-prefix-algorithm.js";
import { SearchNumberAlgorithm } from "./search-episode-number-algorithms/search-number-algorithm.js";
import { FormatingAlgorithm } from "./formating-algorithms/formating-algorithms.js";
import { RemoveCodec } from "./formating-algorithms/remove-codec.js";
import { RemoveSeasonNumber } from "./formating-algorithms/remove-season-number.js";

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

const renameAnimeFile = (filePath: string, fileType: string) => {
  const fileName = filePath.split("/").pop();
  if (fileName === undefined) {
    console.log(`Error - file name not found in path: ${filePath}. Skiping...`);
    return;
  }

  const episodeNumber = searchEpisodeNumber(fileName);
  if (!episodeNumber) {
    console.log(`Episode number not found in file: ${fileName}. Skiping...`);
    return;
  }
  const newFileName = `Épisode ${episodeNumber}.${fileType}`;
  const newPath = filePath.replace(fileName, newFileName);
  if (existsSync(newPath)) {
    console.log(`File already exists: ${newPath}. Skiping...`);
    return;
  }
  renameSync(filePath, newPath);
  console.log(`Renamed successfully: ${fileName} -> ${newFileName}`);
};

export default function renameAnimeFiles() {
  const args = process.argv.slice(3);
  let fileType = args[0] || null;
  const dirPath = args[1] || process.cwd();

  if (!fileType) {
    console.log("Error - file type is missing. Please provide file type.");
    return;
  }

  if (fileType[0] === ".") {
    fileType = fileType.substring(1);
  }

  const animeFilePaths = searchFiles(dirPath, fileType, false);

  for (const path of animeFilePaths) {
    renameAnimeFile(path, fileType);
  }
}
