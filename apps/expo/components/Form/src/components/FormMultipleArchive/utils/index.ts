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
};
