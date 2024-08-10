"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const service_modules_userinfo = require("../../service/modules/userinfo.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userinfo = common_vendor.ref(null);
    common_vendor.onLoad(() => {
      service_modules_userinfo.getUserInfo().then((res) => {
        userinfo.value = res.data;
      });
    });
    const commonProblemHandler = async () => {
      common_vendor.index.navigateTo({
        url: "/pages/notice/detail?id=6536358ce0ec19c8d67fbe82"
      });
    };
    const declaremHandler = async () => {
      common_vendor.index.navigateTo({
        url: "/pages/notice/detail?id=65360ea7bd0220d7635bd34b"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userinfo.value
      }, userinfo.value ? {
        b: common_assets._imports_0,
        c: common_vendor.t(userinfo.value.IP),
        d: common_vendor.t(userinfo.value.address.city || userinfo.value.address.province || userinfo.value.address.country),
        e: common_vendor.p({
          type: "download-filled",
          size: "20"
        }),
        f: common_vendor.t(userinfo.value.downloadSize),
        g: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        h: `/pages/classiylist/classiylist?title=${"我的下载"}&type=${"download"}`,
        i: common_vendor.p({
          type: "star-filled",
          size: "20"
        }),
        j: common_vendor.t(userinfo.value.scoreSize),
        k: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        l: `/pages/classiylist/classiylist?title=${"我的评分"}&type=${"score"}`,
        m: common_vendor.p({
          type: "chatboxes-filled",
          size: "20"
        }),
        n: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        o: common_vendor.p({
          type: "notification-filled",
          size: "20"
        }),
        p: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        q: common_vendor.o(declaremHandler),
        r: common_vendor.p({
          type: "flag-filled",
          size: "20"
        }),
        s: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        t: common_vendor.o(commonProblemHandler)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
