import { DocumentPickerAsset } from 'expo-document-picker'

export type EventOnChangeAddFiles = {
  value: DocumentPickerAsset[]
  event: 'ADD_FILES'
}

export type EventOnChangeRemoveFile = {
  value: DocumentPickerAsset
  event: 'REMOVE_FILE'
}

export type TypeEventOnChange = EventOnChangeAddFiles | EventOnChangeRemoveFile
