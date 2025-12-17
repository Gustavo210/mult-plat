import { Button, ButtonProps } from '@mobilestock-native/button'

export function SearchButton(props: Omit<ButtonProps, 'onPress'>) {
  // trocar para usar clicable
  return <Button icon="Search" {...props} style={{ height: 40, width: 40 }} onPress={console.log} />
}
