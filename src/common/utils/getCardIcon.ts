import type { IconVariant } from '@components/Icon/types'

export const getCardIcon = (title: string): IconVariant => {
  switch (title) {
    case 'Edge authentication':
      return 'home'
    case 'Unified platform':
      return 'home'
    default:
      return 'home'
  }
}
