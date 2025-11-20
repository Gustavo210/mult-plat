import styled, { DefaultTheme } from 'styled-components'

import { Badge as BadgeRaw, BadgeType } from '@mobilestockweb/badge'
import { Container } from '@mobilestockweb/container'
import tools from '@mobilestockweb/tools'
import { Typography } from '@mobilestockweb/typography'

import { useCounter } from '../../hooks/useCount'
import { Slot } from '../Slot'

export interface BadgeProps {
  text: string
  renderInsidePill?: boolean
  type?: BadgeType
}

export function Badge(props: BadgeProps) {
  const { groupElements } = useCounter()
  return (
    <Slot>
      {groupElements && props.renderInsidePill ? (
        <ContainerInfo $type={props.type} full align="CENTER">
          <Text $type={props.type}>{props.text}</Text>
        </ContainerInfo>
      ) : (
        <BadgeRaw text={props.text} type={props.type} size="XS" />
      )}
    </Slot>
  )
}
function getKeyOfBadgeType(type: BadgeType | undefined, theme: DefaultTheme) {
  return Object.keys(theme.colors.badge).find(key => key.toLowerCase() === type?.toLowerCase()) || 'default'
}

const ContainerInfo = styled(Container.Vertical)<{ $type?: BadgeType }>`
  background-color: ${({ $type, theme }) => {
    const key = getKeyOfBadgeType($type, theme)
    return theme.colors.badge[key]
  }};
  width: 100%;
`
const Text = styled(Typography)<{ $type?: BadgeType }>`
  color: ${({ $type, theme }) => {
    const key = getKeyOfBadgeType($type, theme)
    return tools.defineTextColor(theme.colors.badge[key])
  }};
`

Badge.displayName = 'Form.FormCounter.Badge'
