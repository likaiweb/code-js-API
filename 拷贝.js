
// 无拷贝
let a={
    b:1
}
let b=a;
a.b=2;
console.log(b)
// {b:2}

// 浅拷贝
let a={
    b:1
}
let b={}
for (const i in a) {
    if (a.hasOwnProperty(i)) {
        b[i]=a[i]
    }
}
a.b=2;
console.log(b)
// {b:1}

// 深拷贝
let a={
    b:1
}
let b=JSON.parse(JSON.stringify(a))
a.b=2;
console.log(b)
// {b:1}
// 弊端：无法拷贝一些对象（new Date,new Regexp）无法拷贝函数，我发拷贝undefined,null等
// eg:
let a={
    a:undefined,
    b:NaN,
    c:function(params) {
        
    },
    d:new Date()
}
const b=JSON.parse(JSON.stringify(a))
console.log(b)
// { b: null, d: '2020-11-19T04:45:18.980Z' }


// 递归深拷贝s
let a={
    a:{
        x:1,
        y:2
    },
    b:NaN,
    c:function(params) {
        
    },
    d:new Date(),
    f:'123'
}
function deepClone(target) {
    if(target!==null&&typeof target === 'object'){
        let res={}
        for (const i in target) {
            if (target.hasOwnProperty(i)) {
                res[i] = deepClone(target[i]);
            }
        }
        return res
    }else{
        return target
    }
}
const b=deepClone(a)
console.log(b)
/**
 * {
  a: { x: 1, y: 2 },
  b: NaN,
  c: [Function: c],
  d: 2020-11-19T05:01:47.671Z,
  f: '123'
}
 */