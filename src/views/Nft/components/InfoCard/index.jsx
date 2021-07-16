import moment from 'moment'
import React, { useState } from 'react'
import { CartStyled } from './styled'
import { Link } from 'react-router-dom'
import { getCompactString, embedTokenIdLinkBSCScan } from 'utils'
import { useActiveWeb3React } from 'wallet/hooks'
import { Row, Col } from 'antd'

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

  //console.log(zmore)
  const pushClick = (n) => {
    //console.log(n)
    setMore(!n)
  }

  return (
    <CartStyled readMore={zmore}>
      <Row>
        {data?.TXHash && (
          <Col sm={12} span={24}>
            <span style={{ color: '#AFBAC5', fontWeight: 600 }}>ID: </span>
            <span className="number">{getCompactString(data?.TXHash, 10)}</span>
          </Col>
        )}
        {data?.createdAt && (
          <Col sm={12} span={24}>
            <span style={{ color: '#AFBAC5', fontWeight: 600 }}>
              Date create:&nbsp;
            </span>
            <span className="date">
              {moment(data?.createdAt).format('MM/DD/YYYY HH:mm')}
            </span>
          </Col>
        )}
      </Row>
      <Row>
        {data?.tokenId && (
          <Col sm={12} span={24}>
            <span style={{ color: '#AFBAC5', fontWeight: 600 }}>
              Token ID:&nbsp;
            </span>
            <a
              className="value"
              href={embedTokenIdLinkBSCScan(
                data.tokenId,
                data?.contractAddress,
                chainId,
              )}
              target="_blank"
            >
              {data?.tokenId}
            </a>
          </Col>
        )}
        <Col sm={12} span={24}>
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
            style={{ lineHeight: '24px', fontWeight: 'unset' }}
            href={`/user-profile/${data?.createdBy?.walletAddress}/onstore/readyToSell`}
            target="_blank"
          >
            {data?.createdBy?.name
              ? data?.createdBy?.name
              : data?.createdBy?.walletAddress}
          </a>
        </Col>
      </Row>
      <Row>
        {data?.type && (
          <Col sm={12} span={24}>
            <span style={{ color: '#AFBAC5', fontWeight: 600 }}>Type:&nbsp;</span>
            <span className="type">{data?.type}</span>
          </Col>
        )}
        {data?.tags && (
          <Col sm={12} span={24} style={{display:'flex'}}>
            <span style={{ color: '#AFBAC5', fontWeight: 600 }}>Tags:&nbsp;</span>
            <ul className="tags">
              <React.Fragment>
                {data?.tags.map((item, i) => {
                  return <Tags tag={item} key={i} />
                })}
              </React.Fragment>
            </ul>
          </Col>
        )}
      </Row>
      <Row>
        {(data?.contentInfo?.width || data?.contentInfo?.height) && (
          <Col sm={12} span={24}>
            <span style={{ color: '#AFBAC5', fontWeight: 600 }}>
              Dimensions:&nbsp;
            </span>
            <span>
              {`${data?.contentInfo.width}x${data?.contentInfo.height}`}
            </span>
          </Col>
        )}
      </Row>
      {data?.description && (
        (zmore ?
        <Row>
            <Col sm={4} span={24} style={{ color: '#AFBAC5', fontWeight: 600 }}>
              Introduction:&nbsp;
            </Col>
            <Col className="des" sm={17} span={24}>{data?.description}</Col>
            <Col sm={3} span={24} onClick={() => pushClick(zmore)} className="readMore">
            &nbsp;Read more
            </Col>
          
          
        </Row>
        :
        <Row>
            <Col sm={4} span={24} style={{ color: '#AFBAC5', fontWeight: 600 }}>
              Introduction:&nbsp;
            </Col>
            <Col className="des" sm={20} span={24}>{data?.description}</Col>
        </Row>)
      )}
    </CartStyled>
  )
}

export default InfoCard
