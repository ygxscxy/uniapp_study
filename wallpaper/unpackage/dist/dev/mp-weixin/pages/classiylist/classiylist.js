"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "classiylist",
  setup(__props) {
    common_vendor.onLoad((option) => {
      console.log(option);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(10, (item, k0, i0) => {
          return {};
        }),
        b: common_assets._imports_0$3
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d4bdad1a"]]);
wx.createPage(MiniProgramPage);
