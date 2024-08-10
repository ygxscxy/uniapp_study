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
const getDownloadWall = async (classid, wallId, userScore) => {
  const res = await service_request_index.dbRequest({
    url: "/downloadWall",
    data: {
      classid,
      wallId,
      userScore
    }
  });
  return res.data;
};
const getSimpleWallDetail = async (wallId) => {
  const res = await service_request_index.dbRequest({
    url: "/detailWall",
    data: {
      id: wallId
    }
  });
  return res.data;
};
exports.getDownloadWall = getDownloadWall;
exports.getSimpleWallDetail = getSimpleWallDetail;
exports.setPreviewScore = setPreviewScore;
