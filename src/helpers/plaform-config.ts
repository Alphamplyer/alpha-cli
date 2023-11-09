
export function getDirectoriesSepartorChar(): string {
  return process.platform === "win32" ? "\\" : "/";
}