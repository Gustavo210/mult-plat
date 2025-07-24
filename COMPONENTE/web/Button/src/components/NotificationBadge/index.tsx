import styled, { css } from 'styled-components'

import tools from '@mobilestockweb/tools'
import { Typography } from '@mobilestockweb/typography'

import { ButtonProps } from '../Button'

type NotificationBadgeProps = Pick<ButtonProps, 'notification' | 'notificationPosition' | 'size'>

export function NotificationBadge(props: NotificationBadgeProps) {
  return (
    <NotificationBadgeComponent $position={props.notificationPosition} $size={props.size}>
      <NotificationText size={props.size} weight="BOLD">
        {props.notification > 99 ? '99+' : props.notification}
      </NotificationText>
    </NotificationBadgeComponent>
  )
}

const positionOffsets = {
  XS: { top: '-10px', right: '-10px' },
  SM: { top: '-12px', right: '-11px' },
  MD: { top: '-13px', right: '-12px' },
  LG: { top: '-15px', right: '-10px' },
  XL: { top: '-20px', right: '-15px' },
  '2XL': { top: '-20px', right: '-15px' },
  '3XL': { top: '-25px', right: '-13px' }
}

const NotificationBadgeComponent = styled.div<{
  $position: NotificationBadgeProps['notificationPosition']
  $size: NotificationBadgeProps['size']
}>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.alert.urgent};
  padding: 0.125rem 0.25rem;
  border-radius: 0.3rem;

  ${({ $position, $size }) => {
    if ($position === 'END') {
      return css`
        position: static;
      `
    }

    const offset = positionOffsets[$size]

    return css`
      top: ${offset.top};
      right: ${offset.right};
    `
  }}
`

const NotificationText = styled(Typography)`
  color: ${({ theme }) => tools.defineTextColor(theme.colors.alert.urgent)} !important;
`
