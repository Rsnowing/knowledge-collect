## 定义
类描述了所创建的对象共同的属性和方法。通过 class 关键字声明一个类，主要包含 属性、构造函数、方法。
## 继承 extends
```js
class Person {
    public name: string
    public age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    say() {
        return 'hahh'
    }
}
// 继承
class Teacher extends Person {
    constructor(name: string) {
        // 调用父类的构造方法
        super(name)
    }
    // 重写父类方法
    say() {
        // 执行父类返回
        return super.say() + 'i am child'
    }
    teach(subject: string) {
        return `i teach ${subject}`
    }
}
```
## 访问修饰符
TypeScript 可以使用四种访问修饰符 public、protected、private 和 readonly。
默认public  
protecteds： 只能被类的内部以及类的子类访问。  
private： 只能被类的内部访问
readonly： 只读属性必须在声明时或构造函数里被初始化
### Getter Setter
## 静态方法 static 
通过 static 关键字来创建类的静态成员，只能在类本身，类的实例无法访问

## 抽象类
abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法。  
通常我们需要创建子类继承抽象类，将抽象类中的抽象方法一一实现，这样在大型项目中可以很好的约束子类的实现。

## 单例模式
```js
class Demo {
    private static instance: Demo;
    private constructor(public name: string) {}
    static getInstance() {
        if(!this.instance) {
            this.instance = new Demo('llhe')
        }
        return this.instance
    }
}
const demo1 = new Demo.getInstance()
const demo2 = new Demo.getInstance()
demo1.name // llhe
demo2.name // llhe
```



