patch函数分2种情况：

1. vnode1和vnode2是不同类型的节点（tag不同）
   1. 找到`vnode1`的`el`父节点，删除原来的`vnode1`节点的`el`
   2. 挂载`vnode2`节点到`vnode1`的`el`父节点上。
   
2. vnode1和vnode2节点是相同的节点：

   - 处理props的情况。
   - 处理children的情况。考虑新旧Vnode是否是字符串、数组两种情况。

index.html

```html
<script src="./renderer.js"></script>
<script>
const vnode = '旧节点' // 伪代码
// 3.2s后创建新的vnode
setTimeout(() => {
  const vnode1 = h('div', {class: "coderwhy", id: "aaa"}, [
    h("h2", null, "呵呵呵"),
    h("button", {onClick: function() {}}, "-1")
  ]); 
  patch(vnode, vnode1);
}, 2000)
</script>
```

render.js

```javascript
// n1旧，n2新
const patch = (n1, n2) => {
  if (n1.tag !== n2.tag) {
    const n1ElParent = n1.el.parentElement;
    n1ElParent.removeChild(n1.el);
    mount(n2, n1ElParent);
  } else {
    // 1.取出element对象, 并且在n2中进行保存
    const el = n2.el = n1.el;
    
    // 2.处理props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    // 2.1.获取所有的newProps关联到el（设置属性 / 添加事件）
    for (const key in newProps) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      if (newValue !== oldValue) {
        if (key.startsWith("on")) { // 对事件监听的判断
          el.addEventListener(key.slice(2).toLowerCase(), newValue)
        } else {
          el.setAttribute(key, newValue);
        }
      }
    }
    // 2.2.删除旧的props
    for (const key in oldProps) {
      if (key.startsWith("on")) { // 对事件监听的判断
        const value = oldProps[key];
        el.removeEventListener(key.slice(2).toLowerCase(), value)
      } 
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }

    // 3.处理children
    const oldChildren = n1.children || [];
    const newChidlren = n2.children || [];
    if (typeof newChidlren === "string") { // 情况一: newChildren本身是一个string
      // 边界情况 (edge case)
      if (typeof oldChildren === "string") {
        if (newChidlren !== oldChildren) {
          el.textContent = newChidlren
        }
      } else {
        el.innerHTML = newChidlren;
      }
    } else { // 情况二: newChildren本身是一个数组
      if (typeof oldChildren === "string") {
        el.innerHTML = "";
        newChidlren.forEach(item => {
          mount(item, el); // 调用之前写的mount方法
        })
      } else {
        // oldChildren: [v1, v2, v3, v8, v9]
        // newChildren: [v1, v5, v6]
        // 1.前面有相同节点的原生进行patch操作
        const commonLength = Math.min(oldChildren.length, newChidlren.length);
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChidlren[i]);
        }
        if (newChidlren.length > oldChildren.length) {
          newChidlren.slice(oldChildren.length).forEach(item => {
            mount(item, el);
          })
        }
        if (newChidlren.length < oldChildren.length) {
          oldChildren.slice(newChidlren.length).forEach(item => {
            el.removeChild(item.el);
          })
        }
      }
    }
  }
}
```

------

实现响应式原理，dep类实现，watchEffect重构，reactive和getDep的实现，reactive-proxy的实现。

reactive.js

```javascript
// watchEffect重构
let activeEffect = null;
function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}
// dep类实现
class Dep {
  constructor() {
    this.subscribers = new Set();
  }
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }
  notify() {
    this.subscribers.forEach(effect => {
      effect();
    })
  }
}
// getDep的实现
const targetMap = new WeakMap();
function getDep(target, property) {
  // 1.根据对象(target)取出对应的Map对象
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  // 2.取出具体的dep对象
  let dep = depsMap.get(property);
  if (!dep) {
    dep = new Dep();
    depsMap.set(property, dep);
  }
  return dep;
}
// reactive-proxy，vue3对raw进行数据劫持
function reactive(raw) {
  return new Proxy(raw, {
    get(target, property, reciver) {
      const dep = getDep(target, property);
      dep.depend();
      return Reflect.get(target, property, reciver);
    },
    set(target, property, value, reciver) {
      Reflect.set(target, property, value, reciver)
      const dep = getDep(target, property);
      dep.notify();
    }
  })
}
```

------

为什么Vue3选择Proxy

- proxy监听到的针对对象的操作更加丰富。比如对象中新增属性时，Vue2需要使用$set将属性加入响应式，而Vue3可以通过proxy来完成。

------

应用程序入口实现 createApp 和 mount

index.html

```html
<script src="./renderer.js"></script>
<script src="./reactive.js"></script>
<script src="./index.js"></script>
<script>
  // 1.创建根组件
  const App = {
    data: reactive({
      counter: 0
    }),
    render() {
      return h("div", null, [
        h("h2", null, `当前计数: ${this.data.counter}`),
        h("button", {
          onClick: () => {
            this.data.counter++
            console.log(this.data.counter);
          }
        }, "+1")
      ])
    }
  }

  // 2.挂载根组件
  const app = createApp(App);
  app.mount("#app");
</script>
```

index.js

```javascript
function createApp(rootComponent) {
  return {
    mount(selector) {
      const container = document.querySelector(selector);
      let isMounted = false;
      let oldVNode = null;
      watchEffect(function() {
        if (!isMounted) {
          oldVNode = rootComponent.render();
          mount(oldVNode, container);
          isMounted = true;
        } else {
          const newVNode = rootComponent.render();
          patch(oldVNode, newVNode);
          oldVNode = newVNode;
        }
      })
    }
  }
}
```

