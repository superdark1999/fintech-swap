import React, { useEffect } from 'react'
import { createChart } from 'lightweight-charts'
import TradingViewWidget, { IntervalTypes, Themes } from 'react-tradingview-widget'

function Chart() {
  return (
    <div id="chart-home" style={{ height: '100%' }}>
      <TradingViewWidget
        interval={240}
        hide_top_toolbar={!false}
        he
        symbol="BNBUSD"
        theme={Themes.DARK}
        locale="en"
        autosize
      />
    </div>
  )
}

export default Chart
