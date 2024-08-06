"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "UserInfo",
  emits: ["get-data"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const info = common_vendor.ref({ name: "zs", age: 12 });
    const emit = __emit;
    const sendData = () => {
      emit("get-data", info);
    };
    __expose({
      sendData,
      info
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(sendData)
      };
    };
  }
});
wx.createComponent(_sfc_main);
