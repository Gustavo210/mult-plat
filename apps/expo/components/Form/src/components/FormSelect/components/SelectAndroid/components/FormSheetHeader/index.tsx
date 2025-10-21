import { GestureDetector, PanGesture } from 'react-native-gesture-handler'

import { Container } from '@mobilestock-native/container'

import { DragIndicator } from '../DragIndicator'
import { Placeholder } from '../Placeholder'

export function FormSheetHeader({ placeholder, panGesture }: { placeholder: string; panGesture?: PanGesture }) {
  if (panGesture) {
    return (
      <GestureDetector gesture={panGesture}>
        <Container.Vertical padding="XS" testID="form-sheet-header-with-gesture">
          <Container.Horizontal align="CENTER">
            <DragIndicator />
          </Container.Horizontal>
          <Container.Horizontal>
            <Placeholder>{placeholder}</Placeholder>
          </Container.Horizontal>
        </Container.Vertical>
      </GestureDetector>
    )
  }
  return (
    <Container.Vertical padding="XS" testID="form-sheet-header-without-gesture">
      <Container.Horizontal>
        <Placeholder>{placeholder}</Placeholder>
      </Container.Horizontal>
    </Container.Vertical>
  )
}
