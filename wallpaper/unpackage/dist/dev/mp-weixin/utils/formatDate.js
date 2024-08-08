"use strict";
function timeAgo(timestamp) {
  const now = Date.now();
  const past = new Date(timestamp).getTime();
  const diff = now - past;
  const oneMinute = 60 * 1e3;
  const oneHour = 60 * oneMinute;
  const oneDay = 24 * oneHour;
  const oneMonth = 30 * oneDay;
  const oneYear = 12 * oneMonth;
  if (diff < oneMinute) {
    return "1分钟";
  } else if (diff < oneHour) {
    return Math.floor(diff / oneMinute) + "分钟";
  } else if (diff < oneDay) {
    return Math.floor(diff / oneHour) + "小时";
  } else if (diff < oneMonth) {
    return Math.floor(diff / oneDay) + "天";
  } else if (diff < oneYear) {
    return Math.floor(diff / oneMonth) + "个月";
  } else {
    return null;
  }
}
exports.timeAgo = timeAgo;
