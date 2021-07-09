import React, { useEffect, useState } from 'react'
import { Row, Col, Rate, Table, Modal, Input, Form, Image } from 'antd'
import Luckyswap from 'assets/images/luckyswap.svg'
import 'antd/dist/antd.css'
import { ReviewStyled, ScrollReview, FooterStyled } from './styled'
import { ButtonTrade, ButtonBuy } from 'components-v2/Button'

const Reviews = () => {
  return (
    <ScrollReview className="list-review">
      {/* <ReviewStyled>
        <div className="review-item">
          <div>
            <img src={Luckyswap} style={{ marginRight: 5 }} />
            <span className="name">LuckySwapStudio</span>
          </div>
          <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
        </div>
        <div className="comment">This is amazing</div>
        <div className="time">30 minutes ago</div>
      </ReviewStyled>

      <ReviewStyled>
        <div className="review-item">
          <div>
            <img src={Luckyswap} style={{ marginRight: 5 }} />
            <span className="name">LuckySwapStudio</span>
          </div>
          <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
        </div>
        <div className="comment">This is amazing</div>
        <div className="time">30 minutes ago</div>
      </ReviewStyled>

      <ReviewStyled>
        <div className="review-item">
          <div>
            <img src={Luckyswap} style={{ marginRight: 5 }} />
            <span className="name">LuckySwapStudio</span>
          </div>
          <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
        </div>
        <div className="comment">This is amazing</div>
        <div className="time">30 minutes ago</div>
      </ReviewStyled>

      <ReviewStyled>
        <div className="review-item">
          <div>
            <img src={Luckyswap} style={{ marginRight: 5 }} />
            <span className="name">LuckySwapStudio</span>
          </div>
          <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
        </div>
        <div className="comment">This is amazing</div>
        <div className="time">30 minutes ago</div>
      </ReviewStyled> */}

      <FooterStyled>
        <input placeholder="Write a comment" />
        <ButtonTrade>Send</ButtonTrade>
      </FooterStyled>
    </ScrollReview>
  )
}

export default Reviews
