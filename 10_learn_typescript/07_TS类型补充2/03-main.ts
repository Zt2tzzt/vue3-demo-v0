/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-03-08 18:15:08
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-10 21:56:56
 * @LastEditContent: 
 */
/* interface ISwim { swimming: () => void }
interface IEat { eating: () => void }
class Animal {}
class Fish extends Animal implements ISwim, IEat {
	swimming() {
		console.log('fish swimming');
	}
	eating () {
		console.log('fish eating');
	}
} */

/* interface ISwim { swimming: () => void }
class Person implements ISwim {
	swimming() {
		console.log('Person swimming');
	}
}
function swimAction(swimable: ISwim) {
	swimable.swimming()
}
swimAction(new Person()) */

/* interface IFoo { name: string }
interface IFoo { age: number }
const foo: IFoo = {
	name: 'zzt',
	age: 18
} */

/* interface IPerson {
	name: string,
	age: number,
	height: number
}
function printInfo(person: IPerson) {
	console.log(person);
}
const info = {
	name: 'zzt',
	age: 18,
	height: 1.88,
	address: '深圳市'
}
printInfo(info) */

/* enum Direction1 {
	LEFT,  // 默认值0
	RIGHT, // 默认值1
	TOP, // 默认值2
	BOTTOM // 默认值3
}
enum Direction2 {
	LEFT = 100,  // 默认值 100
	RIGHT, // 默认值 101
	TOP, // 默认值 102
	BOTTOM // 默认值 103
}
enum Direction3 {
	LEFT = 'LEFT',
	RIGHT = 'RIGHT',
	TOP = 'TOP',
	BOTTOM = 'BOTTOM'
}
function turnDirection(direction: Direction1) {
	switch (direction) {
		case Direction1.LEFT:
			console.log('方向向左');
			break;
		default:
			break;
	}
}
turnDirection(Direction1.LEFT) */

/* function sum<T>(num: T): T {
	return num
}
// 调用方式一
sum<number>(20)
// 调用方式二
sum(20) */

/* function foo<T, E, O>(arg1: T, arg2: E, arg3: O) {}
foo<number, string, boolean>(10, 'abc', true) */

/* interface IPerson<T1, T2> {
	name: T1,
	age: T2
}
const p: IPerson<string, number> = { name: 'zzt',	age: 18 } */

/* class Point<T> {
	x: T
	y: T
	z: T
	constructor(x: T, y: T, z: T) {
		this.x = x
		this.y = y
		this.z = z
	}
}
const p1 = new Point(1, 2, 3)
const p2 = new Point<number>(1, 2, 3)
const p3: Point<number> = new Point(1,2, 3)
const arr: Array<string> = ['abc', 'cba', 'nba'] */

/* interface ILength {
	length: number
}
function getLength<T extends ILength>(arg: T) {
	return arg.length
}
getLength('abc')
getLength(['abc', 'cba'])
getLength({ length: 100 })

export { } */

/* export function add(num1: number, num2: number) {
	return num1 + num2
} */

/* export namespace time {
	export function format(time: string) {
		return '2222-02-22'
	}
}
export namespace price {
	export function format(price: number) {
		return 99.9
	}
} */

/* declare let zztName: string
declare function zztFoo(): void
declare class Person {
	name: string
	age: number
	constructor(name: string, age: number)
} */

/* declare module 'loadsh' {
	export function join(arr: any[]): void
} */

/* declare module '*.vue' {
	import { DefineComponent } from 'vue'
	const component: DefineComponent
	export default component
}
declare module '*.jpg' {
	const src: string
	export default src
} */

// import { time ,price } from './01-demo/'

interface IPerson {
	name: string
	age: number
	height: number
}
const info = {
	name: 'zzt',
	age: 18,
	height: 1.88,
	address: '深圳市'
}
const p: IPerson = info

const u = undefined

const i = 9