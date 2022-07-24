类型断言（Type Assertions）的使用场景，

- 有时候，TypeScript无法获取具体的类型信息。

理解：TS只允许类型断言转换为更具体或者不具体（any / unknown）的类型版本，以防止不可能的强制转换。

------

使用类型断言实现 img 案例，student继承Person案例。结合 any / unknown 实现类型转换（不推荐这么做）

```typescript
// 案例一：img案例
const el = document.getElementById('zzt') as HTMLImageElement // 转为更具体
el.src = 'url地址'
// 案例二：student继承Person案例
class Person {}
class Student extends Person {
	studying() {}
}
function sayHello(p: Person) {
	(p as Student).studying() // 转为更具体
}
const stu = new Student
sayHello(stu)
// 结合any/unknown实现类型转换（不推荐这么做）
const msg = 'Hello'
const num: number = (msg as unknown) as number // 转为不具体
```

------

ts-node执行时，会根据全局默认配置的`tsconfig.json`文件进行编译。

------

非空类型断言`!`的使用场景，案例实现。

- 确认使用非空类型的标识符是有值的，跳过ts在编译阶段对它的检测（有报错风险）。

```typescript
function printMsgLength(msg?: string) {
  // console.log(msg.length); 编译时会报错。
	console.log(msg!.length);
}
printMsgLength('aaa')
```

------

可选链 `?.` 的理解3点。

1. ES11中新增特性。
2. 当对象的属性不存在时，会短路（后面的代码不执行），直接返回undefined。

```typescript
type Person = { // 在type中使用
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
console.log(info.friend?.girlfriend?.name); // 在对象取值时使用。
```

------

`??` 和 `!!` 的作用，案例实现。

!! 操作符：

- 将一个其他类型转换成 boolean 类型。
- 类似于`Boolean(变量)`的方式

```typescript
const msg = 'hello'
const flag1 = !!msg
const flag2 = Boolean(msg)
```

?? 操作符：（空值合并运算符）

- ES11的新特性。
- 类似于 `||` 操作符，0 和 '' 被判定为`true`

```typescript
const msg: string | null = 'hello'
const content = msg ?? '你好啊'
```

------

字面量类型的意义，案例实现。

- 字面量类型就是所赋的值，通常与联合类型结合使用。

```typescript
const msg1 = 'hello'; /* 相当于 */ const msg2: 'hello' = 'hello';
type Alignment = 'left' | 'right' | 'center'
let align: Alignment = 'left'
align = 'right'
align = 'center'
```

------

字面量推理的使用场景。3个案例导出字面量推理用法。

```typescript
// 案例一
const info = {
  name: 'zzt',
  age: 18
}
info.name = 'lingard' // 这样赋值会有安全隐患。
// 案例二
type Method = 'GET' | 'POST'
function request(url: string, method: Method) { }
const options = {
	url: 'https://www.baidu.com',
	method: 'POST' // method类型推导为string类型
}
request(options.url, options.method) // 会报错
```

解决办法一

```typescript
type Method = 'GET' | 'POST'
function request(url: string, method: Method) { }
type Request = { // 为options声明一个Request类型
	url: string,
	method: Method
}
const options: Request = {
	url: 'https://www.baidu.com',
	method: 'POST'
}
request(options.url, options.method)
```

解决办法二

```typescript
type Method = 'GET' | 'POST'
function request(url: string, method: Method) { }
const options = {
	url: 'https://www.baidu.com',
	method: 'POST'
}
request(options.url, options.method as Method) // options.method断言为Method类型。
```

解决办法三，字面量推理

```typescript
type Method = 'GET' | 'POST'
function request(url: string, method: Method) { }
const options = {
	url: 'https://www.baidu.com',
	method: 'POST' // method类型推导为‘POST’类型（字面量类型）
} as const // 将options中的属性值设为常量。
request(options.url, options.method)
```

------

什么是类型缩小4点，

1. 类型缩小的英文名是Type Narrowing。
2. 可以通过类似于`typeof padding === 'number'`的判断语句，改变TS的执行路径。
3. 在此路径中，缩小比声明时更小的类型，这个过程称之为“缩小（narrow）”
4. 而我们编写的`typeof padding === 'number'`语句可称之为类型保护（type guards)

常见的类型保护列举4点。

- typeof

  ```typescript
  function printID(id: number | string) {
    if (typeof id === 'string') {
      console.log(id.toUpperCase())
    } else {
      console.log(id)
    }
  }
  ```

- 平等缩小（`===`, `!==`, `switch`）

  ```typescript
  function printDirection(direction: "left" | "right") {
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
  }
  ```

- instanceof

  ```typescript
  function printTime(time: string | Date) {
    if (time instanceof Date) {
      console.log(time.toUTCString())
    } else {
      console.log(time)
    }
  }
  ```

- in

  ```typescript
  type Fish = { swimming: () => void } // 对象类型
  type Dog = { running: () => void } // 对象类型
  function moving(animal: Fish | Dog) {
  	if ('swimming' in animal) {
  		animal.swimming()
  	} else {
  		animal.running()
  	}
  }
  ```

------

类似于if代码块可理解为是类型缩小，typeof语句是类型保护。

------

函数类型的2点注意事项，实现案例。

可以编写函数类型的表达式（Function Type Expressions）来表示函数类型。

- 函数参数类型的参数名称不能省略。
- 当函数返回值为`void`时，一般表示函数返回`undefined`或者`null`，实际代码中函数能返回任何类型 。

```typescript
type AddFnType = (num1: number, num2: number) => number
const add: AddFnType = (n1: number, n2: number) => n1 + n2
```

------

函数参数的可选类型的注意事项2点。

- 函数参数的可选类型，相当于类型与undefined的联合类型。
- 可选类型须放在必传参数的后面。

```typescript
function(a: string, x?: number) {}
```

------

函数默认参数的2点注意事项。

1. 有默认值的参数，应放在末位。
2. 如果有默认值的参数，放在前面（通常放在可选函数前面），传undefined可使用默认值

```typescript
// 给第一个参数赋默认值，不推荐这种写法
function foo(x: number = 8, y: number) {
  console.log(x, y)
}
foo(undefined, 6) // 8 6
```

参数位置推荐顺序。

- 必传参数，有默认值的参数，可选参数。

------

剩余参数的使用。(ES6新特性)

```typescript
// 剩余参数必须是数组类型
function sum(...nums: number[]) {
	return nums.reduce((accumulate, currVal) => accumulate + currVal)
}
```

------

理解可推导的this类型案例，

```typescript
const info = {
	name: 'zzt',
	eating() {
		console.log(this.name, 'eating'); // TS自动推导this为外部对象info
	}
}
info.eating()
```

指定this类型的案例（this必须放在第一个参数）。

```typescript
type ThisType = { name: string }
function eating(this: ThisType, msg: string) {
	console.log(this.name, 'eating', msg);
}
const info = { name: 'zzt', eating } // TS不能自动推导eating中的this。
info.eating('hello') // 隐式绑定info中的this
```

