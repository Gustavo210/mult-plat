import { Container } from '@mobilestock-native/container'
import { Spacer } from '@mobilestock-native/spacer'

import { useFileInput } from '../../hooks/useMultipleArchive'
import { Footer } from '../Footer'
import { HelpButton } from '../HelpButton'
import { HelpText } from '../HelpText'
import { Title } from '../Title'

export function DefaultView() {
  const FileInput = useFileInput()
  return (
    <>
      <Container.Vertical align="CENTER">
        <Title />
        <Spacer size="2XS" />
        <HelpButton />
        {FileInput.accept?.includes('all') ? null : <HelpText />}
      </Container.Vertical>
      <Footer />
    </>
  )
}
