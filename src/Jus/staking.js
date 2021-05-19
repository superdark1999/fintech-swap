import BigNumber from 'bignumber.js'
import StakingAbi from './lib/abi/staking.json'
import { contractAddresses } from './lib/constants'
import JusTokenAbi from './lib/abi/xjus'
import { NETWORK_CHAIN_ID } from '../constants'
const addressAdmin = '0x00a30c3FFd47Ab65c803349aA60679fB25C17dE8'
const stakingContract = contractAddresses.stakingContract[NETWORK_CHAIN_ID]
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const convertDecimal = (jus, value) => {
  return jus.web3.utils.toWei(value.toString(), 'ether')
}
const convertDecimalNew = (jus, value, decimals) => {
  if (decimals === 1e18) {
    return jus.web3.utils.toWei(value.toString(), 'ether')
  }
  return (value * decimals).toString()
}
export const getStakingContract = (jus) => {
  return jus && jus.contracts && jus.contracts.stakingContract
}

export const getOrders = async (jus, addressRefer) => {
  return new Promise(async (resolve, rejects) => {
    let data = {
      referLevel: '',
      orders: null,
      walletAddress: '',
    }
    if (jus) {
      let walletAddress = jus.web3.eth.defaultAccount
      const contract = new jus.web3.eth.Contract(StakingAbi, stakingContract, {
        from: walletAddress,
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
              referLevel: res && res.refLevel && parseInt(res.refLevel) + 1,
              walletAddress,
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
            orders: res,
          }
          resolve(data)
        })
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
      const contract = new jus.web3.eth.Contract(StakingAbi, stakingContract, {
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


export const sentETHtoAddresss = (jus, value) => {
  return new Promise((resolve, reject) => {
    jus &&
      jus.web3.eth.sendTransaction(
        {
          from: jus.web3.eth.accounts[0],
          to: stakingContract,
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

export const sentERC20 = (jus, tokenAddress, value) => {
  return new Promise((resolve, reject) => {
    if (jus) {
      let walletAddress = jus.web3.eth.defaultAccount
      // Use BigNumber
      const contract = new jus.web3.eth.Contract(JusTokenAbi, tokenAddress, {
        from: walletAddress,
      })
      contract.methods
        .transfer(
          stakingContract,
          jus.web3.utils.toWei(value.toString(), 'wei'),
        )
        .send({ from: walletAddress })
        .on('transactionHash', (tx) => {
          console.log(tx)
          resolve(tx.transactionHash)
        })
    }
  })
}

export const withDrawToken = async ({
  stakingContract,
  account,
  orderId,
  amount,
  jus,
}) => {
  console.log('orderId, convertDecimal(jus, amount).>',orderId, convertDecimal(jus, amount))
  return stakingContract.methods
    .withDrawToken(orderId, convertDecimal(jus, amount))
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log('transactionHash', tx)
      return tx.transactionHash
    })
}

export const stakingToken = async ({
  stakingContract,
  amount,
  amountJUS,
  account,
  adr,
  referLevel,
  jus,
  symbol,
  price,
  percentReward,
  decimals,
  adrToken,
}) => {
  let addressRefer = adr ? adr : '0x0000000000000000000000000000000000000000'
  if (amount === adr) {
    addressRefer = '0x0000000000000000000000000000000000000000'
  }
  let data = { from: account }
  if (symbol === 'ETH') {
    data = { ...data, value: convertDecimal(jus, amount) }
  }
  return new Promise(async (resolve, reject) => {
    try {
      getAddressRefer(jus, adr).then(async ({ addressRefer, refLevel }) => {
        const addressReferTemp = addressRefer || addressAdminRefer
        const gasAmount = await stakingContract.methods
          .buyToken(
            convertDecimalNew(jus, amount, decimals),
            convertDecimal(jus, amountJUS),
            addressReferTemp,
            refLevel,
            symbol,
            convertDecimal(jus, percentReward),
            price,
            adrToken,
          )
          .estimateGas(data)
        data = { ...data, gasLimit: gasAmount }
        await stakingContract.methods
          .buyToken(
            convertDecimalNew(jus, amount, decimals),
            convertDecimal(jus, amountJUS),
            addressReferTemp,
            refLevel,
            symbol,
            convertDecimal(jus, percentReward),
            price,
            adrToken,
          )
          .send(data)
          .on('transactionHash', (tx) => {
            console.log('tx>>', tx)
            resolve(tx)
          })
      })
    } catch (error) {
      reject(error)
    }
  })
}

export const getCurrentPriceJUS = async (jus) => {
  return new Promise(async (resolve, rejects) => {
    if (jus) {
      let walletAddress = jus.web3.eth.defaultAccount
      const contract = new jus.web3.eth.Contract(StakingAbi, stakingContract, {
        from: walletAddress,
      })
      await contract.methods
        .getRateTokenReward(0)
        .call({ from: walletAddress }, function (err, res) {
          if (err) {
            console.log('An error occured', err)
          }
          resolve(res)
        })
    }
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

export const getAddressRefer = (jus, addressRefer) => {
  return new Promise((resolve, rejects) => {
    let walletAddress = jus.web3.eth.defaultAccount
    const contract = new jus.web3.eth.Contract(StakingAbi, stakingContract, {
      from: walletAddress,
    })
    contract.methods
      .getUser(addressRefer)
      .call({ from: walletAddress }, function (err, res) {
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
