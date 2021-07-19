import { isMobile } from 'react-device-detect'
import TopBar from './TopBar'
import TopBarMobile from './TopBarMobile'

const CompTopBar = isMobile ? TopBarMobile : TopBar

export default CompTopBar