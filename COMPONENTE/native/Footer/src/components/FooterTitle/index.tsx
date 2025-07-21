import { Container, ViewBaseProps } from '@mobilestock-native/container'
import { Typography, TypographyProps } from '@mobilestock-native/typography'

type TitleProps = Omit<ViewBaseProps, 'align' | 'onAbort'> &
  Omit<TypographyProps, 'align' | 'onAbort'> & {
    children: string
    alignSelf?: ViewBaseProps['align']
    alignText?: TypographyProps['align']
  }

export function Title({ children, alignSelf = 'START', alignText = 'LEFT', ...rest }: TitleProps) {
  return (
    <Container.Horizontal full align={alignSelf}>
      <Typography align={alignText} {...rest}>
        {children}
      </Typography>
    </Container.Horizontal>
  )
}
