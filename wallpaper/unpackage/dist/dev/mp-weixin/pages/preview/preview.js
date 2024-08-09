"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const service_modules_preview = require("../../service/modules/preview.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const infoPopup = common_vendor.ref(null);
    const scorePopup = common_vendor.ref(null);
    const userScore = common_vendor.ref(0);
    const storageClassifyList = common_vendor.ref([]);
    const currentId = common_vendor.ref(null);
    const currentPicIndex = common_vendor.ref(0);
    const readImgsIndex = common_vendor.ref([]);
    const curentImgInfo = common_vendor.ref({});
    const title = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      currentId.value = option.id;
      title.value = option.title;
    });
    common_vendor.onMounted(() => {
      storageClassifyList.value = common_vendor.index.getStorageSync("storageClassifyList") || [];
      storageClassifyList.value = storageClassifyList.value.map((item) => {
        return {
          ...item,
          picurl: item.smallPicurl.replace("_small.webp", ".jpg")
        };
      });
      currentPicIndex.value = storageClassifyList.value.findIndex((item) => item._id === currentId.value);
      readImgsIndex.value.push(
        currentPicIndex.value === 0 ? storageClassifyList.value.length : currentPicIndex.value - 1,
        currentPicIndex.value,
        currentPicIndex.value === storageClassifyList.value.length ? 0 : currentPicIndex.value + 1
      );
      curentImgInfo.value = storageClassifyList.value[currentPicIndex.value];
    });
    const clickInfo = () => {
      infoPopup.value.open();
    };
    const clickInfoClose = () => {
      infoPopup.value.close();
    };
    const clickScore = () => {
      scorePopup.value.open();
      userScore.value = Number(curentImgInfo.value.score);
    };
    const clickScoreClose = () => {
      scorePopup.value.close();
    };
    const submitScore = async () => {
      let { _id: wallId, classid, score } = curentImgInfo.value;
      const res = await service_modules_preview.setPreviewScore(classid, wallId, score);
      if (res.errCode == 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "none"
        });
        storageClassifyList.value[currentPicIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storageClassifyList", storageClassifyList.value);
      } else if (res.errCode == 400) {
        common_vendor.index.showToast({
          title: res.errMsg,
          icon: "none"
        });
      }
      scorePopup.value.close();
    };
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const swiperHandler = (e) => {
      currentPicIndex.value = e.detail.current;
      readImgsIndex.value.push(
        currentPicIndex.value === 0 ? storageClassifyList.value.length : currentPicIndex.value - 1,
        currentPicIndex.value,
        currentPicIndex.value === storageClassifyList.value.length ? 0 : currentPicIndex.value + 1
      );
      readImgsIndex.value = Array.from(new Set(readImgsIndex.value));
      curentImgInfo.value = storageClassifyList.value[currentPicIndex.value];
    };
    const downloadHandler = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "下载中..."
      });
      common_vendor.index.getImageInfo({
        src: curentImgInfo.value.picurl,
        success: (res) => {
          common_vendor.index.saveImageToPhotosAlbum({
            // filePath 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
            filePath: res.path,
            fail: (err) => {
              console.log(err);
              if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
                common_vendor.index.showModal({
                  title: "提示",
                  content: "需要开启授权保存图片",
                  success: (res2) => {
                    if (res2.confirm) {
                      common_vendor.index.openSetting({
                        success: (setting) => {
                          console.log(setting);
                          if (setting.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "获取授权成功",
                              icon: "none"
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "获取授权失败",
                              icon: "none"
                            });
                          }
                        }
                      });
                    }
                  }
                });
              } else if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                common_vendor.index.showToast({
                  title: "保存失败，请重新点击下载",
                  icon: "none"
                });
              }
            }
          });
        },
        complete: () => {
          common_vendor.index.hideLoading();
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: "图片保存失败",
            icon: "error"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return common_vendor.e({
        a: common_vendor.f(storageClassifyList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImgsIndex.value.includes(index)
          }, readImgsIndex.value.includes(index) ? {
            b: common_vendor.o(maskChange, item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        b: currentPicIndex.value,
        c: common_vendor.o(swiperHandler),
        d: maskState.value
      }, maskState.value ? {
        e: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        f: common_vendor.o(goBack),
        g: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        h: common_vendor.t(currentPicIndex.value + 1),
        i: common_vendor.t(storageClassifyList.value.length),
        j: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        l: common_vendor.p({
          type: "info",
          size: "28"
        }),
        m: common_vendor.o(clickInfo),
        n: common_vendor.p({
          type: "star",
          color: Boolean((_a = curentImgInfo.value) == null ? void 0 : _a.userScore) ? "red" : "",
          size: "28"
        }),
        o: common_vendor.t(curentImgInfo.value.score),
        p: common_vendor.o(clickScore),
        q: common_vendor.p({
          type: "download",
          size: "23"
        }),
        r: common_vendor.o(downloadHandler)
      } : {}, {
        s: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        t: common_vendor.o(clickInfoClose),
        v: common_vendor.t(curentImgInfo.value._id),
        w: common_vendor.t(title.value),
        x: common_vendor.t(curentImgInfo.value.nickname),
        y: common_vendor.p({
          readonly: true,
          touchable: true,
          value: curentImgInfo.value.score,
          size: "16"
        }),
        z: common_vendor.t(curentImgInfo.value.score),
        A: common_vendor.t(curentImgInfo.value.description),
        B: common_vendor.f(curentImgInfo.value.tabs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        C: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        D: common_vendor.p({
          type: "bottom"
        }),
        E: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        F: common_vendor.o(clickScoreClose),
        G: common_vendor.o(($event) => userScore.value = $event),
        H: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        I: common_vendor.t(userScore.value),
        J: common_vendor.t(Boolean((_b = curentImgInfo.value) == null ? void 0 : _b.userScore) ? "已评分" : "确认评分"),
        K: common_vendor.o(submitScore),
        L: Boolean((_c = curentImgInfo.value) == null ? void 0 : _c.userScore),
        M: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        }),
        N: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
wx.createPage(MiniProgramPage);
