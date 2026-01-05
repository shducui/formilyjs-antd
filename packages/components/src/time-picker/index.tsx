import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  TimePicker as AntdTimePicker,
  TimePickerProps as AntdTimePickerProps,
  TimeRangePickerProps,
} from 'antd'
import dayjs from 'dayjs'
import {
  dayjsable,
  formatDayjsValue,
  normalizeVariantProps,
} from '../__builtins__'
import { PreviewText } from '../preview-text'

type ComposedTimePicker = typeof AntdTimePicker

const mapTimeFormat = function () {
  return (props: any) => {
    const nextProps = normalizeVariantProps(props, {
      borderedTrueVariant: 'outlined',
      borderedFalseVariant: 'borderless',
    })
    const format = nextProps['format'] || 'HH:mm:ss'
    const onChange = nextProps.onChange
    return {
      ...nextProps,
      format,
      value: dayjsable(nextProps.value, format),
      onChange: (value: dayjs.Dayjs | dayjs.Dayjs[]) => {
        if (onChange) {
          onChange(formatDayjsValue(value, format))
        }
      },
    }
  }
}

const InternalTimePicker = connect(
  AntdTimePicker,
  mapProps(mapTimeFormat()),
  mapReadPretty(PreviewText.TimePicker)
) as unknown as ComposedTimePicker

const RangePicker = connect(
  AntdTimePicker.RangePicker,
  mapProps(mapTimeFormat()),
  mapReadPretty(PreviewText.TimeRangePicker)
) as typeof AntdTimePicker.RangePicker

export const TimePicker = Object.assign(InternalTimePicker, {
  RangePicker,
}) as ComposedTimePicker

export default TimePicker
