import React from 'react'
import moment from 'moment'
import { DatePicker, Space } from 'antd'
const { RangePicker } = DatePicker
function DatePickerComp(props) {
  const { disabledStartDate = false, disabledEndDate = false } = props
  const range = (start, end) => {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day')
  }

  const disabledDateTime = () => {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    }
  }

  const disabledRangeTime = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      }
    }
  }
  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        disabledDate={disabledDate}
        disabledTime={disabledRangeTime}
        disabled={[disabledStartDate, disabledEndDate]}
        showTime={{
          hideDisabledOptions: true,
          defaultValue: [
            moment('00:00:00', 'HH:mm'),
            moment('11:59:59', 'HH:mm'),
          ],
        }}
        format="YYYY-MM-DD HH:mm"
      />
    </Space>
  )
}

export default DatePickerComp
