export const utils = {
  getHashFile(file: File): string {
    return `${file.name}-${file.size}`;
  },
};
