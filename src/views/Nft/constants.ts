export const listPercent = ['10%', '10%', '20%', '20%', '30%']
export const listMilestone = [1, 2, 3, 4, 5]
export enum Status {
    lock = 'lock',
    unlock = 'unlock',
    completed = 'completed',
    pending = 'pending'
}
export const addressAdminRefer = '0x701D8BDEF1955f74F741fdae7d0cC36e10991456'
export const NUM_MONTH_WITHDRAW = [15, 15, 30, 30, 90]

export const RegexNumber100000 = /^(?:1000000|[1-9]\d{0,6})(?:\.\d{1,2})?$/g
export const RegexWebsiteURL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm

export const OptionSort = [
  {
    label: 'Newest',
    value: 'asc',
  },
  {
    label: 'Oldest',
    value: 'desc',
  },
  {
    label: 'Price Low',
    value: 'low', 
  },
  {
    label: 'Price Hight',
    value: 'hight', 
  }
]
  
export const OptionMethods = [
  { label: 'All', value: ''},
  { label: 'Auction', value: 'auction'},
  { label: 'Swap', value: 'swap-store'},
  { label: 'Buy', value: 'buy'},
]

export const OptionTypeNft = [
  { label: 'All', value: ''},
  { label: 'Picture', value: 'image'},
  { label: 'GIF', value: 'gif'},
  { label: 'Video', value: 'video'},
  { label: 'Audio', value: 'audio'},
]


