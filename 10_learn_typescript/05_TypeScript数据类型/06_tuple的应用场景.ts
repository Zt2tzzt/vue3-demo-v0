/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-03-03 23:29:26
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-03 23:32:59
 * @LastEditContent: 
 */
function useState(state: any) {
  let currentState = state
  const changeState = (newState: any) => {
    currentState = newState
  }
  const tuple: [any, (newState: any) => void] = [currentState, changeState]
  return tuple
}

function useState2<T>(state: T) {
  let currentState = state
  const changeState = (newState: T) => {
    currentState = newState
  }
  const tuple: [T, (newState: T) => void] = [currentState, changeState]
  return tuple
}

const [counter, setCounter] = useState(10);
setCounter(1000)

const [title, setTitle] = useState2("abc")
setTitle('haha')

export {}