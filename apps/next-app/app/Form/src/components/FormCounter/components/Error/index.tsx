import { Typography, TypographyProps } from '@mobilestockweb/typography'

export function Error({ children }: TypographyProps) {
  return (
    <Typography color="DANGER_600" size="SM" weight="MEDIUM">
      {children}
    </Typography>
  )
}
