// 解决数组变异问题 && 支持深度对象
// 1.数组变异: 数组的某些方法调用后会修改原数组。例如 push方法
// 2.深度对象：使用递归的方式即可支持

// 判断是否为对象
const isObj = _ => _ && typeof _ === 'object'

// 存储依赖关系
const proxyDeps = new WeakMap()
let runner = undefined

// 创建代理对象
const makeProxy = target => {
  proxyDeps.set(target, [])

  return new Proxy(target, {
    get: (target, key) => {
      const deps = proxyDeps.get(target) || {}
      if (typeof runner === 'function') {
        deps[key] = deps[key] ? [...deps[key], runner] : [runner]
        proxyDeps.set(target, deps)
      }
      return target[key]
    },
    set: (target, key, value) => {
      const deps = proxyDeps.get(target) || {}
      if (target[key] === value) {
        return false
      }
      target[key] = value
      ;(deps[key] || []).forEach(dep => {
        dep()
      })
      return true
    },
  })
}

// 创建响应式对象
export const reactive = target => {
  if (!isObj(target)) {
    // throw Error('只支持对象、数组')
    return makeProxy({
      value: target,
    })
  }

  Object.entries(target).forEach(([key, value]) => {
    if (isObj(value)) {
      target[key] = reactive(value)
    }
  })

  return makeProxy(target)
}

// 运行响应式函数
export const reactiveRunner = fn => {
  runner = fn
  fn() // 在调用fn函数的时候进行依赖收集
  runner = undefined
}
