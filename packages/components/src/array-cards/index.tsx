import { ArrayField } from '@formily/core'
import { ISchema } from '@formily/json-schema'
import {
  observer,
  ReactFC,
  RecursionField,
  useField,
  useFieldSchema,
} from '@formily/react'
import { Card, CardProps, Empty } from 'antd'
import cls from 'classnames'
import React from 'react'
import { ArrayBase } from '../array-base'
import { normalizeCardProps, usePrefixCls } from '../__builtins__'
import useStyle from './style'

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const isIndexComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf?.('Index') > -1
}

const isRemoveComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf?.('Remove') > -1
}

const isCopyComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf?.('Copy') > -1
}

const isMoveUpComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf?.('MoveUp') > -1
}

const isMoveDownComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf?.('MoveDown') > -1
}

const isOperationComponent = (schema: ISchema) => {
  return (
    isAdditionComponent(schema) ||
    isRemoveComponent(schema) ||
    isCopyComponent(schema) ||
    isMoveDownComponent(schema) ||
    isMoveUpComponent(schema)
  )
}

type LegacyCardProps = Omit<
  CardProps,
  'bordered' | 'headStyle' | 'bodyStyle'
> & {
  bordered?: boolean
  headStyle?: React.CSSProperties
  bodyStyle?: React.CSSProperties
}

export const InternalArrayCards: ReactFC<LegacyCardProps> = observer(
  (props) => {
    const field = useField<ArrayField>()
    const schema = useFieldSchema()
    const dataSource = Array.isArray(field.value) ? field.value : []
    const prefixCls = usePrefixCls('formily-array-cards', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)

    if (!schema) throw new Error('can not found schema object')

    const renderItems = () => {
      return dataSource?.map((item, index) => {
        const items = Array.isArray(schema.items)
          ? schema.items[index] || schema.items[0]
          : schema.items
        const title = (
          <span>
            {items ? (
              <RecursionField
                schema={items}
                name={index}
                filterProperties={(schema) => {
                  if (!isIndexComponent(schema)) return false
                  return true
                }}
                onlyRenderProperties
              />
            ) : null}
            {props.title || field.title}
          </span>
        )
        const extra = (
          <span>
            {items ? (
              <RecursionField
                schema={items}
                name={index}
                filterProperties={(schema) => {
                  if (!isOperationComponent(schema)) return false
                  return true
                }}
                onlyRenderProperties
              />
            ) : null}
            {props.extra}
          </span>
        )
        const content = items ? (
          <RecursionField
            schema={items}
            name={index}
            filterProperties={(schema) => {
              if (isIndexComponent(schema)) return false
              if (isOperationComponent(schema)) return false
              return true
            }}
          />
        ) : null
        const cardProps = normalizeCardProps(props)
        return (
          <ArrayBase.Item
            key={index}
            index={index}
            record={() => field.value?.[index]}
          >
            <Card
              {...cardProps}
              onChange={() => {}}
              className={cls(`${prefixCls}-item`, hashId, cardProps.className)}
              title={title}
              extra={extra}
            >
              {content}
            </Card>
          </ArrayBase.Item>
        )
      })
    }

    const renderAddition = () => {
      return schema.reduceProperties((addition, schema, key) => {
        if (isAdditionComponent(schema)) {
          return <RecursionField schema={schema} name={key} />
        }
        return addition
      }, null)
    }

    const renderEmpty = () => {
      if (dataSource?.length) return
      const cardProps = normalizeCardProps(props)
      return (
        <Card
          {...cardProps}
          onChange={() => {}}
          className={cls(`${prefixCls}-item`, hashId, cardProps.className)}
          title={cardProps.title || field.title}
        >
          <Empty />
        </Card>
      )
    }

    return wrapSSR(
      <ArrayBase>
        {renderEmpty()}
        {renderItems()}
        {renderAddition()}
      </ArrayBase>
    )
  }
)

export const ArrayCards = ArrayBase.mixin(InternalArrayCards)

ArrayCards.displayName = 'ArrayCards'

export default ArrayCards
