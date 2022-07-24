什么是函数的重载。

- 函数的名称相同，但是参数（个数 / 类型）不同的几个函数，构成函数的重载。

------

如何在TS中实现函数重载2点。

1. 撰写不同的函数签名（overload signatures）来表示函数可照不同方式进行调用。
2. 一般是编写2个或者2个以上的重载签名，再编写一个通用的函数实现。

注意事项2点。

- 函数类型声明参照重载签名，函数实现参照通用的函数实现。
- 有实现体的函数（通用函数实现），是不能直接被调用的。

案例实现。

```typescript
function add(arg1: number, arg2: number): number // 函数重载签名
function add(arg1: string, arg2: string): string
function add(arg1: any, arg2: any): any {
	return typeof arg1 === 'string' ? arg1.length + arg2.length	: arg1 + arg2
}
console.log(add(20, 30))
// 会报错，add函数实现体（通用的函数实现）不能被直接调用
console.log(add({name: 'zzt'}, {age: 18}));
```

------

结合案例分析联合类型和重载的关系。

分别使用函数联合类型和函数重载实现获取字符串/数组长度的案例

联合类型

```typescript
function getLength(arg: string | any[]) {
	return arg.length
}
```

函数重载

```typescript
function getLength(arg: string): number
function getLength(arg: any[]): number
function getLength(arg: any) {
	return arg.length
}
```

得出结论：

- 函数代码逻辑相同，且返回值类型确定，则使用联合类型，否则使用函数重载。

------

编程范式包括函数式编程和面向对象编程。结合js说说使用场景。

- 在JS开发中，更加习惯于函数式编程：
  - react开发中，更多的的使用函数组件以及结合Hook的开发模式。
  - vue开发中，更加推荐使用Composition Api。
- 在封装某些业务时，类具有更加强大的封装性。

------

TS对类的支持1点。

- 支持使用class等关键字，可对类的成员进行静态类型检测。

------

使用TS定义一个类。3个步骤。

1. 在类的内部声明属性和对应的类型。
   - 如果没声明类型，默认是any
   - 可给属性设置初始化值。
   - 在strictProperlyInitialization模式下，属性必须初始化，否则会报错。
   - 如果确实不想初始化，可使用非空类型断言`name!:string`的语法，如 `xxx!: string`
2. 使用构造器constructor，对类做初始化，通过new创建实例时，constructor会自动执行，默认返回当前创建出来的实例。
3. 定义类中的其它成员，如方法。

```typescript
class Person {
	name!: string
	age: number = 0
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}
	running() {
		console.log(this.name, 'running');
	}
}
new Person('zzt', 18).running()
```

------

继承是面向对象3大特性之一，是多态的前提。

------

在类中实现继承2点注意，super的用法。重写父类方法。

- 子类会继承父类的属性和方法。
- 在constructor中，必须使用super来调用父类的构造方法。

```typescript
class Person {
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
	running() { // 子类重写父类方法
		super.running()
		console.log('student', 'running');
	}
}
```

------

TS实现多态案例，与方法重载，联合类型的区别。

```typescript
class Animal {
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
makeAction([new Dog(), new Fish()]) // Dog running fish swimming
```

多态的前提是什么3点。

1. 有类的继承。
2. 有方法的重写。
3. 有父类引用指向子类对象。

------

TS中类的成员修饰符3种并介绍。案例实现。

- public：任何地方可见，公有的属性或方法，默认修饰符。
- private：仅在类自身中可见，私有的属性或方法。
- protected：仅在类自身及子类中可见，受保护的属性或方法。

private

```typescript
class Person {
	private name: string
}
const p = new Person
p.name // 会报错
```

protected

```typescript
class Person {
	protected name: string = '123'
}
class Student extends Person {
	getName() {
		return this.name
	}
}
const stu = new Student
console.log(stu.getName()); // 可访问
```

------

readonly的2点注意事项。

1. readonly修饰的属性，可在构造器中赋值，之后不可再修改。
2. readonly若修饰引用类型数据，不可更改引用地址，可更改其中的属性值。

TS中类的readonly修饰符的使用，

```typescript
class Person {
	readonly name: string
	age: number
	readonly friend?: Person
	constructor(name: string, age: number, friend?: Person) {
		this.name = name
    this.age = age
		this.friend = friend
	}
}
const p = new Person('zzt', new Person('lingard'))
p.friend.name = 'Debruyne' // 报错，不可更改
p.friend = new Person('rice') // 报错，不可更改
p.friend.age = 29 // 可更改。
```

------

getter和setter的使用，

- 监听某些私有属性的获取或设置过程。

结合private的修饰符，案例实现

```typescript
class Person {
	private _name: string
	constructor(name: string) {
		this._name = name
	}
	// 访问器getter/setter
	get name() {
		return this._name
	}
	set name(newVal) {
		this._name = newVal
	}
}
const p = new Person('zzt')
p.name = 'lingard' // 调用 name 的修改器 setter
console.log(p.name); // 调用 name 的访问器 getter  
```

私有属性名命规范。

- 使用"_"开头名命。

------

什么是静态成员。

- 类级别的成员，可使用类直接访问。通过static关键字定义。

在类中定义静态成员。

```typescript
class Student {
	static schoolTime: string = '20:00'
	static attendClass() {
		console.log('go studying');
	}
}
console.log(Student.schoolTime);
Student.attendClass()
```

------

什么是抽象类abstract，

- 使用 `abstract` 关键字声明的类。

抽象类注意事项2点，

- 没有具体实现（没有方法体）的方法称为抽象方法，
- 抽象方法必须存在于抽象类中。同时还可以有其它抽象成员。

抽象类特点2点，

- 抽象类不能被实例化。
- 抽象方法（成员）必须被子类实现，否则该子类也必须是抽象类。

案例实现。

```typescript
// 抽象父类
abstract class Shape {
	abstract getArea(): number // 函数签名，没有方法体
}
// 子类一
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
// 子类二
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
// 抽象类不能实例化，传入子类实例，使用多态特性调用方法。
function makeArea(shape: Shape) {
	return shape.getArea()
}
makeArea(new Rectangle(20, 30))
makeArea(new Circle(10))
```

------

TS中类的类型，类本身也可作为类型，案例实现。

```typescript
class Person {
	name: string = '123'
	eating() {}
}
const p: Person = {
	name: 'zzt',
	eating() {}
}
```

------

另一种方式声明对象类型，通过接口interface。

```typescript
type Point = { x: number, y: number }
interface IPoint { x: number, y: number } // 接口定义对象类型。
```

------

接口中声明对象类型定义可选类型，定义只读属性。代码实现。

```typescript
interface IInfoType {
	readonly name: string
	age: number
	friend?: {
		name: string
	}
}
const info: IInfoType = {
	name: 'zzt', // 初始化后，值不可以修改
	age: 18,
	friend: {
		name: 'lingard'
	}
}
```

------

接口中声明对象类型的**索引类型**的特点，使用。

- 定义对象的键值数据类型

```typescript
interface IIndexLanguage {
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
}
```

------

通过接口定义函数类型，意为可调用的接口，使用。

```typescript
interface ICalcFn {
	(n1: number, n2: number): number // 没有方法名的函数签名
}
const add: ICalcFn = (num1, num2) => num1 + num2
```

------

接口的继承，多继承的使用。

```typescript
interface Person {
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
}
```

------

交叉类型如何理解。

- 表示需要满足多个类型的条件。
- 使用&符号

它的意义怎么体现，

- 对对象类型进行交叉

案例实现。

```typescript
type atype = number & string; /* 无意义的，相当于 */ type atype = never
interface ISwim {
	swimming: () => void
}
interface IFly {
	flying: () => void
}
type FlyFish = ISwim & IFly // 与接口继承实现类似效果。
const flyfish: FlyFish = {
	swimming() {},
	flying() {}
}
```

