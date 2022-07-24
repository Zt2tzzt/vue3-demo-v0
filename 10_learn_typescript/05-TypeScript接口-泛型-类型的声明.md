类只能单继承，可实现多个接口。

------

写一个类，实现多个接口。

```typescript
interface ISwim { swimming: () => void }
interface IEat { eating: () => void }
class Animal {}
class Fish extends Animal implements ISwim, IEat {
	swimming() {
		console.log('fish swimming');
	}
	eating() {
		console.log('fish eating');
	}
}
```

------

什么是面向接口编程。

- 接口定义后，可以被实现，如果被一个类实现，那么在之后需要传入接口类型参数的地方，都可以将这个类的实例传入。

```typescript
interface ISwim { swimming: () => void }
class Person implements ISwim {
	swimming() {
		console.log('Person swimming');
	}
}
// 编写一些公共的API: 面向接口编程
function swimAction(swimable: ISwim) {
	swimable.swimming()
}
swimAction(new Person())
```

------

TS中默认（内置）类型的理解：

- 安装 typescript 时，会安装一些 lib，其中默认声明了很多类型，如内置的 Math，Date，如 DOM 中的 Window 等等类型。

------

interface 和 type 的区别，

- interface 可重复对某个接口来定义属性和方法。
- interface 之间可以继承/多继承，
- interface 可以被类实现/多实现，
- interface 可用于泛型类型约束( \<T extends interface\>)
- type 定义的是别名，别名是不能重复的。

```typescript
interface IFoo { name: string }
interface IFoo { age: number }
const foo: IFoo = {
	name: 'zzt',
	age: 18
}
```

分别推荐使用场景。

- 对象类型推荐使用 interface。
- 非对象类型推荐使用 type（函数类型也可使用 interface）

------

字面量赋值的理解，案例理解。

- TS在**字面量直接赋值**的过程中，为了进行类型推导会进行严格的类型限制，
- 如果是将一个**标识符赋值给其他的变量时**，会进行 freshness 擦除操作，并非实际删除了类型检测不需要的属性，而是屏蔽了该属性的检测。

```typescript
interface IPerson {
	name: string
	age: number
	height: number
}
const info: IPerson = {
	name: 'zzt',
	age: 18,
	height: 1.88,
	address: '深圳市' // 会报错
}
```

```typescript
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
function printInfo(person: IPerson) {
	console.log(person);
}
printInfo(info) // 不会报错
```

------

什么是枚举类型。

- 枚举类型是为数不多TS特有类型之一。
- 将一组可能的值，一个个列举出来，定义在一个类型中。
- 允许开发者定义一组名命常量，可以是数字，字符串类型。

枚举类型的值的理解。

- 枚举类型有默认值，从0依次递增，如0, 1, 2, 3, ...
- 可以修改默认值。

```typescript
enum Direction {
	LEFT,  // 默认值 0
	RIGHT, // 默认值 1
	TOP, // 默认值 2
	BOTTOM // 默认值 3
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
    // ...
		default:
			break;
	}
}
turnDirection(Direction1.LEFT)
```

------

什么是类型的参数化。

- 类型作为参数传入。

------

写一个泛型函数案例，用2种方式调用它，哪2种.

- 方式一：通过 `<类型>` 的方式将类型传递给函数
- 方式二：通过类型推导，自动推导出传入变量的类型。

```typescript
function sum<T>(num: T): T {
	return num
}
sum<number>(20) // 调用方式一
sum(20) // 调用方式二
```

------

泛型可传入多个类型，案例实现。

```typescript
function foo<T, E, O>(arg1: T, arg2: E, arg3: O) {}
foo<number, string, boolean>(10, 'abc', true)
```

------

平常开发中常见的泛型名称，理解。

- T：Type的缩写，意为类型。
- K, V：key和value的缩写，意为键，值。
- E：Element的缩写，意为元素。
- O：Object的缩写，意为对象。

------

泛型接口的2点注意事项，代码实现。

- 泛型接口不会自动推导。
- 泛型接口可以赋默认值。

```typescript
interface IPerson<T1, T2> {
	name: T1
  age: T2
}
const p: IPerson = { name: 'zzt',	age: 18 } // 会报错，接口泛型没有类型推导
const p: IPerson<string, number> = { name: 'zzt',	age: 18 }
```

```typescript
interface IPerson<T1 = string, T2 = number> { // 定义接口泛型赋默认值。否则使用泛型时就要传类型值。
	name: T1
	age: T2
}
const p: IPerson = { name: 'zzt',	age: 18 }
```

------

泛型类的实现，3种指定泛型的写法，

```typescript
class Point<T> {
	x: T
	y: T
	z: T
	constructor(x: T, y: T, z: T) {
		this.x = x
		this.y = y
		this.z = z
	}
}
const p1 = new Point(1, 2, 3) // 类型推导
const p2 = new Point<number>(1, 2, 3) // 类型指定方式一
const p3: Point<number> = new Point(1,2, 3) // 类型指定方式二，类似于↓
const arr: Array<string> = ['abc', 'cba', 'nba']
```

泛型类2点注意事项。

1. 尽量使用类型推导。
2. 在JSX文件中，尽量在其他地方确认类型，避免使用`<>`

------

泛型的类型约束，代码实现。

- 有时我们希望传入的类型有某些共性，如都有 length 属性

```typescript
interface ILength {
	length: number
}
function getLength<T extends ILength>(arg: T) { // 使用接口继承，对泛型类型做约束，使得泛型类型中必须有length属性。
	return arg.length
}
getLength('abc')
getLength(['abc', 'cba'])
getLength({ length: 100 })
```

------

TS模块化开发的2种方式。

- 模块化：每个文件可以是一个独立的模块，支持ES Module，也支持CommonJS。
- 命名空间：通过 `namespace` 来声明一个名命空间。

```typescript
// TS支持 ES Module 模块化
export function add(num1: number, num2: number) {
	return num1 + num2
}
```

------

TS名命空间的理解2点，

- 早期被称为内部模块，主要目的是将一个模块内部，进行作用域的划分，防止一些名命冲突。
- TS创建时间2014年，JS的ES6新特性更新于2015年，所以TS中的 namespace 可以看作是历史遗留问题。

src/utils/format.ts

```typescript
export namespace time {
	export function format(time: string) {
		return '2222-02-22'
	}
}
export namespace price {
	export function format(price: number) {
		return 99.9
	}
}
```

src/main.js

```typescript
import { time, price } from './utils/format'
console.log(time.format("11111111"))
console.log(price.format(123))
```

------

TS中类型查找的作用1点。

- 只有声明类型的变量，函数，类，模块等等标识符才能在TS中使用。

`.d.ts` 文件的理解2点。

1. 用来做类型的声明（declare），用于TS的类型检测，告知有哪些类型可以使用。
2. 不会编译成JS文件。

TS在哪查找类型声明3点。

1. 内置类型声明。
2. 外部定义类型声明。
3. 自己定义类型声明。

------

内置类型的声明是什么2点。

- TS自带的，内置了JS运行时的一些标准化API的声明文件，如 Math，Date 等内置类型，也包括 DOM Api，如 Window，Document。
- 通常在我们安装 TypeScript 的环境中会带有。

------

外部定义类型声明是什么：

- 通常是使用一些第三方库时，需要的一些类型声明。

外部定义类型使用场景：

1. 在自己库中进行类型声明（编写`.d.ts`文件），比如axios库。
2. 通过社区的一个公有库 DefinitelyTyped 存放类型的声明文件。
   1. 该库的github地址：https://github.com/DefinitelyTyped/DefinitelyTyped/
   2. 该库查找声明安装方式的地址：https://www.typescriptlang.org/dt/search?search=
   3. 比如安装 lodash 的类型声明：`npm i @types/lodash -D`

自己定义类型声明在什么情况下使用：

1. 使用的第三方库是一个纯JavaScript库，没有对应的声明文件。
2. 我们给自己的JS代码中声明一些类型，方便在其他TS文件中直接使用。

------

声明变量，函数，类，代码实现。

```typescript
declare let zztName: string
declare function zztFoo(): void
declare class Person {
	name: string
	age: number
	constructor(name: string, age: number)
}
```

------

声明模块，代码实现

- 可以声明模块，如 lodash 模块默认不能使用的情况，可以自己来声明这个模块。
- 语法：`declare module '模块名' {}`
- 在声明模块的内部，可以通过 `export` 导出对应的变量，类，函数等。

```typescript
declare module 'loadsh' {
	export function join(arr: any[]): void
}
```

------

声明文件，使用场景，

- 如在开发vue过程中，TS默认是不识别.vue文件的，那么就需要对其进行文件声明。
- 如在开发中，TS默认不识别jpg图片文件，也需要对其进行声明。

```typescript
declare module '*.vue' {
	import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
	export default component
}
declare module '*.jpg' {
	const src: string
	export default src
}
```

------

声明名命空间，使用场景，

- 如在 index.html 中引入了 jQuery，需要声明名命空间 `$` ,这样在 main.ts 中就可以使用了。

zzt.d.ts

```typescript
declare namespace $ {
  export function ajax(settings: any): any
}
```

main.ts

```typescript
$.ajax({
  // ...
})
```

