import React, { useMemo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { AutoRenewIcon } from '@luckyswap/uikit'
import { ethers } from 'ethers'
import styled from 'styled-components'
import { Button } from 'reactstrap'
import { useWeb3React } from '@web3-react/core'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import bep20Abi from 'config/abi/erc20.json'
import useGetPublicIfoData from 'hooks/useGetPublicIfoData'
import useOldApproveConfirmTransaction from 'hooks/useOldApproveConfirmTransaction'
import { useContract, useIfoContract } from 'hooks/useContract'
import getTimePeriods from 'utils/getTimePeriods'
import { useToast } from 'state/hooks'
import { BASE_API_ADMIN } from 'config'
import { isTransactionRecent, useAllTransactions, useTransactionAdder } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import ifoAbi from 'config/abi/ifo.json'
import { useHookIFOs } from '../../Store'
import CardValue from '../../../Home/components/CardValue'

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

// const activeIfo = ifosConfig.find((ifo) => ifo.isActive)
const LoadingIfo = () => {
  const [state, actions] = useHookIFOs()
  const param: any = useParams()
  useEffect(() => {
    actions.getDetailLaunch(param?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (state.detailLaunchpad) {
    return <IfoTitle activeIfo={state.detailLaunchpad} />
  }
  return <div>loading</div>
}
const IfoTitle = ({ activeIfo }: any) => {
  const [balance, setBalance] = useState(0)
  const [isApproved, setIsApproved] = useState(false)
  const [isWaningAllowedDepositAmount, setIsWaningAllowedDepositAmount] = useState(false)
  const [value, setValue] = useState('')

  const { banner, social, sympol, description, name, address, currency, currencyAddress } = activeIfo
  const contract = useIfoContract(address)
  const {
    offeringAmount,
    raisingAmount,
    secondsUntilStart,
    maxDepositAmount,
    depositedAmount,
    claimAmount,
    secondsUntilEnd,
    status,
    startBlockNum,
  } = useGetPublicIfoData(activeIfo)
  const { account } = useWeb3React()
  const LPContract = useContract(currencyAddress, bep20Abi)
  const raisingTokenContract = useContract(address, ifoAbi)

  const valueWithTokenDecimals = new BigNumber(value).times(new BigNumber(10).pow(18))
  const maxDeposit = maxDepositAmount.div(1e18).toNumber() - depositedAmount.div(1e18).toNumber()
  const TranslateString = useI18n()
  const countdownToUse = status === 'coming_soon' ? secondsUntilStart : secondsUntilEnd
  const suffix = status === 'coming_soon' ? 'start' : 'finish'

  const timeUntil = getTimePeriods(countdownToUse)

  const priceRate =
    offeringAmount.toNumber() && raisingAmount.toNumber() ? `${offeringAmount.div(raisingAmount).toFixed(2)}` : '?'

  const addTransaction = useTransactionAdder()

  useEffect(() => {
    if (account) {
      LPContract.balanceOf(account)
        .then((data) => {
          setBalance(parseFloat((data / 1e18).toFixed(4)))
        })
        .catch((error) => {
          console.log('Error fetching balance')
        })
      //   const filter = LPContract.filters.Approval(account);

      //   LPContract.on(filter, (author, oldValue, newValue, event) => {
      //     console.log("on filter", filter)
      //     console.log("on author", author)
      //     console.log("on oldValue",  oldValue)
      //     console.log("on newValue",  newValue)
      //     console.log("on event", event)
      // })
      // LPContract.on('')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  useEffect(() => {
    const fetchApprovalData = async () => {
      if (account && LPContract) {
        try {
          const response = await LPContract?.allowance?.(account, contract.options.address)
          setIsApproved(response.toString() !== '0')
        } catch (error) {
          console.log(' error fetch approval data')
        }
      }
    }

    fetchApprovalData()
  }, [account, contract.options.address, LPContract])

  const { toastSuccess, toastError } = useToast()

  const handleContributeSuccess = (amount: BigNumber) => {
    toastSuccess('Success!', `You have contributed ${getBalanceNumber(amount)} CAKE-BNB LP tokens to this IFO!`)
    // addUserContributedAmount(amount)
  }

  const {
    isApproving,
    isConfirmed,
    isConfirming,
    handleApprove,
    // handleConfirm,
  } = useOldApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const response = await LPContract.allowance(account, contract.options.address).then((data) => {
          return data
        })
        return response.toString() !== '0'
      } catch (error) {
        return false
      }
    },
    onApprove: async () => {
        LPContract.approve(contract.options.address, ethers.constants.MaxUint256).then(async(response) =>{
        addTransaction(response, {
          summary: 'Approve successfully!',
        })
        
        
      })
      LPContract.on("Approval", async(oldValue, newValue, event) => {
        console.log("approval event");
        try {
          const result = await LPContract?.allowance?.(account, contract.options.address)
          console.log("result ",result);
          setIsApproved(result.toString() !== '0')
        } catch (error) {
          console.log('Error fetch approval data')
        }
  
      })

      


    },

    onConfirm: () => {
      return raisingTokenContract.depositWithoutWhitelist(valueWithTokenDecimals.toString())
    },
    onSuccess: async () => {
      // onDismiss()
      handleContributeSuccess(valueWithTokenDecimals)
    },
  })

  const handleConfirm = async () => {
    try {
      await raisingTokenContract.estimateGas.depositWithoutWhitelist(valueWithTokenDecimals.toString())
      // console.log("estimate", estimate)
    } catch (error) {
      toastError(error.data.message)
    }
    await raisingTokenContract.depositWithoutWhitelist(valueWithTokenDecimals.toString()).then((response) => {
      addTransaction(response, {
        summary: 'Deposit successfully!',
      })
    })

    raisingTokenContract.on("Deposit", (oldValue, newValue, event) => {
      if (account) {
        LPContract.balanceOf(account)
        .then((data) => {
          setBalance(parseFloat((data / 1e18).toFixed(4)))
        })
        .catch(error => {
          console.log("Error fetching balance")
        })
      }

    })


  }

  const handleWhitelistCheck = async () => {
    try {
      const result = await raisingTokenContract.whitelist(account)

      // new BigNumber(result._hex).toNumber()
      if (result._hex !== '0x00')
        // amount for whitelist member = !0
        toastSuccess('Yeah!, You are a member of Whitelist')
      else toastSuccess("Huhu, You aren't member of Whitelist")
    } catch (err) {
      toastError('Wrong somethings')
    }
  }

  const handleClaim = async () => {
    try {
      await raisingTokenContract.harvest().then((response) => {
        addTransaction(response, {
          summary: 'Claim successfully!',
        })
      })
    } catch (err) {
      toastError('Not thing to claim')
    }
  }

  const handleChangeAmount = (e) => {
    if (e.target.value > maxDeposit) setIsWaningAllowedDepositAmount(true)
    else setIsWaningAllowedDepositAmount(false)
    setValue(e.target.value)
  }

  const handleMaxAmount = () => {
    if ( maxDeposit > balance)
      setValue(balance.toString());
    else
      setValue(maxDeposit.toString());

  }

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const getStatus = () => {
    const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
    return !!pending.length
  }
  return (
    <>
      <TitleDetail>
        <h2>{name}</h2>
      </TitleDetail>
      <BoxIfoDetail>
        <img src={BASE_API_ADMIN + banner} alt="" />

        <BoxContent>
          <div className="two-column">
            <div className="two-column-left">
              <h3>{name}</h3>

              <BoxSocial>
                <a rel="noreferrer" target="_blank" href={social && social.twitter}>
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                  >
                    <path
                      style={{ fill: '#03A9F4' }}
                      d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
              c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
              c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
              c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
              c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
              c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
              C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
              C480.224,136.96,497.728,118.496,512,97.248z"
                    />
                  </svg>
                </a>
                <a rel="noreferrer" target="_blank" href={social && social.medium}>
                  <svg
                    id="Bold"
                    enableBackground="new 0 0 24 24"
                    height={512}
                    viewBox="0 0 24 24"
                    width={512}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m22.085 4.733 1.915-1.832v-.401h-6.634l-4.728 11.768-5.379-11.768h-6.956v.401l2.237 2.693c.218.199.332.49.303.783v10.583c.069.381-.055.773-.323 1.05l-2.52 3.054v.396h7.145v-.401l-2.52-3.049c-.273-.278-.402-.663-.347-1.05v-9.154l6.272 13.659h.729l5.393-13.659v10.881c0 .287 0 .346-.188.534l-1.94 1.877v.402h9.412v-.401l-1.87-1.831c-.164-.124-.249-.332-.214-.534v-13.467c-.035-.203.049-.411.213-.534z" />
                  </svg>
                </a>
                <a rel="noreferrer" target="_blank" href={social && social.telegram}>
                  <svg
                    enableBackground="new 0 0 24 24"
                    height={512}
                    viewBox="0 0 24 24"
                    width={512}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z"
                      fill="#039be5"
                    />
                  </svg>
                </a>
              </BoxSocial>
            </div>

            <div className="two-column-right">
              <Dflex>
                <div>IDO Amount:</div>
                <div className="font-bold">
                  <CardValue
                    bold
                    color=""
                    value={offeringAmount.div(1e18).toNumber()}
                    decimals={0}
                    fontSize="10px"
                    text={sympol}
                    fontWeight="600"
                  ></CardValue>
                </div>
              </Dflex>

              <Dflex>
                <div>Supported Coin:</div>
                <div className="font-bold">{currency}</div>
              </Dflex>

              <Dflex>
                <div>Price:</div>
                <div className="font-bold">
                  {priceRate} {currency}
                </div>
              </Dflex>

              <Dflex>
                <div> Start Block:</div>
                <div className="font-bold">{startBlockNum}</div>
                {/* <div className="font-bold">{`${timeStart.days}d, ${timeStart.hours}h, ${timeStart.minutes}m until Start`}</div> */}
              </Dflex>

              <Dflex>
                <div>Max Deposit:</div>
                <div className="font-bold">
                  {maxDeposit} {currency}
                </div>
              </Dflex>
              <Dflex>
                <div>Your claim amount:</div>
                <div style={{ color: 'red' }} className="font-bold">
                  <CardValue
                    bold
                    value={claimAmount.div(1e18).toNumber()}
                    decimals={2}
                    fontSize="10px"
                    fontWeight="600"
                    text={sympol}
                  ></CardValue>
                </div>
              </Dflex>
              <Dflex>
                <div>Time:</div>
                <div className="font-bold">{`${timeUntil.days}d, ${timeUntil.hours}h, ${timeUntil.minutes}m until ${suffix}`}</div>
              </Dflex>
            </div>
          </div>
        </BoxContent>

        <BoxForm>
          <button className="whitelist" type="submit" onClick={handleWhitelistCheck}>
            Whitelist Check
          </button>
          <div className="box-input">
            <div className="d-flex">
              <div className="box-max">
                <div className="balance">
                  Balance:{' '}
                  <CardValue bold color="" value={balance} decimals={0} fontSize="10px" fontWeight="600"></CardValue>
                  {currency}
                </div>
                <input
                  disabled={getStatus()}
                  className="input-max"
                  type="text"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0.0"
                  value={value}
                  onChange={(e) => handleChangeAmount(e)}
                />
                <button className="max-btn" type="submit" onClick={handleMaxAmount}>
                  Max
                </button>
                <div className="line"></div>
                <div className="box-bnb">
                  <p>{currency}</p>
                  <input type="text" />
                </div>
              </div>
            </div>
            {isWaningAllowedDepositAmount && <div className="waning">Current amount exceeds the limit!</div>}
            {status === 'live' &&
              (!(isConfirmed || isConfirming || isApproved) ? (
                <Button
                  className={`finished ${(isConfirmed || isConfirming || isApproved) && 'disabled'}`}
                  color="primary"
                  disabled={getStatus() || isConfirmed || isConfirming || isApproved}
                  onClick={() =>
                    handleApprove()
                  }
                  endIcon={isApproving ? spinnerIcon : undefined}
                  isLoading={isApproving}
                >
                  {getStatus() && spinnerIcon}
                  {TranslateString(564, 'Approve')}
                </Button>
              ) : (
                <Button
                  className={`
                  finished ${
                    (!isApproved || isConfirmed || valueWithTokenDecimals.isNaN() || valueWithTokenDecimals.eq(0)) &&
                    'disabled'
                  }`}
                  color="primary"
                  onClick={handleConfirm}
                  disabled={
                    getStatus() ||
                    !isApproved ||
                    isConfirmed ||
                    valueWithTokenDecimals.isNaN() ||
                    valueWithTokenDecimals.eq(0)
                  }
                  isLoading={getStatus()}
                >
                  {getStatus() && spinnerIcon}
                  {TranslateString(464, 'Deposit')}
                </Button>
              ))}
            {status === 'finished' && (
              <Button className="finished" color="primary" disabled={getStatus()} onClick={handleClaim}>
                {getStatus() && spinnerIcon}
                Claim
              </Button>
            )}

            {/* <Button type="submit" className="finished" color="primary" disabled>Coming soon</Button> */}
          </div>

          <TextBot>{description}</TextBot>
        </BoxForm>
      </BoxIfoDetail>
    </>
  )
}

const TitleDetail = styled.div`
  text-align: center;
  margin: 35px;

  h2 {
    color: #fff;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-size: 32px;
    font-weight: 700;
  }
`

const BoxIfoDetail = styled.div`
  box-sizing: border-box;
  min-width: 0px;
  display: flex;
  padding: 0px;
  align-items: center;
  position: relative;
  flex-direction: column;
  margin: auto;
  width: 550px;
  height: auto;
  border-radius: 50px;
  overflow: hidden;
  background: rgb(255, 253, 250);

  @media (max-width: 768px) {
    width: auto;
    margin: 15px;
  }

  section {
    position: absolute;
    top: 24px;
    left: 0px;
    background: rgb(165, 165, 165);
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    color: rgb(255, 253, 250);
    font-family: 'Baloo Da';
    font-weight: 400;
    padding: 8px 24px;

    p {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      font-size: 18px;
    }
  }
`

const BoxContent = styled.div`
  position: relative;
  padding: 15px 32px 24px;
  width: 100%;

  .two-column {
    box-sizing: border-box;
    margin: 0px 0px -23px;
    min-width: 0px;
    width: 100%;
    display: flex;
    padding: 0px 0px 22px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(43 44 58);

    @media (max-width: 768px) {
      flex-direction: column;
    }

    &-left {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0px;
      align-items: flex-start;

      h3 {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: normal;
        font-size: 26px;
        color: rgb(48 48 65);
        font-weight: 600;
      }
    }

    &-right {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      width: 100%;
      display: flex;
      padding: 0px;
      flex-direction: column;
      align-items: center;
    }
  }
`

const Dflex = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 6px 0px;
  align-items: center;
  justify-content: space-between;
  div {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 400;
    font-size: 14px;
    color: rgb(48 48 65);

    &.font-bold {
      font-weight: 600;
    }
  }
`

const BoxForm = styled.div`
  position: relative;
  padding: 15px 32px 24px;
  width: 100%;

  button.whitelist {
    position: absolute;
    padding: 0px;
    top: 18px;
    width: 126px;
    height: 36px;
    box-sizing: border-box;
    border-radius: 8px;
    font-family: 'Yuanti SC';
    font-weight: bold;
    font-size: 14px;
    background: rgb(255, 253, 250);
    border: 1px solid rgb(48 48 65);
    color: rgb(48 48 65);
  }

  .box-input {
    margin: 48px 0px 0px;
    padding-bottom: 40px;
    border-bottom: 1px solid rgb(43 44 58);
  }

  .d-flex {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .box-max {
    display: flex;
    align-items: center;
    border: 1px solid rgb(43 44 58);
    border-radius: 10px;
    color: rgb(48 48 65);
    padding: 9px 16px;
    height: 48px;
    position: relative;
    width: 100%;

    .balance {
      position: absolute;
      top: -32px;
      right: 0px;
      color: rgb(48 48 65);
      font-size: 14px;
      font-weight: 700;
      div {
      }
    }

    .input-max {
      color: rgb(48 48 65);
      width: 0px;
      position: relative;
      font-weight: 500;
      outline: none;
      border: none;
      flex: 1 1 auto;
      background: none;
      font-size: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0px;
      appearance: textfield;
    }

    button.max-btn {
      background: none;
      border: none;
      cursor: pointer;
      outline: none;
      color: rgb(48 48 65);
      font-weight: 700;
      font-size: 16px;
      padding: 0px;
    }

    .line {
      margin-left: 16px;
      margin-right: 16px;
      border-left: 1px solid rgb(238, 217, 204);
      height: 24px;
    }

    .box-bnb {
      position: relative;
      margin: 0px;
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 30px;
      user-select: none;
      padding: 0px;
      border-radius: 0px;

      p {
        color: rgb(48 48 65);
        font-size: 14px;
        font-weight: 700;
        width: 100%;
      }

      input {
        position: absolute;
        top: 0px;
        left: 0px;
        cursor: pointer;
        opacity: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  button.finished {
    padding: 0px;
    font-weight: 500;
    text-align: center;
    border-radius: 10px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    background: #f5c506f9;
    color: rgb(255, 253, 250);
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: 1;
    width: 240px;
    height: 48px;
    margin: 32px auto 0px;
    /* cursor: not-allowed; */
  }
  button.disabled {
    background: #f5c6064d;
    cursor: not-allowed;
  }
  .waning {
    color: red !important;
    margin-top: 16px;
    font-size: 20px;
    font-weight: bold;
  }
`

const TextBot = styled.div`
  box-sizing: border-box;
  margin: 24px 0px 0px;
  min-width: 0px;
  font-weight: 400;
  font-size: 14px;
  color: rgb(48 48 65);
  line-height: 136%;
  letter-spacing: 0.01em;
`

const BoxSocial = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;

  a {
    border: 1px dashed #2b2c3a;
    width: 40px;
    height: 40px;
    border-radius: 50% !important;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;

    &:hover {
      background: #d9f5ff;
      transition: 0.5s;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

export default LoadingIfo
