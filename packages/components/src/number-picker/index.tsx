import { connect, mapProps, mapReadPretty } from '@formily/react'
import { InputNumber } from 'antd'
import { normalizeVariantProps } from '../__builtins__'
import { PreviewText } from '../preview-text'

export const NumberPicker = connect(
  InputNumber,
  mapProps((props) =>
    normalizeVariantProps(props, {
      borderedTrueVariant: 'outlined',
      borderedFalseVariant: 'borderless',
    })
  ),
  mapReadPretty(PreviewText.NumberPicker)
)

export default NumberPicker
