// 观察可视区域，进行埋点操作
// 异步函数，在requestIdleCallback时触发

// 下载,chrome本身有这个对象，safari不支持，所以要下载一个包
// npm i intersection-observer

// API解释
/**
 * @description 申明对象
 * @param {function} callback - 回调函数
 * @param {object} option - 配置参数 
 */
var io = new IntersectionObserver(callback, option);
// 开始观察
io.observe(Dom)
// 停止观察
io.unobserve(Dom)
// 关闭观察
io.disconnect()
/**
 * @description IntersectionObserver的callback函数
 * @param {Array} v - 所有观察的元素，IntersectionObserverEntry对象
 * @param {Date} time - v[],可见性发生变化的时间,时间戳
 * @param {object} rootBounds - v[],根元素的矩形区域的信息，wdth,height,x,y,left,right,bottom,top
 * @param {object} target - v[],所观察的元素
 * @param {object} boundingClientRect - v[],目标元素的矩形区域的信息
 * @param {object} intersectionRect - v[],目标元素与视口（或根元素）的交叉区域的信息
 * @param {object} intersectionRatio - v[],目标元素的可见比例 0～1
 */
function callback(v){}

/**
 * @description IntersectionObserver的option配置项
 * @param {Document} root - 可视容器
 * @param {string} rootMargin - 可视容器的margin, top，right，bottom，left
 * @param {Array} threshold - 在什么位置的时候触发,0~1,如下意思是显示比例0时触发，1时再次触发
 */
option={
    root:Dom,
    rootMargin:'500px 0px',
    threshold:[0,1]
}

// 埋点具体操作
// 获取所有DOM，放在nextTick，异步中
const itemList = [...document.querySelectorAll('.item')]
if (!this.io) {
    this.io = new IntersectionObserver(_ => {
    _.forEach(v => {
        if (v.isIntersecting) {
            // 存在标示，退出
            if (v.target._observed) {
                return
            }
            // 埋点操作

            // 添加标示，停止监听
            v.target._observed = true
            this.io && this.io.unobserve(v.target)
        }
    })
    }, {
        root: null,
        threshold: [1],
    })
}
// 所有dom循环，进行监听
itemList.forEach(v => this.io && this.io.observe(v))


// 销毁时，停止监听，注销对象
this.io.disconnect()
this.io = null