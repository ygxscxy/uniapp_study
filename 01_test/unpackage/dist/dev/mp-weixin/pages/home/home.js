"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    let name = common_vendor.ref();
    let age = common_vendor.ref();
    common_vendor.onLoad((option) => {
      console.log(option);
      name.value = option.name;
      age.value = option.age;
    });
    common_vendor.onReady(() => {
      console.log("onReady");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(name))
      };
    };
  }
};
wx.createPage(_sfc_main);
