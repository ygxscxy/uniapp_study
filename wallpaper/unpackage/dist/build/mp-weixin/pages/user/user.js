"use strict";const e=require("../../common/vendor.js"),a=require("../../common/assets.js"),s=require("../../service/modules/userinfo.js");if(!Array){e.resolveComponent("uni-icons")()}Math;const t={__name:"user",setup(t){const i=e.ref(null);e.onLoad((()=>{s.getUserInfo().then((e=>{i.value=e.data}))}));const o=async()=>{e.index.navigateTo({url:"/pages/notice/detail?id=6536358ce0ec19c8d67fbe82"})},l=async()=>{e.index.navigateTo({url:"/pages/notice/detail?id=65360ea7bd0220d7635bd34b"})};return(s,t)=>e.e({a:i.value},i.value?{b:a._imports_0,c:e.t(i.value.IP),d:e.t(i.value.address.city||i.value.address.province||i.value.address.country),e:e.p({type:"download-filled",size:"20"}),f:e.t(i.value.downloadSize),g:e.p({type:"right",size:"15",color:"#aaa"}),h:"/pages/classiylist/classiylist?title=我的下载&type=download",i:e.p({type:"star-filled",size:"20"}),j:e.t(i.value.scoreSize),k:e.p({type:"right",size:"15",color:"#aaa"}),l:"/pages/classiylist/classiylist?title=我的评分&type=score",m:e.p({type:"chatboxes-filled",size:"20"}),n:e.p({type:"right",size:"15",color:"#aaa"}),o:e.p({type:"notification-filled",size:"20"}),p:e.p({type:"right",size:"15",color:"#aaa"}),q:e.o(l),r:e.p({type:"flag-filled",size:"20"}),s:e.p({type:"right",size:"15",color:"#aaa"}),t:e.o(o)}:{})}},i=e._export_sfc(t,[["__scopeId","data-v-993026d5"]]);wx.createPage(i);
