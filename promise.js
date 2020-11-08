// promise本身
function myPromise(fun) {
    let that=this;
    this.$status='pending',
    this.successCallback=null,
    this.errorCallback=null
    fun(resolve,reject)
    function resolve(res) {
        if(that.$status=='pending'){
            that.$status='success'
            that.successCallback&&that.successCallback(res)
        }
    }
    function reject(err) {
        if(that.$status=='pending'){
            that.$status='error'
            that.errorCallback&&that.errorCallback(err)
        }
    }
}
// promise.then
myPromise.prototype.then=function (resolve,reject) {
    this.successCallback=resolve;
    this.errorCallback=reject;
}
// promise.all
myPromise.all=function(arr) {
    if(!Array.isArray(arr)){
        return new myPromise((res,rej)=>{
            rej('不是一个数组')
        })
    }
    let resArr=[]
    return new myPromise(_=>{
        arr.forEach((v,i)=>{
            myPromise.resolve(v).then(res=>{
                resArr[i]=res
                if(arr.length==resArr.filter(n=>n).length){
                    _(resArr)
                }
            })
        })
    })
}
// promise.race
myPromise.race=function(arr) {
    return new myPromise(res=>{
        arr.forEach(_=>{
            myPromise.resolve(_).then(data=>{
                res(data)
            })
        })
    })
}

myPromise.resolve=function(v){
    return new myPromise((res,rej)=>{
        v.then(_=>{
            res(_)
        })
    })
}

myPromise.reject=function(v){
    return new myPromise((res,rej)=>{
        v.then(_=>{
            rej(_)
        },err=>{
            rej(_)
        })
    })
}
// 调用promise
new myPromise((res,rej)=>{
    setTimeout(() => {
        res('2')
    }, 100);
}).then(res=>{
    console.log('res',res)
},err=>{
    console.log('err',err)
})


// 测试race all
myPromise.race([
    new myPromise(res=>{
        setTimeout(() => {
            res(1)
        }, 100);
    }),
    new myPromise(res=>{
        setTimeout(() => {
            res(2)
        }, 200);
    }),
    new myPromise(res=>{
        setTimeout(() => {
            res(3)
        }, 300);
    }),
]).then(res=>{
    console.log(res)
})