import React from 'react'
import LoadingBar from 'react-top-loading-bar'

export default function ProgressBar(props: {
  loading: number
  setLoading: (val: number) => void
}) {
  return (
    <LoadingBar
      color="linear-gradient(45deg,#1cace8,#07dce6)"
      progress={props.loading}
      onLoaderFinished={() => props.setLoading(0)}
      transitionTime={600}
      height={4}
    />
  )
}
