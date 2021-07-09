import moment from 'moment'
import React, {useState} from 'react'
import {CartStyled} from './styled'
import { Link } from 'react-router-dom'
import { getCompactString, embedTokenIdLinkBSCScan } from 'utils'
import { useActiveWeb3React } from 'wallet/hooks'

const Tags = (tag, key) => {
    //console.log(tag, key)
    return (
      <li className="item">
        <Link to="/explore">
          <span className="value"> &nbsp; #{tag.tag}</span>
        </Link>
      </li>
    )
  }

const InfoCard = (value) => {
  const a = true
  const [zmore, setMore] = useState(true)
  const { account, chainId } = useActiveWeb3React()
  const data = value.value
  const leng = data.description.length

  console.log(zmore)
  const pushClick = (n) => {
    console.log(n)
    setMore(!n)
  }

  return (
    <CartStyled readMore={zmore} ><div className="box-flex"
     // style={{ display: 'flex', marginBottom: 10 }}
    >
      {data?.TXHash && (
        <div style={{ display: 'flex', width: '50%' }}>
          <div style={{ color: '#AFBAC5', fontWeight: 600 }}>ID: </div>
          <span  className="number">
            {getCompactString(data?.TXHash, 10)}
          </span>
        </div>
      )}
      {data?.createdAt && (
        <div style={{ display: 'flex' }}>
          <div style={{ color: '#AFBAC5', fontWeight: 600 }}>
            Date create:&nbsp;
          </div>
          <span className="date">
            {moment(data?.createdAt).format('MM/DD/YYYY HH:mm')}
          </span>
        </div>
      )}
    </div><div
      className="box-flex"
      //style={{ display: 'flex', marginBottom: 10 }}
    >
        {data?.tokenId && (
          <div style={{ display: 'flex', width: '50%' }}>
            <div style={{ color: '#AFBAC5', fontWeight: 600 }}>
              Token ID:&nbsp;
            </div>
            <a
            className="value"
            href={embedTokenIdLinkBSCScan(
              data.tokenId,
              data?.contractAddress,
              chainId,
            )}
            target="_blank">
              {data?.tokenId}
            </a>
          </div>
        )}
        <div className="organize">
          <span
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#AFBAC5',
            }}
          >
            Creator:&nbsp;
          </span>
          <a
            className="value"
            style={{ lineHeight: '24px', fontWeight: 'unset'}}
            href={`/user-profile/${data?.createdBy?.walletAddress}/onstore/readyToSell`}
            target="_blank"
          >
            {data?.createdBy?.name
              ? data?.createdBy?.name
              : data?.createdBy?.walletAddress}
          </a>
        </div>
      </div>
      <div
        className="box-flex"
        //style={{ display: 'flex', marginBottom: 10 }}
      >
        {data?.type && (
          <div
            style={{ display: 'flex', width: '50%' }}
          >
            <div style={{ color: '#AFBAC5', fontWeight: 600 }}>
              Type:&nbsp;
            </div>
            <span className="type">
              {data?.type}
            </span>
          </div>
        )}
        {data?.tags && (
          <div style={{ display: 'flex' }}>
            <div style={{ color: '#AFBAC5', fontWeight: 600 }}>
              Tags:&nbsp;
            </div>
            <ul className="tags">
              <React.Fragment>
                {data?.tags.map((item, i) => {
                  return <Tags tag={item} key={i} />
                })}
              </React.Fragment>
            </ul>
          </div>
        )}
      </div>
      {data?.description && (
              <div className="intro">
                <div style={{ color: '#AFBAC5', fontWeight: 600 }}>
                Introduction:&nbsp;
                </div>
                <div className="des">
                  {data?.description}
                  
                </div>
                {leng > 75 ?
                   <span onClick={()=> pushClick(zmore)} className="readMore">readMore</span>
                   :""}
              </div>
        )}
      </CartStyled>        
  )  
}


export default InfoCard
