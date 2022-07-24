reactive用于判断的6个API并介绍

- isProxy - 检查对象是否由`reactive`或`readonly`创建的Proxy。
- isReactive - 检查对象是否由`reactive`创建的响应式代理（reactive对象包裹的`readonly`也会返回true）。
- isReadonly - 检查对象是否由`readonly`创建的只读代理。
- toRaw - 返回`reactive`或`readonly`代理的原始对象（不建议保留对原始对象的持久引用，谨慎使用）。
- shallowReactive - 创建一个响应式代理，它跟踪自身property的响应式，但不执行嵌套对象的深层响应式转换（深层还是原生对象）。
- shallowReadonly - 创建一个proxy，使其自身property为只读，但不执行嵌套对象的深度只读转换（深层还是可读可写的）

基本使用举例

```javascript
import { reactive, isReactive } from 'vue'
export default {
  setup() {
    const state = reactive({name: 'John'})
    console.log(isReactive(state)) // -> true
  }
}
```

------

`toRefs` 的使用场景：使reactive返回的对象中的属性都转成ref，可用于reactive对象的解构。

```javascript
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({ name: 'zzt', age: 18 })
    const {name, age} = toRefs(state)
  }
}
```

`toRef` 的使用场景：将reactive返回的对象中的某一个属性转成ref

```javascript
import { reactive, toRef } from 'vue'
export default {
  setup() {
    const state = reactive({ name: 'zzt', age: 18 })
    const name = toRef(state, 'name')
  }
}
```

这种做法相当于将解构出来的值与reactive返回的对象中的属性建立联系，任何一个修改都会引起另外一个变化。

------

ref 的其它API4个并介绍：

- unref - 用于获取ref引用中的value，这是`val = isRef(val) ? val.value : val`的语法糖函数。
- isRef - 判断值是否是一个ref对象。
- shallowRef - 创建一个浅层的ref对象。
- triggerRef - 手动触发和shallowRef相关联的副作用。

------

ref 和 reactive 默认都能实现对象的深层响应式。

------

shallowRef 和 triggerRef 的结合使用案例实现。

```vue
<template>
  <h2>{{ shallowInfo }}</h2>
  <button @click="changeInfo">修改Info</button>
</template>
<script>
import { shallowRef, triggerRef } from "vue";
export default {
  setup() {
    const shallowInfo = shallowRef({ name: "zzt" });
    const changeInfo = () => {
      shallowInfo.value.name = "Lingard";
      triggerRef(shallowInfo); // 手动触发shallowRef的副作用，执行shallowInfo对象深层的响应式。
    };
    return { shallowInfo, changeInfo, };
  },
};
</script>
```

------

customRef 的使用场景，

- 创建一个自定义 ref，对其依赖项跟踪和重新触发。

ref-debounce 案例（双向绑定属性进行节流操作）

App.vue

```vue
<template>
  <input type="text" v-model="message" />
  <h2>{{ message }}</h2>
</template>
<script>
import debounceRef from "./hook/useDebounceRef";
export default {
  setup() {
    const message = debounceRef("Hello World");
    return { message };
  },
};
</script>
```

useDebounceRef.js

```javascript
import { customRef } from 'vue'
// 自定义ref
export default function (value, delay = 300) {
  let timer = null
  return customRef((track, trigger) => {
    return {
      get() {
        track() // 收集依赖
        return value
      },
      set(newValue) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          trigger() // 触发响应式
        }, delay);
      }
    }
  })
}
```

------

setup 中实现计算属性API是 `computed`，使用方式：

1. 接受一个 getter 函数，并为 getter 函数返回的值，返回一个不变的 ref 对象。

   ```javascript
   import { ref, computed } from "vue";
   export default {
     setup() {
       const firstName = ref("Jesse");
       const lastName = ref("Lingard");
       // 1. 用法一：传入一个 getter 函数，computed 的返回值是一个 ref 对象
       const fullName = computed(() => firstName.value + ' ' + lastName.value)
       return { fullName };
     },
   };
   ```
   
2. 接受一个具有 get 和 set 方法的对象，返回一个可变的（可读写）ref 对象。

   ```javascript
   import { ref, computed } from "vue";
   export default {
     setup() {
       const firstName = ref("Jesse");
       const lastName = ref("Lingard");
       // 用法二：传入一个对象，对象包含 getter/setter
       const fullName = computed({
         get: () => firstName.value + " " + lastName.value,
         set: (newValue) => {
           const names = newValue.split(" ");
           firstName.value = names[0];
           lastName.value = names[1];
         },
       });
       const changeName = () => {
         fullName.value = "Zhu Zetian";
       };
       return { fullName, changeName };
     },
   };
   ```

------

setup 中侦听器提供了2种API并介绍：

- watchEffect - 用于自动收集响应式数据依赖。
- watch - 手动指定侦听的数据源。

------

watchEffect 的2个特点：

1. 传入的函数会被立即执行一次，在执行过程中收集依赖。
2. 当收集的依赖发生变化时，侦听函数会再次执行。

------

watchEffect的基本使用：

```vue
<template>
	<h2>{{name}}-{{age}}</h2>
	<button @click="changeName">修改name</button>
	<button @click="changeAge">修改age</button>
</template>
<script>
  import { ref, watchEffect } from 'vue';
  export default {
    setup() {
      // watchEffect: 自动收集响应式的依赖
      const name = ref("why");
      const age = ref(18);
      watchEffect(() => {
        console.log("name:", name.value, "age:", age.value);
      });
      const changeName = () => name.value = "kobe"
      const changeAge = () => age.value++
      return { name, age, changeName, changeAge }
    }
  }
</script>
```

------

watchEffect 停止侦听的使用。

```javascript
const stopWatch = watchEffect(() => {
  console.log("name:", name.value, "age:", age.value);
});
const changeAge = () =>{
  age.value++ 
  if (age.value > 20) { // age大于20，停止侦听。
    stopWatch()
  }
}
```

------

什么是 watchEffect 的副作用？

- watchEffect 传入的侦听函数中执行的代码称之为副作用。

怎么清除副作用？

1. watchEffect 传入的侦听函数被回调时，可获取到一个函数类型的参数：通常名命为 onInvalidate，
2. 在侦听函数再次执行或侦听器停止时，会执行 onInvalidate 中传入的回调函数。
3. 可在该回调函数中执行一些清理工作。

```javascript
const name = ref("why");
const age = ref(18);
watchEffect((onInvalidate) => {
  const timer = setTimeout(() => {
    console.log("网络请求成功~");
  }, 2000)
  // 在这个函数中清除额外的副作用
  onInvalidate(() => {
    clearTimeout(timer);
  })
  console.log("name:", name.value, "age:", age.value);
});
```

------

在 `setup` 中如何使用类似于 `$refs` 的功能拿到元素或组件实例对象

1. 定义一个 ref 对象（传入null），将它绑定到元素或者组件的ref属性上即可

   ```vue
   <template>
     <h2 ref="title">哈哈哈</h2>
   </template>
   <script>
     import { ref } from 'vue';
     export default {
       setup() {
         const title = ref(null);
         return { title }
       }
     }
   </script>
   ```

2. 可在对应的生命周期函数（onMounted）中通过`title`拿到元素本身。

3. 这里我们使用 watcheffect 通过 title 来拿元素，会发现获取了2次，第一次为null，第二次为元素本身。这是因为：

   1. setup 函数在执行时，watchEffect 会立即执行副作用函数。这个时候 DOM 并没有挂载，所以获取null
   2. 当 DOM 挂载时，会给 title 的 ref 对象赋新的值，副作用函数再次执行，获取对应的元素。

   ```javascript
   const title = ref(null);
   watchEffect(() => {
     console.log(title.value);
   })
   ```

4. 如果希望在第一次就拿到元素本身，需要改变副作用函数的执行时机。

   ```javascript
   const title = ref(null);
   watchEffect(() => {
     console.log(title.value);
   }, {
     // 设置副作用函数的执行时机。
     flush: 'post' // 默认值pre，还可接收sync，低效，谨慎使用。
   })
   ```

------

调整 watchEffect 的执行时机，一般用于哪些场景：

- 取模版中元素或组件实例对象。

------

setup 中 watch API的介绍：

1. 需要侦听特定的数据源，并在回调函数中执行副作用。
2. 默认情况下是惰性的，只有当侦听的数据源发生变化时才会执行回调。

watch 与 watchEffect 的区别：

- 指定侦听的数据源。
- 惰性执行副作用（第一次不会直接执行）
- 可访问侦听数据源变化前后的值（watchEffect只能访问变化后的值）。

------

watch 侦听单个数据源，可传2种类型：

- 一个 getter 函数，该函数必须要引用响应式对象（如 reactive 或 ref）。
- 一个响应式对象，reactive 或者 ref（常用）

------

watch 侦听单个数据源，newVal 和 oldVal 拿到普通值和响应式对象的4种情况。

1. 侦听一个 reactive 对象，newVal 和 oldVal 是响应式对象（Proxy）。

   ```javascript
   const info = reactive({name: "zzt", age: 18});
   watch(info, (newVal, oldVal) => {
     // newVal和oldVal拿到的是响应式对象（Proxy）
   })
   ```

2. 侦听一个 reactive 对象中的某一属性，newVal 和 oldVal 拿到的是值本身。

   ```javascript
   const info = reactive({name: "zzt", age: 18});
   watch(() => info.name, (newVal, oldVal) => {
     // newVal和oldVal拿到的是值本身
   })
   ```

3. 侦听一个 ref 对象，newVal 和 oldVal 拿到的是值本身。

   ```javascript
   const name = ref('zzt');
   watch(name, (newVal, oldVal) => {
     // newVal和oldVal拿到的是值本身
   })
   ```

4. 侦听一个展开复制后 reactive 对象，newVal 和 oldVal 拿到的是对象本身，而不是响应式对象（Proxy）

   ```javascript
   const info = reactive({name: "zzt", age: 18});
   watch(() => ({...info}), (newVal, oldVal) => {
     // newVal和oldVal拿到的是对象本身
   })
   ```

------

watch 侦听多个数据源，传入一个数组，对应的 newVal 和 oldVal 可做**数组解构**：

```javascript
const info = reactive({name: "zzt", age: 18});
const players = reactive(['Lingard', 'Ronaldo', 'DeBruyne', 'Vardy'])
const name = ref('zzt')
watch([info, () => [...players], name], ([newInfo, newPlayer, newName], [oldInfo, oldPlayer, oldName]) => {
  // newInfo, oldInfo拿到的是响应式对象，
  // newPlayer, oldPlayer, newName, oldName 拿到的是值本身。
})
```

------

watch 传入 reactive 对象默认能深度侦听

```javascript
const info = reactive({
  name: "zzt",
  friend: {
    name: 'lingard'
  }
});
const changeData = () => {
  info.friend.name = "james";
}
watch(info, (newVal, oldVal) => {
  // info默认能做深度监听。
})
```

------

watch 传入的 get 函数返回一个响应式对象的展开复制，不会做深度侦听，在 watch 中配置使用深度侦听和立即执行。

```javascript
const info = reactive({
  name: "zzt",
  friend: {
    name: 'lingard'
  }
});
const changeData = () => {
  info.friend.name = "james";
}
watch(() => ({...info}), (newVal, oldVal) => {
  // info默认不能做深度监听。需要配置
}, {
  deep: true, // 深度监听
  immediate: true // 立即执行
})
```

