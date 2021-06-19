import React from 'react'
import copy from 'copy-to-clipboard'
import notification from 'components-v2/Alert'
export default function useCopyToClipboard(resetInterval: any) {
  const [isCopied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback((text: any) => {
    if (typeof text === 'string' || typeof text == 'number') {
      copy(text.toString())
      setCopied(true)
      notification('success', {
        message: 'Copy to clipboard success',
        description: '',
      })
    } else {
      setCopied(false)
      console.error(
        `Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`,
      )
    }
  }, [])

  React.useEffect(() => {
    let timeout: any
    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setCopied(false), resetInterval)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [isCopied, resetInterval])

  return [isCopied, handleCopy] as const
}
