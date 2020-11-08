// 装饰器，不编译无法运行
// 类的前置方法，用来修饰类、类的方法
// 一般用于解偶，或者多个类会执行相同方法时。eg:log,test

// 添加静态属性
/**
 * @description 定义一个装饰器函数，添加一个type属性
 * @param {object} target - 类本身
 */
function addkey(target){
    target.type="class"
}
@addkey
class A{}

@addkey
class B{}

console.log(A.type)
console.log(B.type)
// class, class

// 传值添加属性
function addkey(type){
    return function(target){
        target.type=`class${type}`
    }
}
@addkey('A')
class A{}
console.log(A.type)
// classA

// 原型上添加
function addkey(type){
    return function(target){
        target.prototype.type=`class${type}`
        // or
        Object.assign(target.prototype,{type:`class${type}`})
    }
}
@addkey('A')
class A{}


// 类中方法的修饰
/**
 * 
 * @param {*} target - 类的原型，A.prototype
 * @param {*} name - 属性名
 * @param {*} descriptor - 属性的描述对象，value，enumerable，configurable，writable
 */
function readOnly(target,name,descriptor){
    // 修改其描述对象的属性
    descriptor.enumerable=false;
    return descriptor;
}
function log(target,name,descriptor){
    console.log(`name is ${name}`)
    return descriptor;
}
class A{
    @log
    @readOnly
    name(){
        return 'a'
    }
}

// 可以用于注释
@log
@readOnly
@test
class A{}

// **装饰器不能用于普通函数，js存在函数提升，会先申明函数，无法起到装饰的作用。