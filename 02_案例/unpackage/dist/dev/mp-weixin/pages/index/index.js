"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const pets = common_vendor.ref([]);
    const getListDataPets = async () => {
      common_vendor.index.showLoading({
        title: "数据加载中..."
      });
      try {
        const res = await common_vendor.index.request({
          url: "https://tea.qingnian8.com/tools/petShow",
          data: {
            size: 10
          }
        });
        common_vendor.index.hideLoading();
        common_vendor.index.stopPullDownRefresh();
        return res.data;
      } catch (err) {
        common_vendor.index.hideLoading();
        common_vendor.index.stopPullDownRefresh();
        common_vendor.index.showToast({
          title: "请求失败",
          icon: "error"
        });
        return [];
      }
    };
    common_vendor.onLoad(() => {
      getListDataPets().then((res) => {
        pets.value = res.data;
      });
    });
    common_vendor.onReachBottom(() => {
      getListDataPets().then((res) => {
        pets.value.push(...res.data);
      });
    });
    common_vendor.onPullDownRefresh(() => {
      getListDataPets().then((res) => {
        pets.value = res.data;
      });
    });
    const imgs_urls = common_vendor.computed(() => {
      return pets.value.map((item, index) => {
        return item.url;
      });
    });
    const previewImage = (index) => {
      common_vendor.index.previewImage({
        current: index,
        urls: imgs_urls.value
      });
    };
    const refreshHandler = () => {
      common_vendor.index.startPullDownRefresh();
    };
    const backHandler = () => {
      common_vendor.index.pageScrollTo({
        scrollTop: 0
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(pets.value, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => previewImage(index), item._id),
            b: item.url,
            c: common_vendor.t(item.content),
            d: common_vendor.t(item.author),
            e: item._id
          };
        }),
        b: common_vendor.p({
          type: "contact",
          size: "30"
        }),
        c: common_vendor.o(refreshHandler),
        d: common_vendor.o(backHandler)
      };
    };
  }
};
wx.createPage(_sfc_main);
