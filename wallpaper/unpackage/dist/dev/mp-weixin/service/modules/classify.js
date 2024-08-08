"use strict";
const service_request_index = require("../request/index.js");
async function getClassifyDetailList({ classid, pageNum = 1, pageSize = 12 }) {
  const res = await service_request_index.dbRequest({ url: "/wallList", data: {
    classid,
    pageNum,
    pageSize
  } });
  return res.data;
}
exports.getClassifyDetailList = getClassifyDetailList;
