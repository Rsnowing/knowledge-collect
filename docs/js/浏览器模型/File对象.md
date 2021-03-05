## File对象
File 对象代表一个文件，用来读写文件信息。它继承了 Blob 对象，或者说是一种特殊的 Blob 对象，所有可以使用 Blob 对象的场合都可以使用它。

最常见的使用场合是表单的文件上传控件（<input type="file">），用户选中文件以后，浏览器就会生成一个数组，里面是每一个用户选中的文件，它们都是 File 实例对象。

```js
// HTML 代码如下
// <input id="fileItem" type="file">
var file = document.getElementById('fileItem').files[0];
file instanceof File // true
```

### 构造函数
浏览器原生提供一个File()构造函数，用来生成 File 实例对象。

```js
new File(array, name [, options])
```
File()构造函数接受三个参数
* array：一个数组，成员可以是二进制对象或字符串，表示文件的内容。
* name：字符串，表示文件名或文件路径。
* options：配置对象，设置实例的属性。该参数可选

第三个参数配置对象，可以设置两个属性。
* type：字符串，表示实例对象的 MIME 类型，默认值为空字符串。
* lastModified：时间戳，表示上次修改的时间，默认为Date.now()。

```js
var file = new File(
  ['foo'],
  'foo.txt',
  {
    type: 'text/plain',
  }
);
```

### 实例属性和实例方法
* File.lastModified：最后修改时间
* File.name：文件名或文件路径
* File.size：文件大小（单位字节）
* File.type：文件的 MIME 类型
```js
var myFile = new File([11], 'file.bin', {
  lastModified: new Date(2018, 1, 1),
});
myFile.lastModified // 1517414400000
myFile.name // "file.bin"
myFile.size // 2
myFile.type // ""
```

> File 对象没有自己的实例方法，由于继承了 Blob 对象，因此可以使用 Blob 的实例方法slice()。

## FileList 对象
FileList对象是一个类似数组的对象，代表一组选中的文件，每个成员都是一个 File 实例。它主要出现在两个场合。

* 文件控件节点（`<input type="file">`）的files属性，返回一个 FileList 实例。
* 拖拉一组文件时，目标区的DataTransfer.files属性，返回一个 FileList 实例。
```js
// HTML 代码如下
// <input id="fileItem" type="file">
var files = document.getElementById('fileItem').files;
files instanceof FileList // true
```
FileList 的实例方法主要是item()，用来返回指定位置的实例。它接受一个整数作为参数，表示位置的序号（从零开始）。但是，由于 FileList 的实例是一个类似数组的对象，可以直接用方括号运算符，即myFileList[0]等同于myFileList.item(0)，所以一般用不到item()方法。

## FileReader 对象 
FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容。
```js
var reader = new FileReader();
```



<iframe height="265" style="width: 100%;" scrolling="no" title="File-FileReader" src="https://codepen.io/rsnowing-the-reactor/embed/JjXmjdy?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/rsnowing-the-reactor/pen/JjXmjdy'>File-FileReader</a> by hell
  (<a href='https://codepen.io/rsnowing-the-reactor'>@rsnowing-the-reactor</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>