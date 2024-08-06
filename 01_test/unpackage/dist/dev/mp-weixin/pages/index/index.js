"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_UserInfo2 = common_vendor.resolveComponent("UserInfo");
  _easycom_UserInfo2();
}
const _easycom_UserInfo = () => "../../components/UserInfo/UserInfo.js";
if (!Math) {
  _easycom_UserInfo();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.index.showActionSheet({
      itemList: ["A", "B", "C"],
      success: function(res) {
        console.log(res);
        console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
      },
      fail: function(res) {
        console.log(res.errMsg);
      }
    });
    common_vendor.index.showNavigationBarLoading();
    common_vendor.index.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#ff0000",
      animation: {
        duration: 400,
        timingFunc: "easeIn"
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr("refSonComp", "deb4a5ae-0"),
        b: common_vendor.o(_ctx.getData),
        c: common_vendor.t(_ctx.count)
      };
    };
  }
};
wx.createPage(_sfc_main);
