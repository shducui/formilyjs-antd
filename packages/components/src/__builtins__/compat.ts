import type { CardProps } from 'antd'
import type { Variant } from 'antd/es/config-provider'
import type { CSSProperties } from 'react'

type VariantProps = {
  bordered?: boolean
  variant?: Variant
}

type CardVariant = CardProps['variant']
type CardStyles = CardProps['styles']

type CardVariantProps = {
  bordered?: boolean
  variant?: CardVariant
}

type CardStyleProps = {
  headStyle?: CSSProperties
  bodyStyle?: CSSProperties
  styles?: CardStyles
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

const mergeCardStyles = (
  styles: CardStyles,
  headStyle?: CSSProperties,
  bodyStyle?: CSSProperties
): CardStyles => {
  if (!headStyle && !bodyStyle) return styles

  const mergeSections = (
    base: Record<string, CSSProperties | undefined>
  ): Record<string, CSSProperties | undefined> => {
    const next = { ...base }
    if (headStyle) {
      next.header = { ...(base.header || {}), ...headStyle }
    }
    if (bodyStyle) {
      next.body = { ...(base.body || {}), ...bodyStyle }
    }
    return next
  }

  if (typeof styles === 'function') {
    return (info) => {
      const resolved = styles(info) as Record<string, CSSProperties | undefined>
      return mergeSections(resolved || {})
    }
  }

  return mergeSections(
    (styles as Record<string, CSSProperties | undefined>) || {}
  )
}

export const normalizeCardProps = <T extends CardVariantProps & CardStyleProps>(
  props: T
) => {
  const { headStyle, bodyStyle, styles, bordered, variant, ...rest } = props
  const shouldMergeStyles = !!styles || !!headStyle || !!bodyStyle
  const next = { ...rest } as Record<string, unknown>

  if (shouldMergeStyles) {
    next.styles = mergeCardStyles(styles, headStyle, bodyStyle)
  }

  if (variant !== undefined) {
    next.variant = variant
  } else if (bordered !== undefined) {
    next.variant = bordered ? 'outlined' : 'borderless'
  }

  return next as T
}
