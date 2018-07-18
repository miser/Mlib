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





## 单侧

_mocha 运行、enzyme 测试reactjs、chai 断言、sinon mock等_

#### enzyme

- **shallow**：浅渲染，只会渲染出组件的第一层 DOM 结构，嵌套组件不会渲染，渲染的效率高
- **mount**：深度渲染，渲染为真实的 DOM 节点，需要全局范围内提供完整的 DOM API
- **render**：静态渲染，渲染成静态的 HTML 字符串，用Cheerio进行解析

我们以“爱眠物”里购物计数器按钮为例

```js
import React from 'react';
import ReactDOM from 'react-dom';

class Counter extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    add(value, e) {
        e.preventDefault();
        const max = this.props.max;
        let count;
        if (Number.isInteger(max) && (this.props.count + 1) > max) {
            count = this.props.count;
        } else {
            count = this.props.count + 1;
        }
        this.updateCount(count);
    }
    subtract(value, e) {
        e.preventDefault();
        const min = this.props.min;
        let count;
        if (Number.isInteger(min) && (this.props.count - 1) < min) {
            count = this.props.count;
        } else {
            count = this.props.count - 1;
        }
        this.updateCount(count);
    }

    updateCount(count) {
        const { onChange } = this.props;
        if (onChange && typeof onChange === 'function') {
            onChange(count);
        }
    }

    render() {
        const count = this.props.count || 0;
        return (
            <div className="number-button">
                <input type="text" className="number-text" readOnly={true} value={count} />
                <div className="action-button">
                    <input type="button" className="increase" name="count-add" value="+" onClick={this.add.bind(this, +1)} />
                </div>
                <div className="action-button">
                    <input type="button" className="decrease" name="count-subtract" value="-" onClick={this.subtract.bind(this, -1)} />
                </div>
            </div>
        )
    }
}

export default Counter;
```

测试代码

```js
import React from 'react';
import { mount, render, shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'; //选择当前React版本对应的adapter版本
configure({ adapter: new Adapter() });

import Counter from '../../public/dev-javascripts/components/counter';

// 我是通过props控制Counter数据状态的，所以每次需要调用setProps将最新的props传入组件
describe('counter', function () {
    let wrapper;
    let count;
    function onChange(value) {
        count = value;
    }
    it('布局', () => {
        wrapper = shallow(<Counter />);
        expect(wrapper.find('input')).to.have.length(3);
    })
    describe('不设置大小', () => {
        beforeEach(function () {
            count = 0;
            wrapper = shallow(<Counter count={count} onChange={onChange} />);
        });
        it('增加', () => {
            const addEl = wrapper.find("input[name='count-add']");
            for (var i = 0; i < 20; i++) {
                wrapper.setProps({ count: count })
                addEl.simulate('click', { preventDefault: () => undefined });
                expect(count).to.equal(i + 1);
            }
        })

        it('减少', () => {
            const subtractEl = wrapper.find("input[name='count-subtract']")
            for (var i = 0; i > -20; i--) {
                wrapper.setProps({ count: count })
                subtractEl.simulate('click', { preventDefault: () => undefined });
                expect(count).to.equal(i - 1);
            }
        })
    })

    describe('设置大小', () => {
        beforeEach(function () {
            count = 0;
            wrapper = shallow(<Counter count={count} min={0} max={10} onChange={onChange} />);
        });
        it('增加', () => {
            const addEl = wrapper.find("input[name='count-add']");
            for (var i = 0; i < 20; i++) {
                wrapper.setProps({ count: count })
                addEl.simulate('click', { preventDefault: () => undefined });
                if (i < 10) {
                    expect(count).to.equal(i + 1);
                } else {
                    expect(count).to.equal(10);
                }
            }
        })
        it('减少', () => {
            const subtractEl = wrapper.find("input[name='count-subtract']")
            for (var i = 0; i > -20; i--) {
                wrapper.setProps({ count: count })
                subtractEl.simulate('click', { preventDefault: () => undefined });
                expect(count).to.equal(0);
            }
        })
    });
});
```

因为mocha不支持ES6语法，所以需要执行前把babel-core注册进来

```js
mocha -w --require babel-core/register test/index.js
```

如果要用到mount渲染，那么需要模拟一个简单的浏览器环境，可以添加一个辅助脚本

```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';//把上面的Adapter移到这里那么其他的测试脚本就不需要添加这个代码了
configure({ adapter: new Adapter() });

var JSDOM = require('jsdom').JSDOM;
import _$ from 'jquery';
const { window } = new JSDOM(`<!DOCTYPE html><html><head><title></title></head><body></body></html>`);
const { document } = (new JSDOM(` `)).window;
var LocalStorage = require('node-localstorage').LocalStorage;

global.localStorage = new LocalStorage('./temp/localStorageTemp');
global.document = document;
global.window = document.defaultView;
global.window.localStorage = global.localStorage;
global.navigator = window.navigator;
global.$ = _$(document.defaultView);
global.jQuery = _$(document.defaultView);
```

```js
mocha -w --require babel-core/register test/helpers/browser.js test/index.js
```

