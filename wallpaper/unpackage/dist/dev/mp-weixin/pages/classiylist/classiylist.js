"use strict";
const common_vendor = require("../../common/vendor.js");
const service_modules_classify = require("../../service/modules/classify.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classiylist",
  setup(__props) {
    const classifyId = common_vendor.ref("");
    const classifyDetailList = common_vendor.ref([]);
    const currentPageNum = common_vendor.ref(1);
    const isMoreData = common_vendor.ref(true);
    const title = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      classifyId.value = option.classid, common_vendor.index.setNavigationBarTitle({
        title: option.title
      });
      title.value = option.title;
    });
    common_vendor.onMounted(async () => {
      const res = await service_modules_classify.getClassifyDetailList({ classid: classifyId.value, pageNum: currentPageNum.value, pageSize: 12 });
      classifyDetailList.value = res.data;
      common_vendor.index.setStorageSync("storageClassifyList", classifyDetailList.value);
      if (res.data.length < 12) {
        isMoreData.value = false;
      }
    });
    common_vendor.onReachBottom(async () => {
      currentPageNum.value++;
      const res = await service_modules_classify.getClassifyDetailList({ classid: classifyId.value, pageNum: currentPageNum.value, pageSize: 12 });
      if (res.data.length < 12) {
        isMoreData.value = false;
        return;
      } else {
        classifyDetailList.value.push(...res.data);
        common_vendor.index.setStorageSync("storageClassifyList", classifyDetailList.value);
      }
    });
    common_vendor.onBeforeUnmount(() => {
      common_vendor.index.removeStorageSync("storageClassifyList");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classifyDetailList.value.length && isMoreData.value
      }, !classifyDetailList.value.length && isMoreData.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(classifyDetailList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id + "&title=" + title.value,
            c: item._id
          };
        }),
        d: !isMoreData.value
      }, !isMoreData.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d4bdad1a"]]);
wx.createPage(MiniProgramPage);
