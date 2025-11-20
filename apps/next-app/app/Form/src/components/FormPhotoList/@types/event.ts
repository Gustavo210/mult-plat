export type EventOnChangeRemoveImage = {
  value: File;
  event: "REMOVE_IMAGE";
};

export type EventOnChangeReorderImages = {
  value: File[];
  event: "REORDER_IMAGES";
};

export type EventOnChangeCropSave = {
  value: File;
  event: "CROP_SAVE";
};
export type TypeEventOnChange =
  | EventOnChangeRemoveImage
  | EventOnChangeReorderImages
  | EventOnChangeCropSave;
