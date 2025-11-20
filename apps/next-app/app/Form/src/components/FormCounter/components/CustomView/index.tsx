import { Children, Fragment, ReactNode, isValidElement, useCallback } from 'react'

import { Container } from '@mobilestockweb/container'
import tools from '@mobilestockweb/tools'

import { useCounter } from '../../hooks/useCount'
import { Badge } from '../Badge'
import { ContainerPill } from '../ContainerPill'
import { Error } from '../Error'
import { Label } from '../Label'

export function CustomView({ children }: { children: React.ReactNode }) {
  const { label, error, labelPosition } = useCounter()

  const externalChildren: ReactNode[] = []
  const internalChildren: ReactNode[] = []

  const unwrapFragments = useCallback((node: ReactNode) => {
    if (isValidElement(node) && node.type === Fragment) {
      return unwrapFragments(node.props.children)
    }
    return node
  }, [])

  const childrenToIterate = unwrapFragments(children)

  Children.toArray(childrenToIterate).forEach(child => {
    if (
      isValidElement(child) &&
      tools.isComponentWithDisplayName(child.type) &&
      child.type.displayName === Badge.displayName &&
      !child.props.renderInsidePill
    ) {
      externalChildren.push(child)
    } else {
      internalChildren.push(child)
    }
  })

  return (
    <Container.Vertical align="CENTER_START">
      {labelPosition === 'TOP_START' && label && (
        <Container.Horizontal padding="NONE_NONE_2XS_NONE" gap="2XS">
          <Label>{label}</Label>
          {error && !externalChildren.length && <Error>{error}</Error>}
        </Container.Horizontal>
      )}
      {labelPosition !== 'LEFT' && (
        <Container.Vertical align="CENTER">
          {((labelPosition !== 'TOP_START' && label) ||
            (labelPosition !== 'TOP_START' && error && !externalChildren.length)) && (
            <Container.Vertical align="CENTER" padding="NONE_NONE_2XS_NONE">
              {label && <Label>{label}</Label>}
              {error && !externalChildren.length && <Error>{error}</Error>}
            </Container.Vertical>
          )}
          <Container.Horizontal align="CENTER_START">
            {externalChildren.length > 0 && (
              <Container.Horizontal padding="NONE_2XS_NONE_NONE">{externalChildren}</Container.Horizontal>
            )}
            <Container.Vertical>
              <ContainerPill>{internalChildren}</ContainerPill>
              {error && !!externalChildren.length && <Error>{error}</Error>}
            </Container.Vertical>
          </Container.Horizontal>
        </Container.Vertical>
      )}
      {labelPosition === 'LEFT' && (
        <Container.Vertical>
          <Container.Horizontal align="CENTER">
            <Container.Vertical padding="NONE_2XS_NONE_NONE">
              {label && <Label>{label}</Label>}
              {error && !externalChildren.length && <Error>{error}</Error>}
            </Container.Vertical>
            {externalChildren.length > 0 && (
              <Container.Horizontal padding="NONE_2XS_NONE_NONE">{externalChildren}</Container.Horizontal>
            )}
            <ContainerPill>{internalChildren}</ContainerPill>
          </Container.Horizontal>
        </Container.Vertical>
      )}
    </Container.Vertical>
  )
}
