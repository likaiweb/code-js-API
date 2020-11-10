/**
 * @description - 节流函数，同下
 * @param {*} fun 要节流的函数
 * @param {*} wait 多少时间触发
 */
function throttle(fun,wait) {
    let time=0
    return function () {
        const that=this,params=arguments
        let now=new Date()
        if(now>time-wait){
            fun.apply(that,params)
            time=now
        }
    }
}
function throttle(fun,wait) {
    let timeout
    return function () {
        const that=this,params=arguments
        if(!timeout){
            timeout=setTimeout(() => {
                time=null
                fun.apply(that,params)
            }, wait);
        }
    }
}