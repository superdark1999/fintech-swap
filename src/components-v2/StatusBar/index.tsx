import React from 'react'
import { SyncOutlined,CheckOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import {StatusBarStyled} from './styled'
import Auction from 'assets/images/auction.svg'
function StatusBar(props:any) {
    const {type,label} = props
    return <StatusBarStyled>
        {type == 'processing' && 
        <div className="status-processing">
            <SyncOutlined />{label}
          </div>
        }
        {type == 'approved' && 
        <div className="status-approved">
            <CheckOutlined />{label}
          </div>
        }
        {type == 'selling' && 
        <div className="status-approved">
            <ShoppingCartOutlined />{label}
          </div>
        }
        {type == 'bidding' && 
        <div className="status-approved">
            <img src={Auction}/>{label}
          </div>
        }
    </StatusBarStyled>
}

export default StatusBar
