"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _component_uni_rate = common_vendor.resolveComponent("uni-rate");
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _component_uni_rate + _component_uni_popup)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const infoPopup = common_vendor.ref(null);
    const scorePopup = common_vendor.ref(null);
    const userScore = common_vendor.ref(0);
    const clickInfo = () => {
      infoPopup.value.open();
    };
    const clickInfoClose = () => {
      infoPopup.value.close();
    };
    const clickScore = () => {
      scorePopup.value.open();
    };
    const clickScoreClose = () => {
      scorePopup.value.close();
    };
    const submitScore = () => {
      console.log("评分了");
    };
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(5, (item, k0, i0) => {
          return {};
        }),
        b: common_vendor.o(maskChange),
        c: common_assets._imports_0$1,
        d: maskState.value
      }, maskState.value ? {
        e: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        f: common_vendor.o(goBack),
        g: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        h: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        i: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        j: common_vendor.p({
          type: "info",
          size: "28"
        }),
        k: common_vendor.o(clickInfo),
        l: common_vendor.p({
          type: "star",
          size: "28"
        }),
        m: common_vendor.o(clickScore),
        n: common_vendor.p({
          type: "download",
          size: "23"
        })
      } : {}, {
        o: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        p: common_vendor.o(clickInfoClose),
        q: common_vendor.p({
          readonly: true,
          touchable: true,
          value: "3.5",
          size: "16"
        }),
        r: common_vendor.f(3, (item, k0, i0) => {
          return {};
        }),
        s: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        t: common_vendor.p({
          type: "bottom"
        }),
        v: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        w: common_vendor.o(clickScoreClose),
        x: common_vendor.o(($event) => userScore.value = $event),
        y: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        z: common_vendor.t(userScore.value),
        A: common_vendor.o(submitScore),
        B: !userScore.value,
        C: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        D: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
wx.createPage(MiniProgramPage);
