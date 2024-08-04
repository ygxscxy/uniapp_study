"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref(0);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(100, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: {
              index
            }
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
