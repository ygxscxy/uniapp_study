"use strict";
const common_vendor = require("../../common/vendor.js");
const service_modules_home = require("../../service/modules/home.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_common_title2 = common_vendor.resolveComponent("common-title");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_custom_nav_bar2 + _easycom_up_icon2 + _easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_common_title2 + _easycom_theme_item2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_common_title = () => "../../components/common-title/common-title.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_up_icon + _easycom_uni_icons + _easycom_uni_dateformat + _easycom_common_title + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const homeBannerList = common_vendor.ref([]);
    const eachDayRecommendList = common_vendor.ref([]);
    const noticeList = common_vendor.ref([]);
    const specialSubjectList = common_vendor.ref([]);
    common_vendor.onMounted(async () => {
      const res = await service_modules_home.getBannerList();
      homeBannerList.value = res.data;
      const res2 = await service_modules_home.getEachDayRecommendList();
      eachDayRecommendList.value = res2.data;
      const res3 = await service_modules_home.getNoticeList();
      noticeList.value = res3.data;
      const res4 = await service_modules_home.getSpecialSubjectList();
      specialSubjectList.value = res4.data;
      console.log(specialSubjectList.value);
    });
    const goPreview = () => {
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview"
      });
    };
    const goNotice = () => {
      common_vendor.index.navigateTo({
        url: "/pages/notice/detail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(homeBannerList.value, (item, k0, i0) => {
          return {
            a: item.picurl,
            b: item._id
          };
        }),
        b: common_vendor.p({
          name: "volume-fill",
          color: "#28b389",
          size: "20"
        }),
        c: common_vendor.f(noticeList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item._id
          };
        }),
        d: common_vendor.p({
          name: "arrow-right",
          color: "#666",
          size: "16"
        }),
        e: common_vendor.o(goNotice),
        f: common_vendor.p({
          type: "calendar",
          size: "18",
          color: "#28b389"
        }),
        g: common_vendor.p({
          date: Date.now(),
          format: "dd"
        }),
        h: common_vendor.f(eachDayRecommendList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id,
            c: common_vendor.o(goPreview, item._id)
          };
        }),
        i: common_vendor.f(specialSubjectList.value, (item, index, i0) => {
          return {
            a: item._id,
            b: "1cf27b2a-7-" + i0,
            c: common_vendor.p({
              currentIndex: index,
              itemData: item
            })
          };
        }),
        j: common_vendor.p({
          isshowLast: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
