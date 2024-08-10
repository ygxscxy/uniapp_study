"use strict";
const service_request_index = require("../request/index.js");
async function getNoticeDetail(id) {
  const res = await service_request_index.dbRequest({ url: "/wallNewsDetail", data: {
    id
  } });
  return res.data;
}
exports.getNoticeDetail = getNoticeDetail;
