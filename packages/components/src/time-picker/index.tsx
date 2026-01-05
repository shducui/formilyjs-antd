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

type ComposedTimePicker = React.FC<
  React.PropsWithChildren<AntdTimePickerProps>
> & {
  RangePicker?: React.FC<React.PropsWithChildren<TimeRangePickerProps>>
}

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

const InternalTimePicker: ComposedTimePicker = connect(
  AntdTimePicker,
  mapProps(mapTimeFormat()),
  mapReadPretty(PreviewText.TimePicker)
)

const RangePicker = connect(
  AntdTimePicker.RangePicker,
  mapProps(mapTimeFormat()),
  mapReadPretty(PreviewText.TimeRangePicker)
)

export const TimePicker = Object.assign(InternalTimePicker, { RangePicker })

export default TimePicker
