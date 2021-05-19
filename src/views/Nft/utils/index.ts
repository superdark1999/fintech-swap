import moment from 'moment'
import { Status, NUM_MONTH_WITHDRAW } from '../constants'

export const formatNumber = (val: any) => {
    return (val / 1e18).toFixed(8)
}
export const getNextDay = (createdDate: any, timestampLastWithDraw: number, objCol: any) => {
    let index = 0;
    objCol.forEach((item: any, i: number): any => {
        if (index === 0 && item.status === 'lock') index = i
    });
    return moment.unix(timestampLastWithDraw).add('days', NUM_MONTH_WITHDRAW[index]).format('DD/MM/YYYY h:mm:ss')
}

export const getClassWithDraw = (
    status: string,
    timestampLastWithDraw: number,
    index: number
): any => {
    let disabled = true
    let classStatus = Status.lock
    if (status === 'true') {
        classStatus = Status.completed
    } else if (moment.unix(timestampLastWithDraw).add('days', NUM_MONTH_WITHDRAW[index]).isSameOrBefore(moment())) {
        classStatus = Status.unlock
        disabled = false
    }
    return {
        classStatus,
        disabled,
    }
}

export const filterDataOrder = (data: any, index: number) => {
    let dataSort: any = Array.from(data).sort((a: any, b: any) => b.id - a.id)
    dataSort = dataSort.filter((x: any) => x.amountETH > 0)
    // paging list
    dataSort = dataSort.slice(index * 5, (index + 1) * 5);
    return dataSort;
}
export const currencyFormat = (num: number) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
