import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty, ReactFC } from '@formily/react'
import { Select as AntdSelect } from 'antd'
import { SelectProps } from 'antd/lib/select'
import React from 'react'
import { normalizeVariantProps } from '../__builtins__'
import { PreviewText } from '../preview-text'

export const Select: ReactFC<SelectProps<any, any>> = connect(
  AntdSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props, field) => {
      const nextProps = normalizeVariantProps(props, {
        borderedTrueVariant: 'outlined',
        borderedFalseVariant: 'borderless',
      })
      return {
        ...nextProps,
        suffixIcon:
          field?.['loading'] || field?.['validating'] ? (
            <LoadingOutlined />
          ) : (
            nextProps.suffixIcon
          ),
      }
    }
  ),
  mapReadPretty(PreviewText.Select)
)

export default Select
