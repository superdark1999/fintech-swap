import SMART_CHEF_ABI from 'config/abi/smartChef.json'
import { useContract, useIfoContract, useStakingContract } from 'hooks/useContract'


const useStakingEvent = (stakingAddress) => {
  // const stakingContract = useStakingContract(stakingAddress);


  const stakingContract = useContract(stakingAddress,SMART_CHEF_ABI );

  const listenDepositEvent = (callback) => {
    if (stakingContract){
      stakingContract.on('Deposit',  () => {
        console.log("deposit in");
      })

    }
  }

  const listenWithdrawEvent = (callback) => {
    if (stakingContract)
      stakingContract.on('Withdraw',  () => {
        console.log("Withdraw in");
        callback();
      })

  }
  return { listenDepositEvent, listenWithdrawEvent }
}

export default useStakingEvent;