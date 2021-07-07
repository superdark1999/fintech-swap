import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import EyeView from 'assets/images/visible-eye.svg'
import { useHookDetail } from './Store'

const CountVisit = ({id}: any) => {
  const [stateDetail, actionsDetail] = useHookDetail()
  // call history transaction by tokenID
  useEffect(() => {
    if(id) {
      actionsDetail.getViews(id)
    }
  }, [])
  return (
    <div className="view">
      <img width="20px" src={EyeView} alt="" />
      {stateDetail.view} views
    </div>
  )
}

export default CountVisit
