import { connect, mapProps, mapReadPretty } from '@formily/react'
import { DatePicker as AntdDatePicker } from 'antd'
import { DatePickerProps as AntdDatePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import {
  dayjsable,
  formatDayjsValue,
  normalizeVariantProps,
} from '../__builtins__'
import { PreviewText } from '../preview-text'

type DatePickerProps<PickerProps> = Exclude<
  PickerProps,
  'value' | 'onChange'
> & {
  value: string
  onChange: (value: string | string[]) => void
}

const mapDateFormat = function () {
  const getDefaultFormat = (props: DatePickerProps<AntdDatePickerProps>) => {
    if (props['picker'] === 'month') {
      return 'YYYY-MM'
    } else if (props['picker'] === 'quarter') {
      return 'YYYY-\\QQ'
    } else if (props['picker'] === 'year') {
      return 'YYYY'
    } else if (props['picker'] === 'week') {
      return 'gggg-wo'
    }
    return props['showTime'] ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }
  return (props: any) => {
    const nextProps = normalizeVariantProps(props, {
      borderedTrueVariant: 'outlined',
      borderedFalseVariant: 'borderless',
    })
    const format = nextProps['format'] || getDefaultFormat(nextProps)
    const onChange = nextProps.onChange
    return {
      ...nextProps,
      format: format,
      value: dayjsable(
        nextProps.value,
        format === 'gggg-wo' ? 'gggg-ww' : format
      ),
      onChange: (value: dayjs.Dayjs | dayjs.Dayjs[]) => {
        if (onChange) {
          onChange(formatDayjsValue(value, format))
        }
      },
    }
  }
}

const InternalDatePicker = connect(
  AntdDatePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DatePicker)
)
const RangePicker = connect(
  AntdDatePicker.RangePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DateRangePicker)
)
export const DatePicker = Object.assign(InternalDatePicker, {
  RangePicker,
})

export default DatePicker
