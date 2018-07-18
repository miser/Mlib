## Event Loop

#### macrotasks

- setTimeout
- setInterval
- setImmediate
- requestAnimationFrame
- I/O
- UI rendering

#### microtasks

- process.nextTick
- Promises
- Object.observe
- MutationObserver



####循环

开始 -> 执行task列队里的第一个task -> 执行microtask全部任务依次执行 -> 执行task列队里的第一个task -> 再次取出microtask全部任务执行 -> ……………….