/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-03-06 20:04:01
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-03-08 11:18:54
 * @LastEditContent: 
 */
/* function add(ele1: number, ele2: number): number
function add(ele1: string, ele2: string): string
function add(ele1: any, ele2: any): any {
	return typeof ele1 === 'string' ? ele1.length + ele2.length	: ele1 + ele2
}
console.log(add(20, 30))
console.log(add({name: 'zzt'}, {age: 18})); */

/* function getLength(ele: string | any[]) {
	return ele.length
}
function getLength(arg: string): number
function getLength(arg: any[]): number
function getLength(arg: any) {
	return arg.length
} */

/* class Person {
	name: string
	age: number
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}
	running() {
		console.log(this.name, 'running');
	}
}
new Person('zzt', 18).running() */

/* class Person {
	name: string = ''
	age: number = 0
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}
	running() {
		console.log('running');
	}
}
class Student extends Person {
	sno: number = 0
	constructor(name: string, age: number, sno: number) {
		super(name, age)
		this.sno = sno
	}
	running() {
		super.running()
		console.log('student', 'running');
		
	}
} */

/* class Animal {
	action() {
		console.log('animal action');
	}
}
class Dog extends Animal {
	action() {
		console.log('Dog running');
	}
}
class Fish extends Animal {
	action() {
		console.log('fish swimming');
	}
}
// 多态的目的是为了写出更加具备通用性的代码
function makeAction(animals: Animal[]) {
	animals.forEach(animal => {
		animal.action()
	});
}
makeAction([new Dog(), new Fish()]) */

/* class Person {
	private name: string
}
const p = new Person
p.name */

/* class Person {
	protected name: string = '123'
}
class Student extends Person {
	getName() {
		return this.name
	}
}
const stu = new Student
console.log(stu.getName()); */

/* class Person {
	readonly name: string
	age: number
	readonly friend?: Person
	constructor(name: string, friend?: Person) {
		this.name = name
		this.friend = friend
	}
}
const p = new Person('zzt', new Person('lingard'))
p.friend.age = 29
p.friend = new Person('Salah') */

/* class Person {
	private _name: string
	constructor(name: string) {
		this._name = name
	}
	// 访问器getter/setter
	get name() {
		return this._name
	}
	set name(newVa) {
		this._name = newVa
	}
}
const p = new Person('zzt')
p.name = 'lingard'
console.log(p.name); */

/* class Student {
	static schoolTime: string = '20:00'
	static attendClass() {
		console.log('go studying');
	}
}
console.log(Student.schoolTime);
Student.attendClass() */

/* abstract class Shape {
	abstract getArea(): number //没有方法体
}
class Rectangle extends Shape {
	private width: number
	private height: number
	constructor(width: number, height: number) {
		super()
		this.width = width
		this.height = height
	}
	getArea(): number {
		return this.width * this.height
	}
}
class Circle extends Shape {
	private radius: number
	constructor(radius: number) {
		super()
		this.radius = radius
	}
	getArea(): number {
		return this.radius * 3.14
	}
}
function makeArea(shape: Shape) {
	return shape.getArea()
}
makeArea(new Rectangle(20, 30))
makeArea(new Circle(10)) */

/* class Person {
	name: string = '123'
	eating() {}
}
const p: Person = {
	name: 'zzt',
	eating() {}
} */

/* type Point1 = { x: number, y: number }
interface Poin2 { x: number, y: number }
const p: Poin2 = {
	x: 9, y: 8
}

interface IInfoType {
	readonly name: string
	age: number
	friend?: {
		name: string
	}
}
const info: IInfoType = {
	name: 'zzt',
	age: 18,
	friend: {
		name: 'lingard'
	}
} */

/* interface IIndexLanguage {
	[index: number]: string
}
const frontLanguage: IIndexLanguage = {
	0: 'html',
	1: 'css',
	2: 'js'
}
interface ILanguageYear {
	[name: string]: number
}
const languageYear: ILanguageYear = {
	'c': 1972,
	'Java': 1995,
	"JavaScript": 1996
} */

/* interface ICalcFn {
	(n1: number, n2: number): number
}
const add: ICalcFn = (num1, num2) => num1 + num2 */

/* interface Person {
	name: string,
	eating: () => void
}
interface Animal {
	running: () => void
}
interface Student extends Person, Animal { // 接口的多继承。
	sno: number
}
const stu: Student = {
	name: 'zzt',
	sno: 666,
	eating() {},
	running() {}
} */

type atype = number & string
interface ISwim {
	swimming: () => void
}
interface IFly {
	flying: () => void
}
type FlyFish = ISwim & IFly
const flyfish: FlyFish = {
	swimming() {},
	flying() {}
}

/* type InfoType = string | number
interface IInfo {x: number, y: string}
interface IInfo2 {(x: number, y: boolean): void}
const p: InfoType | IInfo | IInfo2 = (num, flag) => {} */

/*  class Person {
	 name: 'hello'
	 static msg: string = '人'
 }
 class Student extends Person {

 }
 console.log((new Student).msg); */
 

 export {}

