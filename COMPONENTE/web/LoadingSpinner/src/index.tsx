import { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { Icon, IconSize } from '@mobilestockweb/icons'

interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: IconSize
}

export function LoadingSpinner({ size = 'MD', color, ...props }: LoadingSpinnerProps) {
  return (
    <Spinner {...props}>
      <Icon color={color} size={size} name="Sync" />
    </Spinner>
  )
}

const Spinner = styled.div`
  @keyframes spin {
    from {
      transform: rotate(-360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  svg {
    animation-name: spin;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`
