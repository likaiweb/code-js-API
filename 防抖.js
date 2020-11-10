
/**
 * @description 防抖函数
 * @param {*} func 要防抖的函数
 * @param {*} wait 防抖时间
 * @param {*} lazy 是否立即执行
 */
function debounce(func,wait,lazy) {
    let timeout
    return function(){
        const that=this;
        const params=arguments
        if(timeout){clearTimeout(timeout)}
        if(lazy){
            timeout=setTimeout(() => {
                func.apply(that,params)
            }, wait);
        }else{
            timeout=setTimeout(() => {
                timeout=null;
            }, wait);
            if(!timeout)func.apply(that,params)
        }
    }
}
