import { existsSync, renameSync } from "fs";
import { searchFiles } from "../utils.js";

const moveFiles = (filePaths: string[], dirPath: string) => {
  for (const path of filePaths) {
    const fileName = path.split("/").pop();
    const newPath = `${dirPath}/${fileName}`;
    if (existsSync(newPath)) {
      console.log(`File already exists: ${newPath}. Skiping...`);
      continue;
    }
    renameSync(path, newPath);
    console.log(`Moved successfully: ${path} -> ${newPath}`);
  }
};

export default function moveFilesAt() {
  const args = process.argv.slice(3);
  const fileType = args[0] || null;

  if (!fileType) {
    console.log("Error - file type is missing. Please provide file type.");
    return;
  }

  const dirPath = args[1] || process.cwd();

  const foundedFilePaths = searchFiles(dirPath, fileType);
  console.log(`Founded ${foundedFilePaths.length} files.`);
  moveFiles(foundedFilePaths, dirPath);
}
