# process.exit([code])
code <integer> 退出码。默认值: 0。

process.exit() 方法以退出状态 code 指示 Node.js `同步地`终止进程。 如果省略 code，则使用成功代码 0 或 process.exitCode 的值（如果已设置）退出。 在调用所有的 'exit' 事件监听器之前，Node.js 不会终止。

使用失败代码退出：
```js
process.exit(1);
```

调用 process.exit() 将强制进程尽快退出，即使还有尚未完全完成的异步操作，包括对 process.stdout 和 process.stderr 的 I/O 操作。

在大多数情况下，实际上不必显式地调用 process.exit()。 如果事件循环中没有待处理的额外工作，则 Node.js 进程将自行退出。

代码不应直接调用 process.exit()，而应设置 process.exitCode 并允许进程自然退出，避免为事件循环调度任何其他工作：
```js
// 如何正确设置退出码，同时让进程正常退出。
if (someConditionNotMet()) {
  printUsageToStdout();
  process.exitCode = 1;
}
```