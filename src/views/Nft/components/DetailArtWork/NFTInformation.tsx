import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import {
  DetailTabpane,
} from './styled'
import { useActiveWeb3React } from 'wallet/hooks'
import { getPrice, getCompactString, embedTokenIdLinkBSCScan } from 'utils'
import _ from 'lodash'

const NFTInformation = ({NFTDetail}:any)=>{
    const { account, chainId } = useActiveWeb3React()
    return(
        <DetailTabpane>
                <div className="group-info">
                  <div className="info">
                    <div className="title">NFT Contract ID:</div>
                    <a
                      className="value"
                      href={embedTokenIdLinkBSCScan(
                        NFTDetail.tokenId,
                        NFTDetail?.contractAddress,
                        chainId,
                      )}
                      target="_blank"
                    >
                      {getCompactString(NFTDetail?.contractAddress, 6)}
                    </a>
                  </div>
                  <div className="info">
                    <div className="title">Token ID:</div>
                    <a
                      className="value"
                      href={embedTokenIdLinkBSCScan(
                        NFTDetail.tokenId,
                        NFTDetail?.contractAddress,
                        chainId,
                      )}
                      target="_blank"
                    >
                      {NFTDetail && NFTDetail.tokenId}
                    </a>
                  </div>
                </div>
                <div className="group-info">
                  <div className="info">
                    <div className="title">Creator's Adress:</div>
                    <a
                      className="value"
                      href={`/user-profile/${NFTDetail?.createdBy?.walletAddress}/onstore/readyToSell`}
                      target="_blank"
                    >
                      {getCompactString(NFTDetail?.createdBy?.walletAddress, 6)}
                    </a>
                  </div>
                  <div className="info">
                    <div className="title">Owner Adress:</div>
                    <a
                      className="value"
                      href={`/user-profile/${NFTDetail?.ownerWalletAddress}/onstore/readyToSell`}
                      target="_blank"
                    >
                      {getCompactString(NFTDetail?.ownerWalletAddress, 6)}
                    </a>
                  </div>
                  {NFTDetail.contentInfo && <div className="info">
                    <div className="title">Dimensions:</div>
                    <a
                      className="value"
                      href='#'
                    >
                      <span>{NFTDetail?.contentInfo?.width}x{NFTDetail?.contentInfo?.height}</span>
                    </a>
                  </div>}
                </div>
              </DetailTabpane>
    )
}

export default NFTInformation