/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-03-05 22:51:56
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-06 02:11:47
 * @LastEditContent: 
 */
/* const el = document.getElementById('zzt') as HTMLImageElement
el.src = 'url地址'

class Person {}
class Student extends Person {
	studying() {}
}
function sayHello(p: Person) {
	(p as Student).studying()
}
const stu = new Student
sayHello(stu)

const msg = 'Hello'
const num: number = (msg as unknown) as number */

/* function printMsgLength(msg?: string) {
	console.log(msg!.length);
}
printMsgLength('aaa') */

/* type Person = {
	name: string,
	friend?: {
		name: string,
		girlfriend?: {
			name: string
		}
	}
}
const info: Person = {
	name: 'zzt',
	friend: {
		name: 'lilei',
	}
}
console.log(info.friend?.girlfriend?.name); */

/* const msg = 'hello'
const flag1 = !!msg
const flag2 = Boolean(msg) */

/* const msg: string | null = 'hello'
const content = msg ?? '你好啊' */

/* type Alignment = 'left' | 'right' | 'center'
let align: Alignment = 'left'
align = 'right'
align = 'center' */

/* type Method = 'GET' | 'POST'
function request(url:string, method: Method) { }
const options = {
	url: 'https://www.baidu.com',
	method: 'POST' // method类型推导为string类型
} as const
request(options.url, options.method) */

/* type IDType = number | string
function printID(id: IDType) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
} */

/* function printDirection(direction: "left" | "right") {
	// ===
  if (direction === 'left') {
    console.log(direction)
  } else {
    console.log(direction)
	}
	// switch
  switch (direction) {
    case 'left':
      console.log(direction)
      break;
    case 'right':
			console.log(direction);
			break
		default:
			const check: never = direction
  }
} */

/* function printTime(time: string | Date) {
  if (time instanceof Date) {
    console.log(time.toUTCString())
  } else {
    console.log(time)
  }
} */

/* type Fish = {swimming: () => void} // 对象类型
type Dog = {running: () => void} // 对象类型
function moving(animal: Fish | Dog) {
	if ('swimming' in animal) {
		animal.swimming()
	} else {
		animal.running()
	}
} */
/* 
type AddFnType = (num1: number, num2: number) => number
const add: AddFnType = (n1: number, n2: number) => n1 + n2 */

/* function foo(x: number = 8, y: number) {
  console.log(x, y)
}
foo(undefined, 6) // 8 6 */

/* function sum(...nums: number[]) {
	return nums.reduce((accumulate, currVal) => accumulate + currVal)
}
console.log(sum(1,2,3)) */

/* const info = {
	name: 'zzt',
	eating() {
		console.log(this.name, 'eating');
	}
}
info.eating() */

type ThisType = {name: string}
function eating(this: ThisType, msg: string) {
	console.log(this.name, 'eating', msg);
}
const info = {
	name: 'zzt',
	eating
}
info.eating('hello')
export {}