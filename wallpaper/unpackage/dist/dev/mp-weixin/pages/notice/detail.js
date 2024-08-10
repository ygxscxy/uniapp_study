"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const service_modules_notice = require("../../service/modules/notice.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const detail = common_vendor.ref(null);
    const id = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      id.value = option == null ? void 0 : option.id;
    });
    common_vendor.onMounted(async () => {
      if (id.value) {
        const res = await service_modules_notice.getNoticeDetail(id.value);
        detail.value = res.data;
      }
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.p({
          inverted: true,
          text: "置顶",
          type: "error"
        }),
        b: common_vendor.t((_a = detail.value) == null ? void 0 : _a.title),
        c: common_vendor.p({
          date: Date.now(),
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        d: id.value == "index"
      }, id.value == "index" ? {
        e: common_assets._imports_0$1
      } : {
        f: (_b = detail.value) == null ? void 0 : _b.content
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f737f11"]]);
wx.createPage(MiniProgramPage);
