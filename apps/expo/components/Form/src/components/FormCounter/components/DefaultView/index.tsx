import { Container } from '@mobilestock-native/container'

import { useCounter } from '../../hooks/useCount'
import { Button } from '../Button'
import { ContainerPill } from '../ContainerPill'
import { Display } from '../Display'
import { Error } from '../Error'
import { Label } from '../Label'

export function DefaultView() {
  const { label, labelPosition, error } = useCounter()
  return (
    <Container.Vertical align="CENTER_START">
      {labelPosition === 'TOP_START' && label && (
        <Container.Horizontal padding="NONE_NONE_2XS_NONE" gap="2XS">
          <Label>{label}</Label>
          {error && <Error>{error}</Error>}
        </Container.Horizontal>
      )}
      {labelPosition !== 'LEFT' && (
        <Container.Vertical align="CENTER">
          {labelPosition !== 'TOP_START' && (label || error) && (
            <Container.Vertical align="CENTER" padding="NONE_NONE_2XS_NONE">
              {label && <Label>{label}</Label>}
              {error && <Error>{error}</Error>}
            </Container.Vertical>
          )}
          <ContainerPill>
            <Button type="MINUS" />
            <Display />
            <Button type="PLUS" />
          </ContainerPill>
        </Container.Vertical>
      )}
      {labelPosition === 'LEFT' && (
        <Container.Vertical>
          <Container.Horizontal align="CENTER">
            {(label || error) && (
              <Container.Vertical padding="NONE_2XS_NONE_NONE">
                {label && <Label>{label}</Label>}
                {error && <Error>{error}</Error>}
              </Container.Vertical>
            )}
            <ContainerPill>
              <Button type="MINUS" />
              <Display />
              <Button type="PLUS" />
            </ContainerPill>
          </Container.Horizontal>
        </Container.Vertical>
      )}
    </Container.Vertical>
  )
}
