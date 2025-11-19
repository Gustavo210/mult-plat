import * as DocumentPicker from 'expo-document-picker'

import { Button } from '@mobilestock-native/button'

import { TypeFiles } from '../../enum/TypeFiles'
import { useFileInput } from '../../hooks/useMultipleArchive'

export function HelpButton() {
  const FileInput = useFileInput()

  async function handleSelectFile() {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      copyToCacheDirectory: true,
      type: FileInput.accept?.map(type => TypeFiles[type]) as unknown as string
    })

    if (!result.assets) {
      return
    }

    const files = result.assets

    if (!files) {
      return
    }

    FileInput.handleSaveFiles(files)
  }

  return <Button text="Selecionar arquivo" size="XS" onPress={handleSelectFile} />
}
