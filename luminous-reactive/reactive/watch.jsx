import React, { useEffect, useRef, useState } from 'react'
import { runner } from './reactive'

export const watch = Component => {
  return React.memo(props => {
    const [, setUpdateCount] = useState(0)
    const mountedRef = useRef(false)
    const update = () => {
      setUpdateCount(pre => pre + 1)
    }

    if (!mountedRef.current) {
      runner = update
    }

    useEffect(() => {
      runner = undefined
    }, [])

    return <Component {...props} />
  })
}
