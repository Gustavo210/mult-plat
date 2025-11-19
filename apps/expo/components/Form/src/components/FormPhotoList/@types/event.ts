import { ImagePickerAsset } from "expo-image-picker";

export type EventOnChangeRemoveImage = {
  value: ImagePickerAsset;
  event: "REMOVE_IMAGE";
};

export type EventOnChangeReorderImages = {
  value: ImagePickerAsset[];
  event: "REORDER_IMAGES";
};

export type EventOnChangeCropSave = {
  value: ImagePickerAsset;
  event: "CROP_SAVE";
};
export type TypeEventOnChange =
  | EventOnChangeRemoveImage
  | EventOnChangeReorderImages
  | EventOnChangeCropSave;
