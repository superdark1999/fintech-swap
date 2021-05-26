import React, { useCallback, useState, useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Page from './components/Page'
import PageHeader from './components/PageHeader'
import { useWeb3React } from '@web3-react/core'
import { getWeb3NoAccount } from '../../wallet/utils/web3';
import Web3 from 'web3'
 import useWeb3 from '../../wallet/hooks/useWeb3';

import styled from 'styled-components'
const TEST_NET_URL = "https://data-seed-prebsc-1-s1.binance.org:8545";
const Airdrop: React.FC = () => {
  const { library } = useWeb3React()
  const [web3, setweb3] = useState(library ? new Web3(library) : getWeb3NoAccount())
  const onClick = () => {
    const luckyContract = new web3.eth.Contract(
      [
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address"
            },
            {
              internalType: "string",
              name: "_tokenURI",
              type: "string"
            }
          ],
          name: "mint",
          outputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256"
            }
          ],
          stateMutability: "payable",
          type: "function"
        }
      ],
      "0xa75556C5b07e88119d7979761D00b8a55A1Bc315"
    );
    console.log(luckyContract);
    luckyContract.methods
      .mint(
        "0x09D0A2963D27B27C234b3637C528eCB9356B8867",
        "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/053c81870f174007ae2ab7d36209c8c0.jpg"
      )
      .send({
        gas: 2350000,
        from: "0x09D0A2963D27B27C234b3637C528eCB9356B8867",
        value: 1000000000000000
      });
  };
  return (
    <Switch>
      <Page>
        <>
          <BgReclamation>
            <PageHeader
              icon={<img src={''} height="140" />}
              subtitle=""
              title="NFT Supermarket"
            />
            {/* <CountDown timeCountDown={'2021-04-10 10:00:01'} /> */}
            <div
              style={{
                color: 'white',
                alignItems: 'center',
                margin: '0 5% 1%',
                textAlign: 'center',
                marginBottom: '10px',
              }}
            >
              A market made for NFT, will comming soon! 😋
            </div>
            <div className="container" onClick={onClick}>
              <div className="sc-cLxPOX dELGKo">
                <div className="sc-gqjmRU sc-kkGfuU sc-ekHBYt iVWuyI">
                  <div className="sc-eTyWNx khqPmX">Digital Artworks:</div>
                  <a
                    aria-current="page"
                    className="sc-ccXozh gkOVcH ACTIVENAV active"
                  >
                    BSC Artists
                  </a>
                  <a className="sc-ccXozh gkOVcH">Seascape</a>
                  <a className="sc-ccXozh gkOVcH">Binance NFT</a>
                  <a className="sc-ccXozh gkOVcH">BTC Artworks</a>
                </div>

                {/* <div className="sc-gqjmRU sc-kkGfuU sc-ekHBYt iVWuyI">
                  <div className="sc-eTyWNx khqPmX">Meme Competition:</div>

                  <a className="sc-ccXozh gkOVcH" >
                    LUCKY&amp;Banana
                  </a>
                  <a className="sc-ccXozh gkOVcH">
                    Musk&amp;Doge
                  </a>
                </div>
                <div className="sc-gqjmRU sc-kkGfuU sc-ekHBYt iVWuyI">
                  <div className="sc-eTyWNx khqPmX">NFT in Games:</div>
                  <a
                    aria-current="page"
                    className="sc-ccXozh gkOVcH active"
                  >
                    Lucky Combos
                  </a>
                  <a className="sc-ccXozh gkOVcH" >
                    Battle Pets
                  </a>
                  <a className="sc-ccXozh gkOVcH" >
                    Weapons
                  </a>
                  <a className="sc-ccXozh gkOVcH" >
                    Pet Eggs
                  </a>
                </div>
                <div className="sc-gqjmRU sc-kkGfuU sc-ekHBYt iVWuyI">
                  <div className="sc-eTyWNx khqPmX">Miscellaneous:</div>
                  <a
                    className="sc-ccXozh gkOVcH"
                  >
                    Lucky Soccer
                  </a>
                </div> */}
              </div>
              <div className="sc-Kgodr kIFAVa">
                <div className="sc-gqjmRU sc-kkGfuU sc-dqvjwr oyjPD">
                  <a className="sc-gDPesD TIHxH" href="#/my-new-artworks">
                    <div className="css-1ppgej9">My Artworks</div>
                  </a>
                  <a
                    className="sc-gDPesD ckrwTr"
                    color="#D6A485"
                    href="#/mint-artworks"
                  >
                    <div className="css-1ppgej9">Mint Artworks</div>
                  </a>
                </div>
                <div
                  className="sc-gqjmRU sc-kkGfuU sc-dqvjwr oyjPD"
                  style={{ justifyContent: 'flex-end' }}
                >
                  {/* <div className="sc-gqjmRU sc-kkGfuU sc-iAyFgw sc-iKpIOp fYPTyP">
                    <input className="sc-AqAhp IhSIx" />
                    <div className="sc-cClmTo fLjvfz">
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANaSURBVHgBvVfNTttAEJ5d21Gq0ioSvdccWgUuNU9QuLW3RMHQnoAnKDxBkicAnqDpCZqEJjwB4QkACaWpeqh752CpEqKJvdvZmET+2cSOoXyHKB7P7nw7MzszJjADPhf03FNN0wE0gzNuU8JtxwHrY7tnQUqQOAVh9Lma/cQp3cJHXa7FLeCkw2BwsN74eQEzgEw1nHlS5kB2YBZwqA0GrJrUK1ICdXPJQPe28LUOKcGZu2s2f+zH6UUIfCvlN5lCa9JNCfwmnHfQK5a3mOsA1MA3b6SbM1YpNXtVSErAOzmcRwwDnAGlFfPoqiPbpPUhr7uMVHC7zcjaGE+MCRziJhojp363EyA2d9n22vH3NiSAIMIYPeWhZGV8sDwpOenoj+qdQPcbp5yvJjUuUDzqWZSyVTyVFTSi7k1aM/SAd3r6K/CCw3ap0a1BCtx54hw9kRvJOGOrZrPXCesOPaC5dCdkvJbWuIDwBAM4COxJSFmm64WAwFu/0MWCAveE2s/so3ttH4MVUVsiBFoFQwiNsR7Gb9ZqJkOxfWFz4Cd+2bPMk5UIAUd1DL+AcX4JDwRCIHAQzqKlnBLq5kKr7n36sUEevA1oLRoCJhE+GAGm2HE6lDjUCgg4vIQHAlVcI1ZHVR3LL8B6H7soKRgP7oW9IxJeKu5s4LrgjZBdlzTAfQPXW+lLCIgfTJYvfuFcJjvbDCBB3cxvhdr5RVEyI9wRoIF6T4CW6+ar1KEQpZ2GKh9WV2lxGxIwm9hmcaQKvCBq67CQ1yEFsK/sBRsbWJNK+7gbKoq7HcwFomsZcjoLCZE7TXMRWzoU/HIMcWfSGmX05+vVtb2x+OIvFqJ3PhI5hZKtjaX57PvXc5cnPft20kYi5llVO8T10dDhzdpYnId69/os+iqExvpSBYWyzoXewXGMwBlzvApHhkWM4xQ1nIRib45sRJMOpVNI3BthElSmZNa7FYWyhfBkk8iAWDMh4wXw+6JyvJYvTyUgIApUqd5dEJPRcCiNgdDBoWOX9m+W1xrdHXyuJiER+2U0Qgsz3MnOGTgnGtiyh/HG2Nsufp5ptzftYtuKNJ64UIphNTGBtJhOghf/O4FpJJQ+W6DwCBBJHc4JDqwqesOjeGAE7wtKM5T+n84oZ/4BNm1fdFRs834AAAAASUVORK5CYII="
                        alt=""
                      />
                    </div>
                  </div> */}

                  <div className="sc-kXeGPI KXbuH">
                    <div color="#FFF3E0" className="sc-ugnQR eZIlpI">
                      All
                    </div>
                    <img
                      src="https://www.bakeryswap.org/static/media/icon_arrow_tab.6c2903d3.svg"
                      alt="icon"
                      className="sc-eIHaNI ivwidW"
                    />
                    <input className="sc-fyjhYU cSmoqZ" />
                  </div>

                  <div className="sc-kXeGPI bjtJEK">
                    <div color="#FFF3E0" className="sc-ugnQR eZIlpI">
                      Price
                    </div>
                    <img
                      src="https://www.bakeryswap.org/static/media/icon_arrow_tab.6c2903d3.svg"
                      alt="icon"
                      className="sc-eIHaNI ivwidW"
                    />
                    <input className="sc-fyjhYU cSmoqZ" />
                  </div>
                </div>
              </div>
              <div className="sc-efAmGo eUsbmH">
                <div className="sc-iAVDmT duOaUE fourItem">
                  <button className="izUxpQ">Approve Vote</button>
                  <div className="sc-bcdylZ umKQC">
                    <div className="sc-fuzEkO">
                      <img width="244px" src="images/nft1.jpeg" />
                    </div>{' '}
                  </div>
                  <div className="sc-fYvWhK djdIQS">
                    <div className="sc-cdQEHs kOzzdi">
                      Role Play — Peking Opera Masks
                    </div>
                    <div className="sc-ieSwJA eCUJpF">
                      <div className="css-1rk6vdc">Price:</div>
                      <div className="css-ag8sih">0 LUCKY</div>
                    </div>
                    <div className="sc-ieSwJA eCUJpF">
                      <div>
                        <div className="css-ag8sih">0</div>
                      </div>
                    </div>
                    <button className="sc-gqjmRU gacWOr sc-gipzik sc-csuQGl KHzow sc-jjgyjb jBrBZz">
                      Comming soon
                    </button>
                  </div>
                </div>
                <div className="sc-iAVDmT duOaUE fourItem">
                  <button className="izUxpQ">Approve Vote</button>
                  <div className="sc-bcdylZ umKQC">
                    <div className="sc-fuzEkO">
                      <img width="244px" src="images/nft2.jpeg" />
                    </div>
                  </div>
                  <div className="sc-fYvWhK djdIQS">
                    <div className="sc-cdQEHs kOzzdi">
                      Surreal Bitcoin—Salute to Dalí
                    </div>
                    <div className="sc-ieSwJA eCUJpF">
                      <div className="css-1rk6vdc">Price:</div>
                      <div className="css-ag8sih">0 LUCKY</div>
                    </div>
                    <div className="sc-ieSwJA eCUJpF">
                      <div>
                        <div className="css-ag8sih">0</div>
                      </div>
                    </div>
                    <button className="sc-gqjmRU gacWOr sc-gipzik sc-csuQGl KHzow sc-jjgyjb jBrBZz">
                      Comming soon
                    </button>
                  </div>
                </div>
                <div className="sc-iAVDmT duOaUE fourItem">
                  <button className="izUxpQ">Approve Vote</button>
                  <div className="sc-bcdylZ umKQC">
                    <div className="sc-fuzEkO">
                      <img width="244px" src="/images/nft3.svg" />
                    </div>{' '}
                  </div>
                  <div className="sc-fYvWhK djdIQS">
                    <div className="sc-cdQEHs kOzzdi">Pet Eggs</div>
                    <div className="sc-ieSwJA eCUJpF">
                      <div className="css-1rk6vdc">Price:</div>
                      <div className="css-ag8sih">0 LUCKY</div>
                    </div>
                    <div className="sc-ieSwJA eCUJpF">
                      <div>
                        <div className="css-ag8sih">0</div>
                      </div>
                    </div>
                    <button className="sc-gqjmRU gacWOr sc-gipzik sc-csuQGl KHzow sc-jjgyjb jBrBZz">
                      Comming soon
                    </button>
                  </div>
                </div>
                <div className="sc-iAVDmT duOaUE fourItem">
                  <button className="izUxpQ">Approve Vote</button>
                  <div className="sc-bcdylZ umKQC">
                    <div className="sc-fuzEkO">
                      <img width="244px" src="images/nft4.jpeg" />
                    </div>{' '}
                  </div>
                  <div className="sc-fYvWhK djdIQS">
                    <div className="sc-cdQEHs kOzzdi">Lying Buddha</div>
                    <div className="sc-ieSwJA eCUJpF">
                      <div className="css-1rk6vdc">Price:</div>
                      <div className="css-ag8sih">0 LUCKY</div>
                    </div>
                    <div className="sc-ieSwJA eCUJpF">
                      <div>
                        <div className="css-ag8sih">0</div>
                      </div>
                    </div>
                    <button className="sc-gqjmRU gacWOr sc-gipzik sc-csuQGl KHzow sc-jjgyjb jBrBZz">
                      Comming soon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </BgReclamation>
        </>
      </Page>
    </Switch>
  )
}

const BgReclamation = styled.div`
  width: 100%;
  height: auto;
`

const ButtonBox = styled.div``

const BackgroundUnlock = styled.div``

export default Airdrop
