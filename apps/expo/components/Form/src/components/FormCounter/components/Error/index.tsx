import { Typography, TypographyProps } from '@mobilestock-native/typography'

export function Error({ children }: TypographyProps) {
  return (
    <Typography color="DANGER_600" size="SM" weight="MEDIUM">
      {children}
    </Typography>
  )
}
