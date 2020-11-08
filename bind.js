Function.prototype.myBind=function(){
    const that=this,
    bindThis=[].shift.call(arguments)
    params=[].slice.call(arguments)
    return function () {
        that.apply(bindThis,[...params,[].slice.call(arguments)])
    }
}
function a() {
    this.name='aa';
    this.getName=function(){
        console.log(this.name)
    }
}
function b() {
    this.name='bb'
}

let aa=new a()
let bb=new b()
aa.getName()  // aa
aa.getName.myBind(bb)()  // bb