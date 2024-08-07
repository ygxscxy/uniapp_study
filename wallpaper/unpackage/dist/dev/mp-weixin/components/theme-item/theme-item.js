"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "theme-item",
  props: {
    isshowLast: {
      type: Boolean,
      default: false
    },
    currentIndex: Number
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !__props.isshowLast
      }, !__props.isshowLast ? {
        b: common_assets._imports_0$4,
        c: `/pages/classiylist/classiylist?currentIndex=${__props.currentIndex}`
      } : {}, {
        d: __props.isshowLast
      }, __props.isshowLast ? {
        e: common_vendor.p({
          type: "more-filled",
          size: "34",
          color: "#fff"
        }),
        f: common_assets._imports_1
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4eafbca"]]);
wx.createComponent(Component);
