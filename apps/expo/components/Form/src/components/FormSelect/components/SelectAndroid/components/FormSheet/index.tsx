import { useMemo } from 'react'
import { Dimensions, Modal, TouchableWithoutFeedback } from 'react-native'
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { useTheme } from 'styled-components/native'

import { Container } from '@mobilestock-native/container'
import { List } from '@mobilestock-native/list'

import { CustomOption } from '../../../..'
import { FormSheetHeader } from '../FormSheetHeader'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MODAL_MAX_HEIGHT = SCREEN_HEIGHT * 0.8
const MODAL_MIN_HEIGHT = 200
const ITEM_HEIGHT = 45

export interface FormSheetProps {
  visible: boolean
  options: CustomOption[]
  placeholder: string
  onClose(): void
  onSelect(item: CustomOption | null): void
  selectValue: CustomOption | null
}
export function FormSheet(props: FormSheetProps) {
  const Theme = useTheme()
  const MIN_HEIGHT_AVAILABLE = useMemo(() => {
    return Math.min(MODAL_MAX_HEIGHT, props.options.length * ITEM_HEIGHT + ITEM_HEIGHT)
  }, [props.options])

  const MODAL_INITIAL_HEIGHT = Math.min(MODAL_MIN_HEIGHT, MIN_HEIGHT_AVAILABLE)

  const modalHeight = useSharedValue(MODAL_INITIAL_HEIGHT)
  const initialModalHeight = useSharedValue(MODAL_INITIAL_HEIGHT)

  const panGesture = Gesture.Pan()
    .onStart(() => {
      initialModalHeight.value = modalHeight.value
    })
    .onUpdate(event => {
      const newHeight = initialModalHeight.value - event.translationY
      modalHeight.value = Math.max(MODAL_MIN_HEIGHT, Math.min(newHeight, MIN_HEIGHT_AVAILABLE))
    })
    .onEnd(event => {
      if (event.velocityY < -1000) {
        modalHeight.value = withTiming(MIN_HEIGHT_AVAILABLE)
      } else if (modalHeight.value > MODAL_MAX_HEIGHT / 2) {
        modalHeight.value = withTiming(MODAL_MAX_HEIGHT)
      } else {
        modalHeight.value = withTiming(MODAL_MIN_HEIGHT)
      }
    })

  const animatedStyle = useAnimatedStyle(() => ({
    height: modalHeight.value,
    bottom: 0
  }))

  useAnimatedReaction(
    () => props.visible,
    modalVisible => {
      if (modalVisible) {
        modalHeight.value = withSpring(MODAL_INITIAL_HEIGHT, {
          damping: 20,
          stiffness: 90,
          mass: 0.3
        })
      }
    },
    [props.visible]
  )

  function close() {
    'worklet'
    modalHeight.value = withTiming(0, {}, () => {
      runOnJS(props.onClose)()
    })
  }

  function onPressListItem(item: CustomOption) {
    props.onSelect(item.value === props.selectValue?.value ? null : item)
    close()
  }
  return (
    <Modal visible={props.visible} transparent animationType="none" testID="modal">
      <GestureHandlerRootView>
        <TouchableWithoutFeedback onPress={close} testID="backdrop">
          <Container.Vertical full />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            animatedStyle,
            {
              position: 'absolute',
              width: '100%',
              backgroundColor: Theme.colors.container.default,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderWidth: 1,
              borderColor: Theme.colors.container.shadow
            }
          ]}
        >
          <FormSheetHeader
            placeholder={props.placeholder}
            panGesture={props.options.length * ITEM_HEIGHT + ITEM_HEIGHT > MODAL_MIN_HEIGHT ? panGesture : undefined}
          />
          <Container.Main>
            <List
              data={props.options}
              itemKey="value"
              ItemSeparatorComponent={() => (
                <Container.Horizontal
                  testID="separator"
                  style={{
                    backgroundColor: Theme.colors.container.shadow,
                    height: 1,
                    width: '100%'
                  }}
                />
              )}
              renderItem={item => (
                <List.Item.Horizontal
                  isSelected={props.selectValue?.value === item.value}
                  padding="SM"
                  onPress={() => onPressListItem(item)}
                >
                  <List.Item.Title>{item.label}</List.Item.Title>
                </List.Item.Horizontal>
              )}
            />
          </Container.Main>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  )
}
