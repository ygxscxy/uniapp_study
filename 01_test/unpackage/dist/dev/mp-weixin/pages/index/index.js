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
    common_vendor.onLoad(() => {
      console.log("onLoad");
    });
    common_vendor.onShow(() => {
      console.log("onShow");
    });
    common_vendor.onUnload(() => {
      console.log("onUnload");
    });
    const refSonComp = common_vendor.ref();
    common_vendor.onMounted(() => {
      console.log(refSonComp.value);
    });
    const getData = (value) => {
      console.log(value.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(refSonComp, "deb4a5ae-0", {
          "k": "refSonComp"
        }),
        b: common_vendor.o(getData),
        c: common_vendor.f(100, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item
          };
        })
      };
    };
  }
};
_sfc_main.__runtimeHooks = 1;
wx.createPage(_sfc_main);
