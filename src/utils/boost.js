/* eslint-disable no-extend-native */
// 扩展方法，添加不重复的元素
Array.prototype.pushWithoutDuplicate = function () {
    for (let i = 0; i < arguments.length; i++) {
        const arg = arguments[i]
        if (this.indexOf(arg) === -1) {
            this.push(arg)
        }
    }
}
