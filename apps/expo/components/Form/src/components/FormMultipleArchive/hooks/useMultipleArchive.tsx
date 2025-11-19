import { DocumentPickerAsset } from 'expo-document-picker'
import * as MediaLibrary from 'expo-media-library'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { TypeEventOnChange } from '../@types/event'
import { TypeFiles } from '../enum/TypeFiles'

type FileContextType = {
  openImageCropModal: boolean
  files?: DocumentPickerAsset[] | null
  handleSaveFiles(newFiles: DocumentPickerAsset[]): void
  handleRemoveFile(hashToRemove: string): void
  accept?: (keyof typeof TypeFiles)[]
  dragAndDrop?: boolean
}

const FileContext = createContext<FileContextType>({} as FileContextType)

export type FileInputProviderProps<TypeEventOnChangeGeneric extends TypeEventOnChange = TypeEventOnChange> = {
  children: ReactNode
  accept?: (keyof typeof TypeFiles)[]
  onChange(event: TypeEventOnChangeGeneric): void
}

export function FileInputProvider({ children, accept, onChange }: FileInputProviderProps) {
  const [files, setFiles] = useState<DocumentPickerAsset[] | null>(null)
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions({
    granularPermissions: ['photo']
  })
  const [openImageCropModal, setOpenImageCropModal] = useState(false)

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission()
    }
  }, [permissionResponse, requestPermission])

  useEffect(() => {
    setFiles(null)
    setOpenImageCropModal(false)
  }, [accept])

  function handleSaveFiles(newFiles: DocumentPickerAsset[]) {
    const newFilesList = newFiles.map(file => ({
      file,
      hash: `${file.name}-${file.size}`
    }))

    const filesList = (files || []).map(file => ({
      file,
      hash: `${file.name}-${file.size}`
    }))

    const permittedFiles = [...newFilesList, ...filesList]

    const uniqueFiles = Array.from(new Set(permittedFiles.map(file => file.hash))).map(
      hash => permittedFiles.find(file => file.hash === hash) as { file: DocumentPickerAsset; hash: string }
    )

    const uniquePermittedFiles = uniqueFiles.filter(item => newFilesList.some(newItem => newItem.hash === item.hash))

    if (!uniquePermittedFiles.length) {
      return
    }

    const uniqueFileObjects = uniqueFiles.map(item => item.file)

    setFiles(uniqueFileObjects)

    onChange?.({
      value: uniquePermittedFiles.map(item => item.file),
      event: 'ADD_FILES'
    })
  }

  function handleRemoveFile(hashToRemove: string) {
    if (!files) return

    const filteredFiles = files.filter(file => `${file.name}-${file.size}` !== hashToRemove)

    setFiles(filteredFiles)

    onChange?.({
      value: files.find(file => `${file.name}-${file.size}` === hashToRemove) as DocumentPickerAsset,
      event: 'REMOVE_FILE'
    })
  }

  return (
    <FileContext.Provider
      value={{
        openImageCropModal,
        files,
        handleSaveFiles,
        accept,
        handleRemoveFile
      }}
    >
      {children}
    </FileContext.Provider>
  )
}

export function useFileInput() {
  const context = useContext(FileContext)
  if (!context) {
    throw new Error('useFile must be used within a FileProvider')
  }
  return context
}
