export type EventOnChangeAddFiles = {
  value: File[];
  event: "ADD_FILES";
};

export type EventOnChangeRemoveFile = {
  value: File;
  event: "REMOVE_FILE";
};

export type TypeEventOnChange = EventOnChangeAddFiles | EventOnChangeRemoveFile;
