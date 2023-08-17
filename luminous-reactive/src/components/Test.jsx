import React, { useState, useEffect } from 'react'
import { reactive, reactiveRunner } from '../../reactive'

const App = () => {
  const [count, setCount] = useState(reactive({ value: 0 }))
  const [age, setAge] = useState(reactive(18))
  const [_, setVal] = useState(0)
  const forceUpdate = () => {
    setVal(_ => _ + 1)
  }

  useEffect(() => {
    const printCount = () => {
      console.log('当前计数:', count.value)
    }

    reactiveRunner(printCount) // 使用响应式运行器运行printCount函数
  }, [count])

  const increment = () => {
    count.value += 1
    forceUpdate()
  }
  const incrementAge = () => {
    age.value += 1
    forceUpdate()
  }

  return (
    <div>
      <section>
        <p>当前计数: {count.value}</p>
        <button onClick={increment}>增加计数</button>
      </section>
      <section>
        <p>年龄: {age.value}</p>
        <button onClick={incrementAge}>增加年龄</button>
      </section>
    </div>
  )
}

export default App
