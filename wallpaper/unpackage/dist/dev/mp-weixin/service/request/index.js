"use strict";
const common_vendor = require("../../common/vendor.js");
const service_config_index = require("../config/index.js");
function dbRequest(config) {
  return new Promise((resolve, reject) => {
    const { url } = config;
    common_vendor.index.showLoading({
      title: "loading..."
    });
    common_vendor.index.request({
      ...config,
      url: service_config_index.BASE_URL + url
    }).then((res) => {
      if (res.data.errCode == 400) {
        common_vendor.index.showModal({
          title: "数据加载失败...",
          content: res.data.errMsg,
          showCancel: false
        });
        common_vendor.index.hideLoading();
        return;
      }
      common_vendor.index.hideLoading();
      resolve(res);
    }).catch((err) => {
      common_vendor.index.showModal({
        title: "数据加载失败..."
      });
      common_vendor.index.hideLoading();
      reject(err);
    });
  });
}
exports.dbRequest = dbRequest;
