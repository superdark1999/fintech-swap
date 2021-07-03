import React from 'react'
import moment from 'moment'
import { DatePicker, Space } from 'antd'
const { RangePicker } = DatePicker
function DatePickerComp(props) {
  const { disabledStartDate = false, disabledEndDate = false, isFormData } = props
  const range = (start, end) => {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current.unix() < moment().unix()
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
  // const handleRangeTime = (value) => {

  //   const startTime = value[0]?.utc?.()?.unix?.()
  //   const endTime = value[1]?.utc?.()?.unix?.()
  //   if(isFormData){
  //     if(props?.onChange){
  //       props.onChange?.({startTime,endTime})
  //     }
  //   }
  //   //props?.onChange?.({startTime,endTime})
  // }

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        {...props}
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
        onChange={(value)=>{
          const startTime = value[0]?.utc?.()?.unix?.()
          const endTime = value[1]?.utc?.()?.unix?.()
          props.onChange({startTime,endTime})
        }}
      />
    </Space>
  )
}

export default DatePickerComp
