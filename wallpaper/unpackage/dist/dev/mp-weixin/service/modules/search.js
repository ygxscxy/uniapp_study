"use strict";
const service_request_index = require("../request/index.js");
async function getSearchData({ keyword, pageNum = 1, pageSize = 12 }) {
  const res = await service_request_index.dbRequest({ url: "/searchWall", data: {
    keyword,
    pageNum,
    pageSize
  } });
  return res.data;
}
exports.getSearchData = getSearchData;
