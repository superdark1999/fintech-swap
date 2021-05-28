import { black, green, darkGreen, blue, yellow, bluelight, navy, grey,brown , orange, red, white, unlock, completed, lock, aqua, LightBlue } from './colors'

const theme = {
  borderRadius: 12,
  color: {
    black,
    grey,
    primary: {
      light: red[200],
      main: red[500],
    },
    secondary: {
      main: green[500],
    },
    white,
    red,
    blue,
    darkGreen,
    green,
    navy,
    yellow,
    bluelight,
    orange,
    brown,
    unlock,
    completed,
    lock,
    aqua,
    LightBlue
  },
  siteWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
    8: 80,
    9: 96,
  },
  footerHeight: 72,
  topBarSize: 80,
  topBarMobile: 200,
}

export default theme
