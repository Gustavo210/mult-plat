import type { Meta, StoryObj } from '@storybook/react'

import { IconSize } from '@/packages/Icons'

import { LoadingSpinner } from '.'
import { theme } from '../../../../utils/theme'

const availableSizes = Object.keys(theme.sizeIcons).map(size => size.toUpperCase()) as IconSize[]

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Componentes/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['!dev'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: availableSizes,
      description: 'Tamanho do loading spinner'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const UsoBasico: Story = {
  args: {
    size: 'MD'
  }
}
