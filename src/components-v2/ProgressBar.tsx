import React from 'react'
import LoadingBar from 'react-top-loading-bar'

export default function ProgressBar(props: {loading: number, setLoading: (val: number) => void}) {
  return (
    <LoadingBar
      color='linear-gradient(101deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'
      progress={props.loading}
      onLoaderFinished={() => props.setLoading(0)}
      transitionTime={600}
      height={4}
    />
  )
}
