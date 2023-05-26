export type FeaturesIllustrationVariant =
  | 'abstraction-for-identity'
  | 'boost-conversions'
  | 'data-storage'
  | 'retain-users'

export type ProductsIllustrationVariant = 'access' | 'gate' | 'vault'

export type UseCasesIllustrationVariant =
  | 'access-plane'
  | 'authentication'
  | 'fraud'
  | 'analytics'
  | 'onboarding'

export const isFeaturesIllustration = (
  value: string
): value is FeaturesIllustrationVariant => {
  return [
    'abstraction-for-identity',
    'boost-conversions',
    'data-storage',
    'retain-users',
  ].includes(value)
}

export const isProductIllustration = (
  value: string
): value is ProductsIllustrationVariant => {
  return ['access', 'gate', 'vault'].includes(value)
}

export const isUseCasesIllustration = (
  value: string
): value is UseCasesIllustrationVariant => {
  return [
    'access-plane',
    'analytics',
    'authentication',
    'fraud',
    'onboarding',
  ].includes(value)
}
