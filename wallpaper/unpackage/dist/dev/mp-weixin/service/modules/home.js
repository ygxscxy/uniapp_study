"use strict";
const service_request_index = require("../request/index.js");
const getBannerList = async () => {
  const res = await service_request_index.dbRequest({ url: "/homeBanner" });
  return res.data;
};
const getEachDayRecommendList = async () => {
  const res = await service_request_index.dbRequest({ url: "/randomWall" });
  return res.data;
};
const getNoticeList = async () => {
  const res = await service_request_index.dbRequest({
    url: "/wallNewsList"
  });
  res.data.data = res.data.data.filter((item) => {
    return item.select === false;
  });
  return res.data;
};
const getSpecialSubjectList = async (pageSize = 8) => {
  const res = await service_request_index.dbRequest({ url: "/classify", data: {
    pageSize
  } });
  console.log(res.data);
  return res.data;
};
exports.getBannerList = getBannerList;
exports.getEachDayRecommendList = getEachDayRecommendList;
exports.getNoticeList = getNoticeList;
exports.getSpecialSubjectList = getSpecialSubjectList;
