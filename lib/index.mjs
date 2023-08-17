import { reactive, reactiveRunner } from './demo-3.mjs'
const count = reactive({ value: 1 })

function print1() {
  console.log('print1', count.value)
}

reactiveRunner(print1)

count.value = 2
count.value = 3
