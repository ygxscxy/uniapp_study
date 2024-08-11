"use strict";const e=require("../request/index.js");exports.getNoticeDetail=async function(t){return(await e.dbRequest({url:"/wallNewsDetail",data:{id:t}})).data};
