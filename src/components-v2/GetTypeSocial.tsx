import React from 'react'
import { GlobalOutlined, FacebookFilled, TwitterSquareFilled, ApiFilled } from '@ant-design/icons'
import TelegramIcon from 'assets/icon/telegram-blue.svg'
import IconLink from 'assets/icon/icon-link.svg'
import styled from 'styled-components'
function GetTypeSocial(props: any) {

    return <StyledSocial>
        {renderChild(props)}
    </StyledSocial>

}
const renderChild = (props: any) => {
    let { string = 'empty', url } = props
    let lowerSt = string.toLowerCase();
    if (lowerSt.includes('https://www.facebook.com/')) {
        //facebook
        return <a target="_blank" style={{ marginRight: '10px' }} title="Facebook" href={url}><FacebookFilled className="icon" /></a>
    }
    else if (lowerSt.includes('https://twitter.com/')) {
        //twitter
        return <a target="_blank" style={{ marginRight: '10px' }} title="Twitter" href={url}>
            <TwitterSquareFilled className="icon" />
        </a>
    }
    else if (lowerSt.includes('https://t.me/')) {
        //telegram
        return <a target="_blank" style={{ marginRight: '10px' }} title="Telegram" href={url}>
            <img className="icon" style={{ width: '24px' }} src={TelegramIcon} />
        </a>
    }
    else if (lowerSt.includes('website')) {
        return <a
            className="icon"
            target="_blank"
            style={{ margin: '0 10px' }}
            href={`${window.location.origin}/user-profile/asdasdasdas/onstore/readyToSell`}
        >
            <GlobalOutlined />
        </a>
    }
    else {
        return <a
            title={url}
            className="icon"
            target="_blank"
            style={{ marginRight: '10px' }}
            href={url}
        >
            <img className="icon" style={{ width: '24px' }} src={IconLink} />
        </a>
    }
}
const StyledSocial = styled.div`
    display: flex;
    height:20px;
    a{
        display:flex;
        font-size:24px;
    }
    .icon{
        display: flex;
    align-items: center;
    }
`
export default GetTypeSocial
