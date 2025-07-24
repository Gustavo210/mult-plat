import { Typography } from '@mobilestockweb/typography'

import { ButtonProps, RelativeContainer } from '../Button'
import { NotificationBadge } from '../NotificationBadge'

interface TextContainerProps
  extends Pick<ButtonProps, 'text' | 'fontWeight' | 'size' | 'notification' | 'notificationPosition'> {
  withUnderline?: boolean
}

export function TextContainer(props: TextContainerProps) {
  if (!props.text) return <></>

  const shouldShowNotification = props.notification && props.notificationPosition === 'TEXT'

  if (shouldShowNotification) {
    return (
      <RelativeContainer>
        <Typography weight={props.fontWeight} size={props.size} withUnderline={props.withUnderline}>
          {props.text}
        </Typography>
        <NotificationBadge
          notification={props.notification}
          notificationPosition={props.notificationPosition}
          size={props.size}
        />
      </RelativeContainer>
    )
  }

  return (
    <Typography weight={props.fontWeight} size={props.size} withUnderline={props.withUnderline}>
      {props.text}
    </Typography>
  )
}
