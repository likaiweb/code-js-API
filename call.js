function A() {
    this.name='a'
}
function B(params) {
    this.name='b'
    this.getName=function (type){
        console.log(this.name)
    }
}
console.log(A.name)  // A
console.log(new A().name)  // a
// 自定义call
Function.prototype.myCall=function(context) {
    // 函数保留下来，在要call的函数上添加属性
    context.fn=this;
    const args=[];
    // 遍历参数
    for (let i = 1,len=arguments.length; i < len; i++) {
        args.push(arguments[i])
    }
    // 调用
    context.fn(...args);
    // 删除该属性
    delete context.fn
}

const b=new B()
const a=new A()
b.getName.myCall(a,1,2,3)