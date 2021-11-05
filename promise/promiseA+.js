/**
 * promise 有 3 个状态，分别是 pending, fulfilled 和 rejected。
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/**
 * 构造 onFulfilled 去切换到 fulfilled 状态，构造 onRejected 去切换到 rejected 状态。
 * 构造 resolve 和 reject 函数，在 resolve 函数里，通过 resolvePromise 对 value 进行验证。
 * 配合 ignore 这个 flag，保证 resolve/reject 只有一次调用作用。
 * 最后将 resolve/reject 作为参数，传入 f 函数。
 * 若 f 函数执行报错，该错误就作为 reject 的 reason 来用。
 * @param {*} f
 */
function Promise(f) {
  this.state = PENDING
  this.result = null
  this.callbacks = []
  let onFulfilled = (value) => transition(this, FULFILLED, value)
  let onRejected = (reason) => transition(this, REJECTED, reason)
  let ignore = false

  let resolve = (value) => {
    if (ignore) return
    ignore = true
    resolvePromise(this, value, onFulfilled, onRejected)
  }

  let reject = (reason) => {
    if (ignore) return
    ignore = true
    onRejected(reason)
  }

  try {
    f(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

/**
 * handleCallback 函数，根据 state 状态，判断是走 fulfilled 路径，还是 rejected 路径。
 * 先判断 onFulfilled/onRejected 是否是函数，如果是，以它们的返回值，作为下一个 promise 的 result。
 * 如果不是，直接以当前 promise 的 result 作为下一个 promise 的 result。
 * 如果 onFulfilled/onRejected 执行过程中抛错，那这个错误，作为下一个 promise 的 rejected reason 来用。
 * @param {*} callback
 * @param {*} state
 * @param {*} result
 */
const handleCallback = (callback, state, result) => {
  let { onFulfilled, onRejected, resolve, reject } = callback
  try {
    if (state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
    } else if (state === REJECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
    }
  } catch (error) {
    reject(error)
  }
}

/**
 * 清空所有 callbacks
 * @param {*} callbacks
 * @param {*} state
 * @param {*} result
 */
const handleCallbacks = (callbacks, state, result) => {
  while (callbacks.length) handleCallback(callbacks.shift(), state, result)
}

/**
 * 对单个 promise 进行状态迁移
 * 当状态变更时，异步清空所有 callbacks。
 * @param {*} promise
 * @param {*} state
 * @param {*} result
 * @returns
 */
const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return
  promise.state = state
  promise.result = result
  setTimeout(() => {
    handleCallbacks(promise.callbacks, state, result)
  }, 0)
}

/**
 * 第一步，如果 result 是当前 promise 本身，就抛出 TypeError 错误。
 * 第二步，如果 result 是另一个 promise，那么沿用它的 state 和 result 状态。
 * 第三步，如果 result 是一个 thenable 对象。先取 then 函数，再 call then 函数，重新进入 The Promise Resolution Procedure 过程。
 * 最后，如果不是上述情况，这个 result 成为当前 promise 的 result。
 * @param {*} promise
 * @param {*} result
 * @param {*} resolve
 * @param {*} reject
 * @returns
 */
const resolvePromise = (promise, result, resolve, reject) => {
  if (result === promise) {
    let reson = new TypeError('Can not fulfill promise with itself')
    return reject(reson)
  }

  if (isPromise(result)) {
    return result.then(resolve, reject)
  }
  if (isThenable(result)) {
    try {
      let then = result.then
      if (isFunction(then)) {
        return new Promise(then.bind(result)).then(resolve, reject)
      }
    } catch (error) {
      console.log(error)
    }
  }

  resolve(result)
}

/**
 * promise 必须有 then 方法，接受 onFulfilled 和 onRejected 参数。
 * then 方法核心用途是，构造下一个 promise 的 result。
 * @param {*} onFulfilled 参数是value
 * @param {*} onRejected 参数是reason
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    let callback = { onFulfilled, onRejected, resolve, reject }
    if (this.state === PENDING) {
      this.callbacks.push(callback)
    } else {
      setTimeout(() => {
        handleCallback(callback, this.state, this.result)
      }, 0)
    }
  })
}
