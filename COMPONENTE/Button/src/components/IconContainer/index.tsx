import { useTheme } from 'styled-components/native'

import { Icon } from '@mobilestock-native/icons'
import tools from '@mobilestock-native/tools'

import { ButtonProps, RelativeContainer, calculateBackgroundColor } from '../Button'
import { NotificationBadge } from '../NotificationBadge'

type IconContainerProps = Pick<
  ButtonProps,
  'icon' | 'size' | 'color' | 'notification' | 'notificationPosition' | 'variant' | 'backgroundColor'
>

export function IconContainer(props: IconContainerProps) {
  const Theme = useTheme()

  const shouldShowNotification = props.notification && props.notificationPosition === 'ICON'

  function getIconColor() {
    const backgroundColorWithLuminosity = calculateBackgroundColor(props.backgroundColor, Theme)

    if (props.color) {
      return props.color
    }

    switch (props.variant) {
      case 'DEFAULT':
        return tools.defineTextColor(backgroundColorWithLuminosity)
      case 'TRANSPARENT':
      case 'OUTLINE':
        return backgroundColorWithLuminosity
      case 'LINK':
        return Theme.colors.text.default
    }
  }

  if (!props.icon) return <></>

  if (shouldShowNotification) {
    return (
      <RelativeContainer>
        <Icon color={getIconColor()} name={props.icon} size={props.size} />
        <NotificationBadge
          notification={props.notification}
          notificationPosition={props.notificationPosition}
          size={props.size}
        />
      </RelativeContainer>
    )
  }

  return <Icon testID="icon-container" color={getIconColor()} name={props.icon} size={props.size} />
}
