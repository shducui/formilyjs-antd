import type { CSSProperties } from 'react'

type Variant = 'outlined' | 'filled' | 'borderless' | (string & {})

type VariantProps = {
  bordered?: boolean
  variant?: Variant
}

type CardStyleProps = {
  headStyle?: CSSProperties
  bodyStyle?: CSSProperties
  styles?: {
    header?: CSSProperties
    body?: CSSProperties
    [key: string]: CSSProperties | undefined
  }
}

export const normalizeVariantProps = <T extends VariantProps>(
  props: T,
  options?: {
    borderedTrueVariant?: Variant
    borderedFalseVariant?: Variant
  }
) => {
  if (!Object.prototype.hasOwnProperty.call(props, 'bordered')) {
    return props
  }

  const { bordered, variant, ...rest } = props
  const next = { ...rest } as Record<string, unknown>

  if (variant !== undefined) {
    next.variant = variant
    return next as T
  }

  if (bordered === undefined) {
    return next as T
  }

  next.variant = bordered
    ? options?.borderedTrueVariant ?? 'outlined'
    : options?.borderedFalseVariant ?? 'borderless'

  return next as T
}

export const normalizeCardProps = <T extends VariantProps & CardStyleProps>(
  props: T
) => {
  const { headStyle, bodyStyle, styles, ...rest } = props
  const shouldMergeStyles = !!styles || !!headStyle || !!bodyStyle
  let nextStyles = styles

  if (shouldMergeStyles) {
    nextStyles = { ...styles }
    if (headStyle) {
      nextStyles.header = { ...(styles?.header || {}), ...headStyle }
    }
    if (bodyStyle) {
      nextStyles.body = { ...(styles?.body || {}), ...bodyStyle }
    }
  }

  const nextProps = (
    shouldMergeStyles ? { ...rest, styles: nextStyles } : rest
  ) as T

  return normalizeVariantProps(nextProps, {
    borderedTrueVariant: 'outlined',
    borderedFalseVariant: 'filled',
  })
}
