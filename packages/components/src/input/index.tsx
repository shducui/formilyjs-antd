import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty, ReactFC } from '@formily/react'
import { Input as AntdInput } from 'antd'
import type { InputProps } from 'antd/es/input'
import React from 'react'
import { normalizeVariantProps } from '../__builtins__'
import { PreviewText } from '../preview-text'

const InternalInput: ReactFC<InputProps> = connect(
  AntdInput,
  mapProps((props, field) => {
    const nextProps = normalizeVariantProps(props, {
      borderedTrueVariant: 'outlined',
      borderedFalseVariant: 'borderless',
    })
    return {
      ...nextProps,
      suffix: (
        <span>
          {field?.['loading'] || field?.['validating'] ? (
            <LoadingOutlined />
          ) : (
            nextProps.suffix
          )}
        </span>
      ),
    }
  }),
  mapReadPretty(PreviewText.Input)
)
const TextArea = connect(AntdInput.TextArea, mapReadPretty(PreviewText.Input))

export const Input = Object.assign(InternalInput, {
  TextArea,
})

export default Input
