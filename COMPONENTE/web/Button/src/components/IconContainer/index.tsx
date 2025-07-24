import { Icon } from '@mobilestockweb/icons'

import { ButtonProps, RelativeContainer } from '../Button'
import { NotificationBadge } from '../NotificationBadge'

type IconContainerProps = Pick<ButtonProps, 'icon' | 'size' | 'notification' | 'notificationPosition'>

export function IconContainer(props: IconContainerProps) {
  const shouldShowNotification = props.notification && props.notificationPosition === 'ICON'

  if (!props.icon) return <></>

  if (shouldShowNotification) {
    return (
      <RelativeContainer>
        <Icon name={props.icon} size={props.size} />
        <NotificationBadge
          notification={props.notification}
          notificationPosition={props.notificationPosition}
          size={props.size}
        />
      </RelativeContainer>
    )
  }

  return <Icon name={props.icon} size={props.size} />
}
