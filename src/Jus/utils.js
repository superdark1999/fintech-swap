import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import SellTokenAbi from './lib/abi/sellToken.json'
import { contractAddresses } from './lib/constants'
import JusTokenAbi from './lib/abi/xjus'
import { getBalance } from '../utils/erc20'
import { NETWORK_CHAIN_ID, PRICE_JUS } from '../constants'
import moment from 'moment'
const addressAdmin = '0xc8140D31eD7cA4407cB9e616A0e18357b1630c6E'
const sellContract = contractAddresses.sellContract[NETWORK_CHAIN_ID]
console.log('sellContract.>',sellContract)
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const getMasterChefAddress = (jus) => {
  return jus && jus.masterChefAddress
}
export const getJusAddress = (jus) => {
  return jus && jus.jusAddress
}
export const getWethContract = (jus) => {
  return jus && jus.contracts && jus.contracts.weth
}

export const getStakingContract = (jus) => {
  return jus && jus.contracts && jus.contracts.stakingContract
}

export const getMasterChefContract = (jus) => {
  return jus && jus.contracts && jus.contracts.masterChef
}

export const getYieldContract = (jus) => {
  return jus && jus.contracts && jus.contracts.yield
}

export const getSellPrivateContract = (jus) => {
  return jus && jus.contracts && jus.contracts.sellPrivate
}

export const getJusContract = (jus) => {
  return jus && jus.contracts && jus.contracts.jus
}

export const getXJusStakingContract = (jus) => {
  return jus && jus.contracts && jus.contracts.xJusStaking
}

export const getFarms = (jus) => {
  return jus
    ? jus.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
          colorBg,
          icon1,
          icon2
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'JUS',
          earnTokenAddress: jus.contracts.jus.options.address,
          icon,
          icon1,
          icon2,
          colorBg,
        }),
      )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (yieldContract, pid, account) => {
  return yieldContract.methods.pendingReward(pid, account).call()
}

export const getTotalLPWethValue = async (
  yieldContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  const priceJJUS = PRICE_JUS
  let { totalJUS, totalJLP } = await yieldContract.methods.poolInfo(pid).call()  
  let totalMintCurrent = await yieldContract.methods.totalMintCurrent().call()
  let dayInitContract = await yieldContract.methods.dayInitContract().call()
  dayInitContract = new Date(dayInitContract * 1000)
  const currentDay = new Date()
  const days = moment(currentDay).diff(moment(dayInitContract), 'days')
  let result = new BigNumber(totalMintCurrent).div(1e18).div(days).div(priceJJUS)
  let partHalf = new BigNumber(totalJLP).div(1e18).times(0.1)
  result = result.div(partHalf)
  result = result.multipliedBy(365)
  // // Get balance of the token address
  // const tokenAmountWholeLP = await tokenContract.methods
  //   .balanceOf(lpContract.options.address)
  //   .call()

  // const tokenDecimals = await tokenContract.methods.decimals().call()
  // // Get the share of lpContract that masterChefContract owns
  // const balance = await lpContract.methods
  //   .balanceOf(masterChefContract.options.address)
  //   .call()
  // // Convert that into the portion of total lpContract = p1
  // const totalSupply = await lpContract.methods.totalSupply().call()
  // // Get total weth value for the lpContract = w1
  // const lpContractWeth = await wethContract.methods
  //   .balanceOf(lpContract.options.address)
  //   .call()
  // // Return p1 * w1 * 2
  // const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  // const lpWethWorth = new BigNumber(lpContractWeth)
  // const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // // Calculate
  // const tokenAmount = new BigNumber(tokenAmountWholeLP)
  //   .times(portionLp)
  //   .div(new BigNumber(10).pow(tokenDecimals))

  // const wethAmount = new BigNumber(lpContractWeth)
  //   .times(portionLp)
  //   .div(new BigNumber(10).pow(18))
  return {
    tokenAmount: new BigNumber(0), //tokenAmount
    wethAmount: new BigNumber(0), //wethAmount
    totalWethValue: new BigNumber(0), //totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: new BigNumber(0), // wethAmount.div(tokenAmount),
    poolWeight: new BigNumber(0), //await getPoolWeight(masterChefContract, pid),
    apy: result,
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
    .approve(address, ethers.constants.MaxUint256)
    .send({ from: account })
}



export const getJusSupply = async (jus) => {
  return new BigNumber(await jus.contracts.jus.methods.totalSupply().call())
}

export const getLuckyBalance = async (jus,userAddress) => {
  return new BigNumber(await jus.contracts.jus.methods.balanceOf(userAddress).call())
}

export const getXJusSupply = async (jus) => {
  return new BigNumber(
    await jus.contracts.xJusStaking.methods.totalSupply().call(),
  )
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (yieldContract, pid, account) => {
  return yieldContract.methods
    .harvest(pid)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getJusMint = async (yieldContract) => {
  try {
    const data = await yieldContract.methods
      .getPoint()
      .call()
    return new BigNumber(data)
  } catch {
    return new BigNumber(0)
  }
}

export const getStaked = async (yieldContract, pid, account) => {
  try {
    const { totalJLP } = await yieldContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(totalJLP)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const enter = async (contract, amount, account) => {
  debugger
  return contract.methods
    .enter(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const leave = async (contract, amount, account) => {
  return contract.methods
    .leave(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

const concatBy = function (list, delimiter, by) {
  var result = []
  for (var i = 0; i < list.length; i += by) {
    result.push(list.slice(i, i + by).join(delimiter))
  }
  return result
}

export const getInfoAccount = async (jus, addressRefer) => {
  return new Promise(async (resolve, rejects) => {
    let data = {
      address: '',
      totalJUS: '',
      totalETHDeposit: '',
      listOrder: [],
      summaryETH:''
    }
    if (jus) {
      let walletAddress = jus.web3.eth.defaultAccount
      const contract = new jus.web3.eth.Contract(SellTokenAbi, sellContract, {
        from: walletAddress,
      })

      // get info user JUS
      await contract.methods
        .users(walletAddress)
        .call({ from: walletAddress }, function (err, res) {
          if (err) {
            console.log('An error occured', err)
          }
          data = {
            ...data,
            address: walletAddress,
            totalLUCKY: res && res.totalLUCKY,
            totalETHDeposit: res && res.totalETH,
            totalLUCKYDeposit: res && res.totalLUCKYDeposit,
            totalREF: res && res.totalREF,
            totalLUCKYBlock:res && res.totalLUCKYBlock
          }
        })
           // get info user JUS
      await contract.methods
      .totalETHDeposit()
      .call({ from: walletAddress }, function (err, res) {
        if (err) {
          console.log('An error occured', err)
        }
        const totalETHSale =1000;
        data = {
          ...data,
          summaryETH: (((res/1e18)/totalETHSale)*100).toFixed(4),
        }
      })
      if (addressRefer) {
        // get info user reference
        await contract.methods
          .getUser(addressRefer)
          .call({ from: walletAddress }, function (err, res) {
            if (err) {
              console.log('An error occured', err)
            }
            // update user
            data = {
              ...data,
              referLevel: res.refLevel && parseInt(res.refLevel) + 1,
            }
          })
      }

      // get list orders
      await contract.methods
        .getOrders(walletAddress)
        .call({ from: walletAddress }, function (err, res) {
          if (err) {
            console.log('An error occured', err)
          }
          data = {
            ...data,
            listOrderTemp: mappingOrder(
              concatBy(res && res.toString().split(','), ',', 12),
            ),
          }
        })
      resolve(data)
    }
  })
}
export const getTotalETH = async (jus, addressRefer) => {
  return new Promise(async (resolve, rejects) => {
    let data = {
      totalETH: '',
    }
    if (jus) {
      let walletAddress = jus.web3.eth.defaultAccount
      const contract = new jus.web3.eth.Contract(SellTokenAbi, sellContract, {
        from: walletAddress,
      })

      // get info balance ETH
      await jus.web3.eth.getBalance(walletAddress, (err, value) => {
        data = { totalETH: value }
      })
      resolve(data)
    }
  })
}
const mappingOrder = (data) =>
  data.map((item) => {
    const arr = item.split(',')
    return {
      id: parseInt(arr[0]),
      address: arr[1],
      createdDate: arr[2],
      amountETH: arr[3],
      t1: arr[4],
      t2: arr[5],
      t3: arr[6],
      t4: arr[7],
      t5: arr[8],
      reward: arr[8],
      totalBlocked: arr[9],
      timestampLastWithDraw: arr[11],
    }
  })

export const sentETHtoAddresss = (
  jus,
  value,
  addressRefer,
  referLevel,
  sellPrivateContract,
  account,
) => {
  console.log('value>>', value)
  return new Promise((resolve, reject) => {
    if (jus) {
      const data = sellPrivateContract.methods
        .buyToken(value, addressRefer, referLevel)
        .encodeABI()

      sellPrivateContract.methods
        .buyToken(value, addressRefer, referLevel)
        .estimateGas({ from: account })
        .then(function (gasAmount) {
          console.log('gasAmount>>', gasAmount)
          jus.web3.eth.sendTransaction(
            {
              to: addressAdmin,
              from: account,
              data,
              value,
              gasLimit: gasAmount,
            },
            (err, transactionHash) => {
              if (!err) {
                console.log(transactionHash + ' success')
                resolve({})
              } else {
                reject(err)
              }
            },
          )
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  })
}

export const sentERC20 = (jus, value = 0.01) => {
  return new Promise((resolve, reject) => {
    if (jus) {
      let walletAddress = jus.web3.eth.defaultAccount
      let tokenAddress = '0xD8997cA5572E879C060c25Ede47a148F9189130A'
      let toAddress = '0x2c5feAa0724dE158D0C19b77C36Da5385C67C1Bd'
      // Use BigNumber
      const contract = new jus.web3.eth.Contract(JusTokenAbi, tokenAddress, {
        from: walletAddress,
      })

      contract.methods
        .transfer(
          toAddress,
          jus.web3.utils.toWei((value * 1e18).toString(), 'wei'),
        )
        .send({ from: walletAddress })
        .on('transactionHash', (tx) => {
          console.log(tx)
          resolve(tx.transactionHash)
        })
    }
  })
}
const updateLocalstorageOrder = (orderId, milestone) => {
  localStorage.setItem(
    'order_' + orderId.toString() + '_' + milestone.toString(),
    milestone.toString(),
  )
}

export const withDrawToken = async (
  orderId,
  milestone,
  jus
) => {
  const account = jus && jus.web3.eth.defaultAccount
  const sellPrivateContract =getSellPrivateContract(jus);
  return sellPrivateContract.methods
    .withDrawToken(orderId, milestone)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}



export const sentBalanceByToken = (jus, value) => {
  return new Promise((resolve, reject) => {
    jus &&
      jus.web3.eth.sendTransaction(
        {
          from: jus.web3.eth.accounts[0],
          to: addressAdmin,
          value,
        },
        (err, transactionHash) => {
          if (!err) {
            console.log(transactionHash + ' success')
            resolve({})
          } else {
            reject(err)
          }
        },
      )
  })
}

export const getBalanceERC20 = async (jus, ethereum, tokenAddress) => {
  return new Promise(async (resolve, rejects) => {
    if (jus) {
      let account = jus.web3.eth.defaultAccount
      const balance = await getBalance(ethereum, tokenAddress, account)
      resolve(balance)
    }
  })
}

export const getAddressRefer = (jus, addressRefer) => {
  return new Promise((resolve, rejects) => {
    let walletAddress = jus.web3.eth.defaultAccount
    const contract = new jus.web3.eth.Contract(SellTokenAbi, sellContract, {
      from: walletAddress,
    })
    contract.methods
      .getUser(addressRefer)
      .call({ from: walletAddress }, function (err, res) {
        console.log('res>>',res)
        if (err) {
          console.log('An error occured', err)
        }
        resolve({
          addressRefer:
            res.refParent === '0x0000000000000000000000000000000000000000'
              ? ''
              : addressRefer,
          refLevel: res.refLevel && parseInt(res.refLevel) + 1,
        })
      })
  })
}
const convertDecimal = (jus, value) => {
  return jus.web3.utils.toWei(value.toString(), 'ether')
}
