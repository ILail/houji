const location = global.location
const u = navigator.userAgent
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default {
  beforeRouteEnter(to, from, next) {
    if (isiOS && to.path !== location.pathname) {
      // 此处不能使用location.replace
      console.log(to.fullPath)
      location.assign(to.fullPath)
    } else {
        console.log(1212)
      next()
    }
  }
}