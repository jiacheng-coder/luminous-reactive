import { useState } from 'react'
import Test from './components/Test'
import './App.css'

function App() {
  const [_, setCount] = useState(0)
  const update = () => {
    setCount(pre => pre + 1)
  }

  return (
    <div className='App'>
      <h1>Reactive</h1>
      <Test />
    </div>
  )
}

export default App
