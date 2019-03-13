import {
  SignPackage
} from "@/components/axios/api";
const value = localStorage.getItem("keys");
const url = window.location.href;
if (value == null) return;

export const commonShare = (_this, shareTitle, shareDesc) => {
  SignPackage(url, value)
    .then(res => {
      console.log(res.data.data.signPackage);
      let signPackage = res.data.data.signPackage;
      this.$wx.config({
        debug: false,
        appId: signPackage.appId,
        timestamp: signPackage.timestamp,
        nonceStr: signPackage.nonceStr,
        signature: signPackage.signature,
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "translateVoice"
        ]
      });
      // this.$wx.ready(function() {
      this.$wx.onMenuShareTimeline({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:  "http://h5.ngba.cn/image/pic300.jpg", // 分享图标

        success: function () {
          _this.$toast({
            message: "分享成功",
            duration: "500"
          });
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {

          _this.$toast({
            message: "取消分享成功",
            duration: "500"
          });
          // 用户取消分享后执行的回调函数
        }
      });
      this.$wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:  "http://h5.ngba.cn/image/pic300.jpg", // 分享图标
        success: function () {
          _this.$toast({
            message: "分享成功",
            duration: "500"
          });
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          _this.$toast({
            message: "取消分享成功",
            duration: "500"
          });
        }
      });
      // });
    })
    .catch(err => {
      console.log(err, "请求失败");
    });
}
