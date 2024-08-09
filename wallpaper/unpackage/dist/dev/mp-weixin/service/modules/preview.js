"use strict";
const service_request_index = require("../request/index.js");
const setPreviewScore = async (classid, wallId, userScore) => {
  const res = await service_request_index.dbRequest({
    url: "/setupScore",
    data: {
      classid,
      wallId,
      userScore
    }
  });
  return res.data;
};
exports.setPreviewScore = setPreviewScore;
