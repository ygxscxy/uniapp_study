"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_formatDate = require("../../utils/formatDate.js");
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
    currentIndex: Number,
    itemData: {
      type: Object,
      default() {
        return {
          name: "默认",
          updateTime: 1e3 * 60 * 60 * 5,
          picurl: "../../common/images/more.jpg"
        };
      }
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !__props.isshowLast
      }, !__props.isshowLast ? {
        b: common_vendor.t(common_vendor.unref(utils_formatDate.timeAgo)(__props.itemData.updateTime)),
        c: __props.itemData.picurl,
        d: common_vendor.t(__props.itemData.name),
        e: `/pages/classiylist/classiylist?classid=${__props.itemData._id}&title=${__props.itemData.name}`
      } : {}, {
        f: __props.isshowLast
      }, __props.isshowLast ? {
        g: common_vendor.p({
          type: "more-filled",
          size: "34",
          color: "#fff"
        }),
        h: common_assets._imports_0$1
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4eafbca"]]);
wx.createComponent(Component);
