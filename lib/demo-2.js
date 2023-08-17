// 定义一个预存对象
let preObj = {}

// 定义一个运行器
let runner = undefined

// 定义一个依赖对象
let deps = {}

// 定义一个响应式函数
const reacitve = obj => {
  // 将传入的对象复制到预存对象中
  preObj = { ...obj }

  // 遍历对象的每一个属性
  Object.keys(obj).forEach(key => {
    // 为每一个属性定义 getter 和 setter
    Object.defineProperty(obj, key, {
      get: () => {
        // 如果存在运行器，则收集依赖
        if (runner) {
          deps[key] = deps[key] ? [...deps[key], runner] : [runner]
        }
        // 返回预存对象中对应的值
        return preObj[key]
      },

      set: newValue => {
        // 更新预存对象中对应的值
        preObj[key] = newValue
        // 如果存在依赖，则执行依赖函数
        ;(deps[key] || []).forEach(run => run())
      },
    })
  })
}

// 定义一个运行函数
const run = fn => {
  // 设置运行器为传入的函数
  runner = fn
  // 执行函数
  fn()
  // 清空运行器
  runner = undefined
}

// 测试

// 定义一个计数对象
const count = {
  value1: 1,
  value2: 2,
}

// 将计数对象转化为响应式对象
reacitve(count)

// 定义一个打印函数
function print1() {
  console.log('print1', count.value1, count.value2)
}

// 执行打印函数并进行依赖收集
run(print1)

// 修改计数对象的值
count.value1 = 2
count.value2 = 3

console.log('--------------------------------')
function print2() {
  console.log('print2', count.value1)
}

run(print2)
count.value1 = 15
