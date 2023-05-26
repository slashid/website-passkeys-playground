import type { IconVariant } from '@components/Icon/types'

export type NavigationChildren = {
  subgroup?: string
  icon?: IconVariant
  label: string
  description?: string
  href: string
}

export interface Navigation {
  label: string
  dropdown?: 'products' | 'use-cases'
  badgeQuantity?: number
  href?: string
  children?: NavigationChildren[]
}
