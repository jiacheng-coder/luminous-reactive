let value
const reacitve = obj => {
  value = obj.a

  Object.defineProperty(obj, 'a', {
    get: () => {
      return value
    },
    set: val => {
      value = val
      fn()
    },
  })

  return obj
}

// 测试
var obj = reacitve({ a: 1 })
var fn = () => {
  console.log(obj.a)
}

fn() // 调用 get 函数

obj.a = 2 // 调用 set 函数
