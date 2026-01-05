import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { TreeSelect as AntdTreeSelect } from 'antd'
import React from 'react'
import { normalizeVariantProps } from '../__builtins__'
import { PreviewText } from '../preview-text'

export const TreeSelect = connect(
  AntdTreeSelect,
  mapProps(
    {
      dataSource: 'treeData',
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
  mapReadPretty(PreviewText.TreeSelect)
)

export default TreeSelect
