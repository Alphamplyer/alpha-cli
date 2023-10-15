import { existsSync, renameSync } from "fs";
import { searchFiles } from "../utils.js";

const searchEpisodeNumber = (fileName: string): number | null => {
  const regex = /E(\d{2,3})/g;
  const regexMathes = fileName.match(regex);
  if (!regexMathes) return null;
  const episodeNumberStr = regexMathes[regexMathes.length - 1].substring(1);
  return parseInt(episodeNumberStr) || null;
};

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
