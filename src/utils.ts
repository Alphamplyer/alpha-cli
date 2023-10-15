import { readdirSync, lstatSync } from "fs";

export const searchFiles = (dirPath: string, fileType: string, searchRecurvely: boolean = true): string[] => {
  let filePaths: string[] = [];
  const filesInDir = readdirSync(dirPath);
  for (const file of filesInDir) {
    const path = `${dirPath}/${file}`;
    const isDirectory = lstatSync(path).isDirectory();
    if (isDirectory) {
      if (!searchRecurvely) continue;
      filePaths = [...filePaths, ...searchFiles(path, fileType)];
    } else {
      if (path.endsWith(fileType)) {
        filePaths.push(path);
      }
    }
  }
  return filePaths;
};