import {
  createStore,
  createHook,
  createContainer,
  createSubscriber,
} from 'react-sweet-state'
import { API_DASHBOARD } from '../../../../constants'
import axios from 'axios'
//moment.setDefault("America/New_York");
const stateDefault = {
  historys: [],
}
const banner = []
const view =0;
const Store = createStore({
  initialState: { ...stateDefault, banner, view },
  actions: {
    resetData:
      (tokenId) =>
      ({ setState }) => {
        setState({ historys: [] })
      },
    getHistorys:
      (tokenId) =>
      ({ setState, getState }) => {
        axios(`${API_DASHBOARD}/transactions?tokenId=${tokenId}`).then(
          (res) => {
            let parseData = res.data
            parseData = parseData.map((item) => {
              item.price = 0
              //console.log(item.avtFrom.from)
              item.from = [
                item.avtFrom.address,
                item.avtFrom.from,
                item.avtFrom.name,
              ]
              console.log(typeof item.avtTo.from, item.avtTo.from)
              item.to = [item.avtTo.address, item.avtTo.from, item.avtTo.name]

              //start handle date
              const created = new Date(item.timeStamp * 1000)
              const utc_created = Date.UTC(
                created.getUTCFullYear(),
                created.getUTCMonth(),
                created.getUTCDate(),
                created.getUTCHours(),
                created.getUTCMinutes(),
                created.getUTCSeconds(),
                created.getUTCMilliseconds(),
              )
              // The time now
              const now = new Date()
              const utc_now = Date.UTC(
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate(),
                now.getUTCHours(),
                now.getUTCMinutes(),
                now.getUTCSeconds(),
                now.getUTCMilliseconds(),
              )
              const howLongAgo = utc_created - utc_now
              //end handle date

              item.date = [
                item.timeStamp && getHumanTime(howLongAgo),
                item.hash,
              ]

              return item
            })
            setState({ historys: parseData })
          },
        )
      },
    resetView:
      () =>
      async ({ setState }) => {
        setState({ views: 0 })
      },
    getViews:
      (Id) =>
      async ({ setState, getState }) => {
        setState({ view: 0 })
        let c
        await fetch(
          `https://api.countapi.xyz/update/lucky-swap/${Id}/?amount=1`,
        )
          .then((res) => res.json())
          .then((res) => {
            c = res.value
          })
        if (c == null) {
          await fetch(
            `https://api.countapi.xyz/create?namespace=lucky-swap&key=${Id}&value=1`,
          )
            .then((res) => res.json())
            .then((res) => {
              c = res.value
            })
        }
        setState({ view: c })
      },
  },
  name: 'Detail Store',
})
var getHumanTime = function (timestamp) {
  //console.log()
  // Convert to a positive integer
  var time = Math.abs(timestamp)
  //console.log(time)
  // Define humanTime and units
  var humanTime, units, humanTime2, units2

  // If there are years
  if (time > 1000 * 60 * 60 * 24 * 365) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 365), 10)
    const v = parseFloat(time / (1000 * 60 * 60 * 24 * 365))
    humanTime2 = parseInt(Math.abs((humanTime - v) * 12))

    units = humanTime == 1 ? 'year' : 'years'
    units2 = humanTime2 = 1 ? 'month' : 'months'
    return humanTime + ' ' + units + ' ' + humanTime2 + ' ' + units2
  }

  // If there are months
  else if (time > 1000 * 60 * 60 * 24 * 30) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 30), 10)
    const v = parseFloat(time / (1000 * 60 * 60 * 24 * 30))
    humanTime2 = parseInt(Math.abs((humanTime - v) * 30))

    units = humanTime == 1 ? 'month' : 'months'
    units2 = humanTime2 == 1 ? 'week' : 'weeks'
    return humanTime + ' ' + units + ' ' + humanTime2 + ' ' + units2 + ' ago'
  }

  // If there are weeks
  // else if (time > (1000 * 60 * 60 * 24 * 7)) {
  // 	humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 7), 10);
  //   const v = parseFloat(time / (1000 * 60 * 60 * 24 * 7))
  //   humanTime2 = parseInt(Math.abs((humanTime - v)*7))

  // 	units = (humanTime == 1?'week':'weeks');
  // 	units2 = (humanTime2 == 1?'day':'days');
  //   return humanTime + ' ' + units + ' ' + humanTime2 + ' ' + units2;
  // }

  // If there are days
  else if (time > 1000 * 60 * 60 * 24) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24), 10)
    const v = parseFloat(time / (1000 * 60 * 60 * 24))
    humanTime2 = parseInt(Math.abs((humanTime - v) * 24))

    units = humanTime == 1 ? 'day' : 'days'
    units2 = humanTime == 1 ? 'hr' : 'hrs'
    return humanTime + ' ' + units + ' ' + humanTime2 + ' ' + units2 + ' ago'
  }

  // If there are hours
  else if (time > 1000 * 60 * 60) {
    humanTime = parseInt(time / (1000 * 60 * 60), 10)
    const v = parseFloat(time / (1000 * 60 * 60))
    humanTime2 = parseInt(Math.abs((humanTime - v) * 60))
    //console.log("v:"+ v, "b:"+b)

    units = humanTime == 1 ? 'hr' : 'hrs'
    units2 = humanTime2 == 1 ? 'min' : 'mins'

    return humanTime + ' ' + units + ' ' + humanTime2 + ' ' + units2 + ' ago'
  }

  // If there are minutes
  else if (time > 1000 * 60) {
    humanTime = parseInt(time / (1000 * 60), 10)
    const v = parseFloat(time / (1000 * 60))
    humanTime2 = parseInt(Math.abs((humanTime - v) * 60))

    units = humanTime == 1 ? 'min' : 'mins'
    units2 = humanTime2 == 1 ? 'sec' : 'secs'
    return humanTime + ' ' + units + ' ' + humanTime2 + ' ' + units2 + ' ago'
  }

  // Otherwise, use seconds
  else {
    humanTime = parseInt(time / 1000, 10)
    units = humanTime == 1 ? 'sec' : 'secs'
    return humanTime + ' ' + units + ' ago'
  }
}

export const useHookDetail = createHook(Store)
export const Container = createContainer(Store, {
  onInit:
    () =>
    ({ setState }, props) => {
      setState({ ...props })
    },
})
export const Subscriber = createSubscriber(Store)
