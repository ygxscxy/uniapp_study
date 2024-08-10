"use strict";
const service_request_index = require("../request/index.js");
async function getUserInfo() {
  const res = await service_request_index.dbRequest({ url: "/userInfo" });
  return res.data;
}
async function getUserDownloadORScore({ type, pageNum = 1, pageSize = 9 }) {
  const res = await service_request_index.dbRequest({ url: "/userWallList", data: {
    type,
    pageNum,
    pageSize
  } });
  return res.data;
}
exports.getUserDownloadORScore = getUserDownloadORScore;
exports.getUserInfo = getUserInfo;
