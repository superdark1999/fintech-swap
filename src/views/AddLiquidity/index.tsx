import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { AddIcon, Button, CardBody, Text as UIKitText } from '@luckyswap/uikit'
import { Currency, currencyEquals, NATIVE, TokenAmount, WNATIVE } from '@luckyswap/v2-sdk'
import { ApprovalState } from 'config'
import { PairState } from 'data/Reserves'
import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'
import { useApproveCallback } from 'hooks/useApproveCallback'
import React, { useCallback, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Field } from 'state/mint/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from 'state/mint/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useIsExpertMode, useUserDeadline, useUserSlippageTolerance } from 'state/user/hooks'
import { calculateGasMargin, calculateSlippageAmount } from 'utils'
import { currencyId } from 'utils/currencyId'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { LightCard } from '../../components/Swap/Card'
import { AutoColumn, ColumnCenter } from '../../components/Swap/Column'
import ConnectWalletButton from '../../components/Swap/ConnectWalletButton'
import CurrencyInputPanel from '../../components/Swap/CurrencyInputPanel'
import DoubleCurrencyLogo from '../../components/Swap/DoubleLogo'
import { AddRemoveTabs } from '../../components/Swap/NavigationTabs'
import Pane from '../../components/Swap/Pane'
import { MinimalPositionCard } from '../../components/Swap/PositionCard'
import Row, { RowBetween, RowFlat } from '../../components/Swap/Row'
import TransactionConfirmationModal, {
  ConfirmationModalContent
} from '../../components/Swap/TransactionConfirmationModal'
import { useRouterContract } from '../../hooks/useContract'
import AppBody from '../AppBody'
import { Dots, Wrapper } from '../Pool/styleds'
import { ConfirmAddModalBottom } from './ConfirmAddModalBottom'
import { PoolPriceBar } from './PoolPriceBar'

export default function AddLiquidity({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
  const { account, chainId, library } = useActiveWeb3React()
  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(currencyA, WNATIVE[chainId])) ||
        (currencyB && currencyEquals(currencyB, WNATIVE[chainId]))),
  )
  const expertMode = useIsExpertMode()

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)
  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  const isValid = !error

  // modal and loading
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm
  const [showConfirm, setShowConfirm] = useState<boolean>(false)

  // txn values
  const [deadline] = useUserDeadline() // custom from users settings
  const [allowedSlippage] = useUserSlippageTolerance() // custom from users
  const [txHash, setTxHash] = useState<string>('')

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
      }
    },
    {},
  )

  const routerContract = useRouterContract()

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], routerContract?.address)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], routerContract?.address)

  const addTransaction = useTransactionAdder()

  async function onAdd() {
    if (!chainId || !library || !account || !routerContract) return

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage)[0],
    }

    const deadlineFromNow = Math.ceil(Date.now() / 1000) + deadline

    let estimate
    let method: (...args: any) => Promise<TransactionResponse>
    let args: Array<string | string[] | number>
    let value: BigNumber | null

    // console.log('Currency A : ', currencyA)

    if (currencyA?.isNative || currencyB?.isNative) {
      const tokenBIsETH = currencyB?.isNative
      estimate = routerContract.estimateGas.addLiquidityETH
      method = routerContract.addLiquidityETH
      args = [
        (tokenBIsETH ? currencyA : currencyB)?.wrapped?.address ?? '', // token
        (tokenBIsETH ? parsedAmountA : parsedAmountB).raw.toString(), // token desired
        amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        account,
        deadlineFromNow,
      ]
      value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).raw.toString())
    } else {
      estimate = routerContract.estimateGas.addLiquidity
      method = routerContract.addLiquidity
      args = [
        currencyA?.wrapped.address ?? '',
        currencyB?.wrapped.address ?? '',
        parsedAmountA.raw.toString(),
        parsedAmountB.raw.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        account,
        deadlineFromNow,
      ]
      value = null
    }

    setAttemptingTxn(true)
    // const aa = await estimate(...args, value ? { value } : {})
    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).then((response) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary: `Add ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
              currencies[Field.CURRENCY_A]?.symbol
            } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[Field.CURRENCY_B]?.symbol}`,
          })

          setTxHash(response.hash)
        }),
      )
      .catch((e) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (e?.code !== 4001) {
          console.error(e)
        }
      })
  }

  const modalHeader = () => {
    return noLiquidity ? (
      <AutoColumn gap="20px">
        <LightCard mt="20px" borderRadius="20px" style={{ background: '#bfa01b' }}>
          <RowFlat>
            <UIKitText fontSize="48px" mr="8px">
              {`${currencies[Field.CURRENCY_A]?.symbol}/${currencies[Field.CURRENCY_B]?.symbol}`}
            </UIKitText>
            <DoubleCurrencyLogo
              currency0={currencies[Field.CURRENCY_A]}
              currency1={currencies[Field.CURRENCY_B]}
              size={30}
            />
          </RowFlat>
        </LightCard>
      </AutoColumn>
    ) : (
      <AutoColumn gap="20px">
        <RowFlat style={{ marginTop: '20px' }}>
          <UIKitText fontSize="48px" mr="8px">
            {liquidityMinted?.toSignificant(6)}
          </UIKitText>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={30}
          />
        </RowFlat>
        <Row>
          <UIKitText fontSize="24px">
            {`${currencies[Field.CURRENCY_A]?.symbol}/${currencies[Field.CURRENCY_B]?.symbol} Pool Tokens`}
          </UIKitText>
        </Row>
        <UIKitText small textAlign="left" padding="8px 0 0 0 " style={{ fontStyle: 'italic' }}>
          {`Output is estimated. If the price changes by more than ${
            allowedSlippage / 100
          }% your transaction will revert.`}
        </UIKitText>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return (
      <ConfirmAddModalBottom
        price={price}
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        noLiquidity={noLiquidity}
        onAdd={onAdd}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  }

  const pendingText = `Supplying ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${
    currencies[Field.CURRENCY_A]?.symbol
  } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)} ${currencies[Field.CURRENCY_B]?.symbol}`

  const handleCurrencyASelect = useCallback(
    (currA: Currency) => {
      const newCurrencyIdA = currencyId(currA, chainId)
      if (newCurrencyIdA === currencyIdB) {
        history.push(`/add/${currencyIdB}/${currencyIdA}`)
      } else {
        history.push(`/add/${newCurrencyIdA}/${currencyIdB}`)
      }
    },
    [currencyIdB, history, currencyIdA, chainId],
  )
  const handleCurrencyBSelect = useCallback(
    (currB: Currency) => {
      const newCurrencyIdB = currencyId(currB, chainId)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          history.push(`/add/${currencyIdB}/${newCurrencyIdB}`)
        } else {
          history.push(`/add/${newCurrencyIdB}`)
        }
      } else {
        history.push(`/add/${currencyIdA || NATIVE[chainId]?.symbol}/${newCurrencyIdB}`)
      }
    },
    [currencyIdA, history, currencyIdB, chainId],
  )

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
    setTxHash('')
  }, [onFieldAInput, txHash])
  return (
    <>
      <AppBody>
        {/* <CardNav activeIndex={1} /> */}

        <AddRemoveTabs adding />
        <Wrapper>
          <TransactionConfirmationModal
            isOpen={showConfirm}
            onDismiss={handleDismissConfirmation}
            attemptingTxn={attemptingTxn}
            hash={txHash}
            content={() => (
              <ConfirmationModalContent
                title={noLiquidity ? 'You are creating a pool' : 'You will receive'}
                onDismiss={handleDismissConfirmation}
                topContent={modalHeader}
                bottomContent={modalBottom}
              />
            )}
            pendingText={pendingText}
            currencyToAdd={pair?.liquidityToken}
          />
          <CardBody>
            <AutoColumn gap="20px">
              {noLiquidity && (
                <ColumnCenter>
                  <Pane>
                    <AutoColumn gap="12px">
                      <UIKitText>You are the first liquidity provider.</UIKitText>
                      <UIKitText>The ratio of tokens you add will set the price of this pool.</UIKitText>
                      <UIKitText>Once you are happy with the rate click supply to review.</UIKitText>
                    </AutoColumn>
                  </Pane>
                </ColumnCenter>
              )}
              <CurrencyInputPanel
                value={formattedAmounts[Field.CURRENCY_A]}
                onUserInput={onFieldAInput}
                onMax={() => {
                  onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
                }}
                onCurrencySelect={handleCurrencyASelect}
                showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
                currency={currencies[Field.CURRENCY_A]}
                id="add-liquidity-input-tokena"
                showCommonBases={false}
              />
              <ColumnCenter>
                <AddIcon color="textSubtle" />
              </ColumnCenter>
              <CurrencyInputPanel
                value={formattedAmounts[Field.CURRENCY_B]}
                onUserInput={onFieldBInput}
                onCurrencySelect={handleCurrencyBSelect}
                onMax={() => {
                  onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
                }}
                showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
                currency={currencies[Field.CURRENCY_B]}
                id="add-liquidity-input-tokenb"
                showCommonBases={false}
              />
              {currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID && (
                <div>
                  <UIKitText
                    style={{ textTransform: 'uppercase', fontWeight: 600 }}
                    color="textSubtle"
                    fontSize="12px"
                    mb="2px"
                  >
                    {noLiquidity ? 'Initial prices and pool share' : 'Prices and pool share'}
                  </UIKitText>
                  <Pane>
                    <PoolPriceBar
                      currencies={currencies}
                      poolTokenPercentage={poolTokenPercentage}
                      noLiquidity={noLiquidity}
                      price={price}
                    />
                  </Pane>
                </div>
              )}

              {!account ? (
                <ConnectWalletButton />
              ) : (
                <AutoColumn gap="md">
                  {(approvalA === ApprovalState.NOT_APPROVED ||
                    approvalA === ApprovalState.PENDING ||
                    approvalB === ApprovalState.NOT_APPROVED ||
                    approvalB === ApprovalState.PENDING) &&
                    isValid && (
                      <RowBetween>
                        {approvalA !== ApprovalState.APPROVED && (
                          <Button
                            onClick={approveACallback}
                            className="bg-yellow"
                            disabled={approvalA === ApprovalState.PENDING}
                            style={{ width: approvalB !== ApprovalState.APPROVED ? '48%' : '100%' }}
                          >
                            {approvalA === ApprovalState.PENDING ? (
                              <Dots>Approving {currencies[Field.CURRENCY_A]?.symbol}</Dots>
                            ) : (
                              `Approve ${currencies[Field.CURRENCY_A]?.symbol}`
                            )}
                          </Button>
                        )}
                        {approvalB !== ApprovalState.APPROVED && (
                          <Button
                            className="btn-supply"
                            onClick={approveBCallback}
                            disabled={approvalB === ApprovalState.PENDING}
                            style={{ width: approvalA !== ApprovalState.APPROVED ? '48%' : '100%' }}
                          >
                            {approvalB === ApprovalState.PENDING ? (
                              <Dots>Approving {currencies[Field.CURRENCY_B]?.symbol}</Dots>
                            ) : (
                              `Approve ${currencies[Field.CURRENCY_B]?.symbol}`
                            )}
                          </Button>
                        )}
                      </RowBetween>
                    )}
                  <Button
                    className="btn-supply"
                    onClick={() => {
                      if (expertMode) {
                        onAdd()
                      } else {
                        setShowConfirm(true)
                      }
                    }}
                    disabled={!isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED}
                    variant={
                      !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]
                        ? 'danger'
                        : 'primary'
                    }
                  >
                    {error ?? 'Supply'}
                  </Button>
                </AutoColumn>
              )}
            </AutoColumn>
          </CardBody>
        </Wrapper>
      </AppBody>
      {pair && !noLiquidity && pairState !== PairState.INVALID ? (
        <AutoColumn style={{ minWidth: '20rem', marginTop: '1rem' }}>
          <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
        </AutoColumn>
      ) : null}
    </>
  )
}
