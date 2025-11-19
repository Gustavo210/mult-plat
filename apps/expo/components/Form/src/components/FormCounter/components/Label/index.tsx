import { Typography, TypographyProps } from '@mobilestock-native/typography'

export function Label({ children }: TypographyProps) {
  return <Typography weight="REGULAR">{children}</Typography>
}
