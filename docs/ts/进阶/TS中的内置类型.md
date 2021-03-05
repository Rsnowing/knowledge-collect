
# 内置类型
## Partial
ts中的实现:
```ts
// node_modules/typescript/lib/lib.es5.d.ts

type Partial<T> = {
  [P in keyof T]?: T[P];
};
```
这个类型的作用原理是在类型的属性上加上?修饰符, 将属性变为不必须属性.<br/>

```ts
interface Person {
  name: string;
  age: number;
}

type NewPerson = Partial<Person>
// 此时NewPerson等同于👇
interface Person {
  name?: string;
  age?: number;
}
```

but Partial有个局限,就是只支持改变第一层的属性.如果想要处理多层,可以自己实现:
```ts
export type PowerPartial<T> = {
    // 如果是 object，则递归类型
  [U in keyof T]?: T[U] extends object
    ? PowerPartial<T[U]>
    : T[U]
};
```

## Required
ts中的实现:
```ts
// node_modules/typescript/lib/lib.es5.d.ts

type Required<T> = {
  [P in keyof T]-?: T[P];
};
```
作用原理是给每个属性加上`-?`修饰符,表示移除`?`修饰符.

## Readonly
ts中的实现
```ts
// node_modules/typescript/lib/lib.es5.d.ts

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```
作用原理是给每个属性加上`readonly`修饰符.

## Pick
ts中的实现
```ts
// node_modules/typescript/lib/lib.es5.d.ts

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```
这个类型则可以将某个类型中的子属性挑出来<br/>
举个例子
```ts
type NewPerson = Pick<Person, 'name'>; // { name: string; }
```

## Record
ts中的实现
```ts
// node_modules/typescript/lib/lib.es5.d.ts

type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```
可以获得根据 K 中的所有可能值来设置 key 以及 value 的类型，举个例子
```ts
type T11 = Record<'a' | 'b' | 'c', Person>; // { a: Person; b: Person; c: Person; }
```


## Exclude
ts中的实现
```ts
// node_modules/typescript/lib/lib.es5.d.ts

type Exclude<T, U> = T extends U ? never : T;
```
这个类型可以将 T 中的某些属于 U 的类型移除掉，举个例子
```ts
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
```

如果需要extends 某个接口 又需要overwrite掉某些属性, 实现:
```ts
interface PP {
  name: string,
  age: number,
  salary: string
}
// 如果Programmer想要继承PP,并且将salary类型重载成number.写法如下:
interface Programmer extends Pick<PP, 'age' | 'name'> {
  salary: number
}
```
如上,把PP中的类型做了挑选,只把age和name挑选出来extend,重写salary就OK了。但是这种写法属性少还好,属性多,只想重载少数属性的情况可咋整,这个时候就可以把Exclude 与 Pick结合使用。
```ts
interface Programmer extends Pick<PP, Exclude<keyof PP, 'salary'>> {
  salary: number
}
```
🌻抽离成单独的类型
```ts
type FilterPick<T, U> = Pick<T, Exclude<keyof T, U>>;
```

以上可以写成:
```ts
interface Programmer extends FilterPick<PP, 'salary'> {
  salary: number
}
```
这样就可以进行overwrite了

## ReturnType
ts中的实现
```ts
// node_modules/typescript/lib/lib.es5.d.ts

type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
```
ReturnType可以获取方法的返回类型.
```ts
function TestFn() {
  return '123123';
}

type T01 = ReturnType<typeof TestFn>; // string
```

## ThisType
ts中的实现
```ts
// node_modules/typescript/lib/lib.es5.d.ts

interface ThisType<T> { }
```
用于指定上下文对象类型的。
```ts
interface Person {
  name: string;
  age: number;
}
// 指定 obj 里的所有方法里的上下文对象改成 Person 这个类型了
const obj: ThisType<Person> = {
  dosth() {
    this.name // string
  }
}
```
以下效果差不多
```ts
const obj = {
  dosth(this: Person) {
    this.name // string
  }
}
```

## NonNullable
ts中实现
```ts
// node_modules/typescript/lib/lib.es5.d.ts

type NonNullable<T> = T extends null | undefined ? never : T;
```
用来过滤null与undefined类型
```ts
type T22 = '123' | '222' | null;
type T23 = NonNullable<T22>; // '123' | '222'
```

## ... 长期记录
## 参考链接
* [github参考](https://github.com/whxaxes/blog/issues/14)

