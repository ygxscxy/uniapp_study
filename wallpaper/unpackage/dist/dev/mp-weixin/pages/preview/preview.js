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
    const type = common_vendor.ref("");
    common_vendor.onLoad(async (option) => {
      currentId.value = option.id;
      title.value = option.title;
      type.value = option.type || "";
      if (type.value === "share") {
        const res = await service_modules_preview.getSimpleWallDetail(option.id);
        storageClassifyList.value = res.data;
      }
    });
    common_vendor.onMounted(() => {
      if (type.value === "share") {
        storageClassifyList.value = storageClassifyList.value.map((item) => {
          return {
            ...item,
            picurl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
        curentImgInfo.value = storageClassifyList.value[0];
      } else {
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
      }
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
    const goBack = (e) => {
      console.log(e);
      if (e == "share") {
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
        return;
      }
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
    const downloadHandler = async () => {
      try {
        common_vendor.index.showLoading({
          mask: true,
          title: "下载中..."
        });
        let { _id: wallId, classid } = curentImgInfo.value;
        const res = await service_modules_preview.getDownloadWall(classid, wallId);
        common_vendor.index.getImageInfo({
          src: curentImgInfo.value.picurl,
          success: (res2) => {
            common_vendor.index.saveImageToPhotosAlbum({
              // filePath 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
              filePath: res2.path,
              fail: (err) => {
                console.log(err);
                if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
                  common_vendor.index.showModal({
                    title: "提示",
                    content: "需要开启授权保存图片",
                    success: (res3) => {
                      if (res3.confirm) {
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
      } catch (err) {
        common_vendor.index.hideLoading();
      }
    };
    common_vendor.onShareAppMessage((e) => {
      return {
        path: "/pages/preview/preview?id=" + currentId.value + "&title=" + title.value + "&type=share",
        title: "dbb壁纸分类列表"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "dbb壁纸分类列表",
        imageUrl: "/static/images/xxmLogo.png",
        // 不用设置path
        query: "id=" + currentId.value + "&title=" + title.value + "&type=share"
      };
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f;
      return common_vendor.e({
        a: common_vendor.f(storageClassifyList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImgsIndex.value.includes(index) || type.value == "share"
          }, readImgsIndex.value.includes(index) || type.value == "share" ? {
            b: common_vendor.o(maskChange, item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        b: currentPicIndex.value,
        c: common_vendor.o(swiperHandler),
        d: maskState.value
      }, maskState.value ? common_vendor.e({
        e: type.value != "share"
      }, type.value != "share" ? {
        f: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        g: common_vendor.o(goBack),
        h: common_vendor.unref(utils_system.getStatusBarHeight)() + "px"
      } : {}, {
        i: type.value == "share"
      }, type.value == "share" ? {
        j: common_vendor.p({
          type: "home",
          color: "#fff",
          size: "20"
        }),
        k: common_vendor.o(($event) => goBack("share")),
        l: common_vendor.unref(utils_system.getStatusBarHeight)() + "px"
      } : {}, {
        m: common_vendor.t(currentPicIndex.value + 1),
        n: common_vendor.t(storageClassifyList.value.length),
        o: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        p: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        q: common_vendor.p({
          type: "info",
          size: "28"
        }),
        r: common_vendor.o(clickInfo),
        s: common_vendor.p({
          type: "star",
          color: Boolean((_a = curentImgInfo.value) == null ? void 0 : _a.userScore) ? "red" : "",
          size: "28"
        }),
        t: common_vendor.t((_b = curentImgInfo.value) == null ? void 0 : _b.score),
        v: common_vendor.o(clickScore),
        w: common_vendor.p({
          type: "download",
          size: "23"
        }),
        x: common_vendor.o(downloadHandler)
      }) : {}, {
        y: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        z: common_vendor.o(clickInfoClose),
        A: common_vendor.t(curentImgInfo.value._id),
        B: common_vendor.t(title.value),
        C: common_vendor.t(curentImgInfo.value.nickname),
        D: common_vendor.p({
          readonly: true,
          touchable: true,
          value: (_c = curentImgInfo.value) == null ? void 0 : _c.score,
          size: "16"
        }),
        E: common_vendor.t((_d = curentImgInfo.value) == null ? void 0 : _d.score),
        F: common_vendor.t(curentImgInfo.value.description),
        G: common_vendor.f(curentImgInfo.value.tabs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item
          };
        }),
        H: common_vendor.sr(infoPopup, "2dad6c07-7", {
          "k": "infoPopup"
        }),
        I: common_vendor.p({
          type: "bottom"
        }),
        J: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        K: common_vendor.o(clickScoreClose),
        L: common_vendor.o(($event) => userScore.value = $event),
        M: common_vendor.p({
          allowHalf: true,
          modelValue: userScore.value
        }),
        N: common_vendor.t(userScore.value),
        O: common_vendor.t(Boolean((_e = curentImgInfo.value) == null ? void 0 : _e.userScore) ? "已评分" : "确认评分"),
        P: common_vendor.o(submitScore),
        Q: Boolean((_f = curentImgInfo.value) == null ? void 0 : _f.userScore),
        R: common_vendor.sr(scorePopup, "2dad6c07-10", {
          "k": "scorePopup"
        }),
        S: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
