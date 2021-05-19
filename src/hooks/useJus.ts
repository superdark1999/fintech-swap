import { useContext } from 'react'
import { Context } from '../contexts/JusProvider'

const useJus = () => {
  const { jus } = useContext(Context)
  return jus
}

export default useJus
