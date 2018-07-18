## react

#### 特点

- 一个简单的view类库，很多时候需要其他的类库协助它去完成页面工作。

- 面向组件的开发，将应用以组件的形式拼装起来

- 单向数据流，从上往下流（父组件往子组件流动），它们是组件间的纽带

- Virtual DOM，调用setState更新视图状态，会通过Diff算法去比较新旧2个Virtual DOM差别，最小化重新渲染节点


#### 性能提升

- shouldComponentUpdate，自己进行数据比较判断是否需要更新，返回true 会生成虚拟DOM=>DOM Diff=>更新DOM
- 如果是列表，绑定key关键词，对Diff算法有帮助，确定元素位置，提升增删改性能
- PureComponent 代替 Component，前者是对state的浅比较

#### 生命周期

初始
constructor 
getInitialState 
getDefaultProps 
componentWillMount 
render 
componentDidMount 

更新
componentWillReceiveProps 
shouldComponentUpdate 
componentWillUpdate 
render 
componentDidUpdate 

卸载
componentWillUnmount





## redux

一个数据存储和管理器。

所有数据存在store中，数据流进react各个组件（或者其他类库、框架）,触发事件后调用action（可能是一个简单的数据累加，也可能是一个ajax），然后到reducer，它负责数据的在组合，生成一个新的state。

#### redux中间件

拦截 action -> reducer 的过程，变为action -> middlewares -> reducer

#### 缺点

编写更多代码，生成action、reducer方法等。

所有的数据完全从父组件留下来，写的不好可能引起大量组件更新，影响性能。