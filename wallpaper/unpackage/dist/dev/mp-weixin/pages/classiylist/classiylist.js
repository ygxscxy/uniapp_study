"use strict";
const common_vendor = require("../../common/vendor.js");
const service_modules_classify = require("../../service/modules/classify.js");
const service_modules_userinfo = require("../../service/modules/userinfo.js");
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
    const type = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      classifyId.value = option.classid, common_vendor.index.setNavigationBarTitle({
        title: option.title
      });
      type.value = option == null ? void 0 : option.type;
      title.value = option.title;
    });
    common_vendor.onMounted(async () => {
      let res;
      if (type.value) {
        res = await service_modules_userinfo.getUserDownloadORScore({ type: type.value });
      } else {
        res = await service_modules_classify.getClassifyDetailList({ classid: classifyId.value, pageNum: currentPageNum.value, pageSize: 12 });
      }
      classifyDetailList.value = res.data;
      common_vendor.index.setStorageSync("storageClassifyList", classifyDetailList.value);
      if (res.data.length < 12) {
        isMoreData.value = false;
      }
    });
    common_vendor.onReachBottom(async () => {
      currentPageNum.value++;
      let res;
      if (type.value) {
        res = await service_modules_userinfo.getUserDownloadORScore({ type: type.value, pageNum: currentPageNum.value, pageSize: 12 });
      } else {
        res = await service_modules_classify.getClassifyDetailList({ classid: classifyId.value, pageNum: currentPageNum.value, pageSize: 12 });
      }
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
    common_vendor.onShareAppMessage((e) => {
      return {
        path: "/pages/classiylist/classiylist?classid=" + classifyId.value + "&title=" + title.value,
        title: "dbb壁纸分类列表"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "dbb壁纸分类列表",
        imageUrl: "/static/images/xxmLogo.png",
        // 不用设置path
        query: "classid=" + classifyId.value + "&title=" + title.value
      };
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
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
