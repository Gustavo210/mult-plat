import { TypeFiles } from "../enum/TypeFiles";

export const utils = {
  convertBytesToReadableFormat(rawBytes: number): string {
    const kilobyte = 1024;
    const megabyte = 1024 * 1024;
    const gigabyte = 1024 * 1024 * 1024;
    if (rawBytes >= gigabyte) {
      const valueInGigabytes = rawBytes / gigabyte;
      return valueInGigabytes.toFixed(2) + " GB";
    } else if (rawBytes >= megabyte) {
      const valueInMegabytes = rawBytes / megabyte;
      return valueInMegabytes.toFixed(2) + " MB";
    } else if (rawBytes >= kilobyte) {
      const valueInKilobytes = rawBytes / kilobyte;
      return valueInKilobytes.toFixed(2) + " KB";
    } else {
      return rawBytes + " B";
    }
  },
  parseAcceptString(
    accept: (keyof typeof TypeFiles)[] | string | undefined
  ): (keyof typeof TypeFiles)[] {
    if (!accept) {
      return ["all"] as (keyof typeof TypeFiles)[];
    }

    const separators = ["|", ",", ";", " ", "\n", "\t", "\r"];

    if (typeof accept === "string") {
      return accept
        .split(new RegExp(separators.map((s) => `\\${s}`).join("|")))
        .map((item) => item.trim().replace(".", ""))
        .filter((item) => item.length > 0) as (keyof typeof TypeFiles)[];
    }

    return accept;
  },
  getHashFile(file: File): string {
    return `${file.name}-${file.size}`;
  },
};
