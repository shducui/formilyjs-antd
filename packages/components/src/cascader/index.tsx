import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Cascader as AntdCascader } from 'antd'
import React from 'react'
import { normalizeVariantProps } from '../__builtins__'
import { PreviewText } from '../preview-text'

export const Cascader = connect(
  AntdCascader,
  mapProps(
    {
      dataSource: 'options',
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
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
