(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-thread-reply"],{"0631":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'.nui-loadmore-none[data-v-a053c016]{width:50%;margin:1.5em auto;line-height:1.5em;font-size:%?24?%;display:flex;justify-content:center}.nui-nomore[data-v-a053c016]{width:100%;height:100%;position:relative;display:flex;justify-content:center;margin-top:%?10?%;padding-bottom:%?6?%}.nui-nomore[data-v-a053c016]::before{content:" ";position:absolute;border-bottom:%?1?% solid #e5e5e5;-webkit-transform:scaleY(.5);transform:scaleY(.5);width:100%;top:%?18?%;left:0}.nui-nomore-text[data-v-a053c016]{color:#999;font-size:%?24?%;text-align:center;padding:0 %?18?%;height:%?36?%;line-height:%?36?%;position:relative;z-index:1}.nui-nomore-dot[data-v-a053c016]{position:relative;text-align:center;-webkit-display:flex;display:flex;-webkit-justify-content:center;justify-content:center;margin-top:%?10?%;padding-bottom:%?6?%}.nui-nomore-dot[data-v-a053c016]::before{content:"";position:absolute;border-bottom:%?1?% solid #e5e5e5;-webkit-transform:scaleY(.5) translateX(-50%);transform:scaleY(.5) translateX(-50%);width:%?360?%;top:%?18?%;left:50%}.nui-dot-text[data-v-a053c016]{position:relative;color:#e5e5e5;font-size:10px;text-align:center;width:%?50?%;height:%?36?%;line-height:%?36?%;-webkit-transform:scale(.8);transform:scale(.8);-webkit-transform-origin:center center;transform-origin:center center;z-index:1}',""]),t.exports=e},"099a":function(t,e,n){function a(t){return t=t.toString(),t[1]?t:"0"+t}function i(t){return t.replace(/[\u0391-\uFFE5]/g,"aa").length}n("d81d"),n("d401"),n("d3b7"),n("25f0"),n("b64b"),n("ac1f"),n("5319"),n("e25e"),n("99af"),n("00b4"),n("baa5"),n("14d9");t.exports={formatTime:function(t){var e=t.getFullYear(),n=t.getMonth()+1,i=t.getDate(),o=t.getHours(),r=t.getMinutes(),c=t.getSeconds();return[e,n,i].map(a).join("/")+" "+[o,r,c].map(a).join(":")},getDateDiff:function(t){var e,n,a,i,o,r=Date.parse(t.replace(/-/gi,"/"))/1e3,c=parseInt((new Date).getTime()/1e3),s=new Date(1e3*r),u=s.getFullYear(),l=s.getMonth()+1,d=s.getDate(),f=s.getHours(),m=s.getMinutes(),b=s.getSeconds();return l<10&&(l="0"+l),d<10&&(d="0"+d),f<10&&(f="0"+f),m<10&&(m="0"+m),b<10&&(b="0"+b),o=c-r,i=parseInt(o/86400),a=parseInt(o/3600),n=parseInt(o/60),e=parseInt(o),i>0&&i<3?i+"天前":i<=0&&a>0?a+"小时前":a<=0&&n>0?n+"分钟前":e<60?e<=0?"刚刚发表":e+"秒前":i>=3&&i<30?l+"月"+d+"日":i>=30?u+"年"+l+"月"+d+"日":void 0},cutstr:function(t,e,n){for(var a=0,i=new String,o=t.length,r=0;r<o;r++){var c=t.charAt(r);if(a++,escape(c).length>4&&a++,i=i.concat(c),a>=e)return 0==n&&(i=i.concat("...")),i}if(a<e)return t},removeHTML:function(t){var e=t.replace(/<\/?.+?>/g,"");return e=e.replace(/[\r\n]/g,""),e.replace(/ /g,"")},formatDateTime:function(t){return t.replace("T"," ")},compare:function(t){return function(e,n){var a=e[t],i=n[t];return a>i?-1:a<i?1:0}},checkImgType:function(t){return!!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(t)},isEmptyObject:function(t){var e;for(e in t)return!1;return!0},CheckImgExists:function(t){var e=new Image;return e.src=t,e.fileSize>0||e.width>0&&e.height>0},GetUrlFileName:function(t,e){var n=t.substring(t.lastIndexOf("/")+1);return n=n==e||""==n?"index":n.substring(0,n.lastIndexOf(".")),n},json2Form:function(t){var e=[];for(var n in t)e.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e.join("&")},getymd:function(t,e){t=t.replace("T"," ");var n=new Date(Date.parse(t.replace(/-/g,"/"))),a=n.getMonth()+1,i=n.getDate(),o=n.getFullYear();return"d"==e?i:"md"==e?a+"-"+i:"ymd"==e?o+"-"+a+"-"+i:void 0},getDateOut:function(t){var e=Date.parse(t.replace(/-/gi,"/"))/1e3,n=parseInt((new Date).getTime()/1e3),a=!1,i=n-e,o=parseInt(i/86400);return o>7&&(a=!0),a},drawTitleExcerpt:function(t,e,n){t.setFillStyle("#000000"),t.setTextAlign("left"),i(e)<=14?(t.setFontSize(40),t.fillText(e,40,460)):(t.setFontSize(30),t.fillText(e.substring(0,19),40,460),t.fillText(e.substring(19,36),40,510)),t.setFontSize(24),t.setTextAlign("left"),t.setGlobalAlpha(.7);for(var a=0;a<=50;a+=20)i(n)>50&&40==a?t.fillText(n.substring(a,a+20)+"...",40,570+2*a):t.fillText(n.substring(a,a+20),40,570+2*a);t.stroke(),t.save()},getStrLength:i,datefomate:function(t,e){var n=new Date(1e3*t),a=function(t){return(t<10?"0":"")+t};return e.replace(/yyyy|MM|dd|HH|mm|ss/g,(function(t){switch(t){case"yyyy":return a(n.getFullYear());case"MM":return a(n.getMonth()+1);case"mm":return a(n.getMinutes());case"dd":return a(n.getDate());case"HH":return a(n.getHours());case"ss":return a(n.getSeconds())}}))}}},"35ce":function(t,e,n){"use strict";n.r(e);var a=n("7636"),i=n("e064");for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("9f94");var r=n("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"eb8ecbaa",null,!1,a["a"],void 0);e["default"]=c.exports},"36a4":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */uni-page-body[data-v-eb8ecbaa]{background:#f7f7f7}body.?%PAGE?%[data-v-eb8ecbaa]{background:#f7f7f7}.safearea-bottom[data-v-eb8ecbaa]{width:100%;height:constant(safe-area-inset-bottom);height:env(safe-area-inset-bottom)}.emoji[data-v-eb8ecbaa]{width:22px!important;height:22px!important;vertical-align:middle}.tui-header-icon[data-v-eb8ecbaa]{width:100%;position:fixed;top:0;padding:0 %?12?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:32px;-webkit-transform:translateZ(0);transform:translateZ(0);z-index:99999;-webkit-box-sizing:border-box;box-sizing:border-box}.container[data-v-eb8ecbaa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}uni-page-body[data-v-eb8ecbaa]{color:#333}.footer[data-v-eb8ecbaa]{display:flex;align-items:center;font-size:%?24?%;margin-bottom:%?16?%;color:#9a9a9a}.ml[data-v-eb8ecbaa]{margin-left:%?16?%}.primary[data-v-eb8ecbaa]{color:var(--base)}.container[data-v-eb8ecbaa]{padding-bottom:%?110?%;box-sizing:border-box}.nui-card[data-v-eb8ecbaa]{background-color:#fff;padding:13px;margin:0 13px 20px 13px;border-radius:12px}.nui-empty[data-v-eb8ecbaa]{width:100%;height:%?10?%;background-color:#eaeef1}.nui-cmt-title[data-v-eb8ecbaa]{font-size:%?30?%;font-weight:700;position:relative;padding:%?20?% %?30?%;box-sizing:border-box;margin-bottom:%?20?%}.nui-cmt-title[data-v-eb8ecbaa]::after{content:"";position:absolute;left:%?12?%;top:30%;width:%?6?%;height:40%;background:var(--base)}.nui-cmt-cell[data-v-eb8ecbaa]{width:100%;padding:13px 0;box-sizing:border-box;position:relative}.nui-cell-last[data-v-eb8ecbaa]::after{border-bottom:0!important}.nui-header-box[data-v-eb8ecbaa]{display:flex;align-items:center;justify-content:space-between;font-size:%?28?%}.nui-userinfo-box[data-v-eb8ecbaa]{display:flex;align-items:center}.nui-avatar[data-v-eb8ecbaa]{width:%?64?%;height:%?64?%;border-radius:%?32?%;display:block;flex-shrink:0}.nui-nickname-box[data-v-eb8ecbaa]{display:flex;flex-direction:column;justify-content:space-between;padding-left:%?12?%;padding-top:%?4?%;height:%?60?%}.nui-cmt-nickname[data-v-eb8ecbaa]{color:var(--base);line-height:%?28?%}.nui-cmt-time[data-v-eb8ecbaa]{font-size:%?24?%;line-height:%?24?%;color:#9a9a9a;-webkit-transform:scale(.8);transform:scale(.8);-webkit-transform-origin:0 100%;transform-origin:0 100%}.nui-fabulous[data-v-eb8ecbaa]{color:#9a9a9a}.nui-fabulous uni-text[data-v-eb8ecbaa]{padding-right:%?4?%;font-size:%?24?%}.nui-cmt-content[data-v-eb8ecbaa]{font-size:%?32?%;color:#333;text-align:justify;padding:13px 0;word-break:break-all;word-wrap:break-word}.nui-reply-box[data-v-eb8ecbaa]{border-radius:%?8?%;overflow:hidden;margin-top:%?16?%}.nui-cell-class[data-v-eb8ecbaa]{flex-direction:column;justify-content:flex-start!important;padding:%?20?%!important;text-align:justify;word-break:break-all;word-wrap:break-word}.nui-flex-1[data-v-eb8ecbaa]{flex:1;width:100%}.nui-reply-nickname[data-v-eb8ecbaa]{font-size:%?24?%;color:#7a7a7a;padding-bottom:%?8?%}.nui-operation[data-v-eb8ecbaa]{width:100%;padding:0 %?30?%;box-sizing:border-box;overflow:hidden;background:hsla(0,0%,100%,.95);position:fixed;left:0;bottom:0;z-index:99999}.nui-operation-inner[data-v-eb8ecbaa]{height:%?100?%;display:flex;align-items:center;justify-content:space-between;padding-bottom:env(safe-area-inset-bottom)}.nui-safearea-bottom[data-v-eb8ecbaa]{width:100%;height:env(safe-area-inset-bottom)}.nui-operation[data-v-eb8ecbaa]::before{content:"";position:absolute;top:0;right:0;left:0;border-top:%?1?% solid #eaeef1;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.nui-btn-comment[data-v-eb8ecbaa]{height:%?64?%;width:100%;background:#ededed;color:#999;border-radius:%?8?%;font-size:%?28?%;display:flex;align-items:center;padding-left:%?20?%;box-sizing:border-box;padding-top:0}.nui-primary[data-v-eb8ecbaa]{color:var(--base)}',""]),t.exports=e},"43c8":function(t,e,n){"use strict";n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"nui-nomore",props:{backgroundColor:{type:String,default:"#fafafa"},isDot:{type:Boolean,default:!1},text:{type:String,default:"没有更多了"}},data:function(){return{dotText:"●"}}};e.default=a},"4fc8":function(t,e,n){function a(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(n,a){e.success=function(t){n(t)},e.fail=function(t){a(t)},t(e)}))}}n("d3b7"),n("c975"),Promise.prototype.finally||(Promise.prototype.finally=function(t){var e=this.constructor;return this.then((function(n){return e.resolve(t()).then((function(){return n}))}),(function(n){return e.resolve(t()).then((function(){throw n}))}))}),t.exports={wxPromisify:a,wxLogin:function(){return a(uni.login)},wxGetUserInfo:function(){return a(uni.getUserInfo)},wxGetSystemInfo:function(){return a(uni.getSystemInfo)}}},"61f8":function(t,e,n){var a=n("36a4");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("e1673362",a,!0,{sourceMap:!1,shadowMode:!1})},"711d":function(t,e,n){"use strict";n.r(e);var a=n("43c8"),i=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},7636:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var a={mescrollBody:n("274b").default,mpHtml:n("2998").default,nuiNomore:n("9b2e").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("mescroll-body",{ref:"mescrollRef",on:{init:function(e){arguments[0]=e=t.$handleEvent(e),t.mescrollInit.apply(void 0,arguments)},down:function(e){arguments[0]=e=t.$handleEvent(e),t.downCallback.apply(void 0,arguments)},up:function(e){arguments[0]=e=t.$handleEvent(e),t.getcomments.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"nui-cmt-primary nui-card"},[n("v-uni-view",{staticClass:"nui-cmt-cell nui-cell-last"},[n("v-uni-view",{staticClass:"nui-header-box"},[n("v-uni-view",{staticClass:"nui-userinfo-box",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.userClick(t.comment)}}},[n("v-uni-image",{staticClass:"nui-avatar",attrs:{src:t.comment.user.avatar}}),n("v-uni-view",{staticClass:"nui-nickname-box"},[n("v-uni-view",{staticClass:"nui-cmt-nickname"},[t._v(t._s(t.comment.user.nickname))]),n("v-uni-view",{staticClass:"nui-cmt-time"},[t._v(t._s(t.comment.createdAt))])],1)],1)],1),n("v-uni-view",{staticClass:"nui-cmt-content"},[t._v(t._s(t.comment.content))])],1),n("v-uni-view",{staticClass:"nui-operation"},[n("v-uni-view",{staticClass:"nui-operation-inner"},[n("v-uni-view",{staticClass:"nui-btn-comment",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.btnCmt(t.comment)}}},[t._v("回复楼主...")])],1)],1)],1),n("v-uni-view",{staticClass:"nui-card"},[t.comment.replyCount?n("v-uni-view",{staticClass:"nui-cmt-title"},[t._v("全部回复（"+t._s(t.comment.replyCount)+"）")]):t._e(),n("v-uni-view",{staticClass:"nui-cmtbox"},t._l(t.comments,(function(e,a){return n("v-uni-view",{key:a,staticClass:"nui-cmt-cell"},[n("v-uni-view",{staticClass:"nui-header-box"},[n("v-uni-view",{staticClass:"nui-userinfo-box",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.userClick(e)}}},[n("v-uni-image",{staticClass:"nui-avatar",attrs:{src:e.user.avatar}}),n("v-uni-view",{staticClass:"nui-nickname-box"},[n("v-uni-view",{staticClass:"nui-cmt-nickname"},[t._v(t._s(e.user.nickname)),e.commentUser?n("v-uni-text",{staticStyle:{margin:"0 5px",opacity:"0.6"}},[t._v("回复")]):t._e(),e.commentUser?n("v-uni-text",[t._v(t._s(e.commentUser.nickname))]):t._e()],1)],1)],1)],1),n("v-uni-view",{staticClass:"nui-cmt-content"},[n("mp-html",{attrs:{content:e.content}})],1),n("v-uni-view",{staticClass:"footer"},[t._v(t._s(e.createdAt)),n("v-uni-view",{staticClass:"primary ml",attrs:{"hover-class":"opcity","hover-start-time":150},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.btnCmt1(e)}}},[t._v("回复")])],1)],1)})),1),n("nui-nomore",{attrs:{backgroundColor:"#fff",text:"没有更多回复"}})],1),n("v-uni-view",{staticClass:"nui-safearea-bottom"})],1)],1)},o=[]},"9b2e":function(t,e,n){"use strict";n.r(e);var a=n("fae3"),i=n("711d");for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("c4c6");var r=n("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"a053c016",null,!1,a["a"],void 0);e["default"]=c.exports},"9f94":function(t,e,n){"use strict";var a=n("61f8"),i=n.n(a);i.a},b59d:function(t,e,n){var a=n("0631");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("33507632",a,!0,{sourceMap:!1,shadowMode:!1})},c4c6:function(t,e,n){"use strict";var a=n("b59d"),i=n.n(a);i.a},e064:function(t,e,n){"use strict";n.r(e);var a=n("f40f"),i=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},f40f:function(t,e,n){"use strict";(function(t){n("7a82");var a=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("d81d");var i=a(n("c33c")),o=a(n("88fd")),r=n("5f2e"),c=(n("099a"),n("4fc8"),n("fccb"),n("255a")),s={mixins:[o.default],data:function(){return{comments:{},comment:{user:{}},tid:"",commentsnum:0,top:0,opacity:0,scrollTop:0,commentid:""}},onShareAppMessage:function(){return this.webSiteName=i.default.WebsiteName,{title:this.title+"——来自"+this.webSiteName+"的"+this.categoryName+"分类"}},onShareTimeline:function(t){return this.webSiteName=i.default.WebsiteName,{title:this.title+"——"+this.categoryName+"分类",query:"id="+this.commentid}},onLoad:function(e){this.commentid=e.id,this.tid=e.tid,t("log",this.pid," at pages/thread/reply.vue:137")},onShow:function(){},methods:{getchaAd:function(){},refresh:function(){this.getcomments({size:10,num:1})},btnCmt:function(t){var e="/pages/comment/comment?isComment=true&id="+this.tid+"&replyId="+t.id;uni.navigateTo({url:e})},btnCmt1:function(t){var e="/pages/comment/comment?isComment=true&id="+this.tid+"&replyId="+t.id+"&commentPostId="+t.id;uni.navigateTo({url:e})},userClick:function(t){var e="/pages/user/user?id="+t.userId;uni.navigateTo({url:e})},previewImage:function(t){var e=this.threadimgs.map((function(t){return t.thumbUrl}));uni.previewImage({current:t,urls:e,loop:!0})},initNavigation:function(t){this.opacity=t.opacity,this.top=t.top},opacityChange:function(t){this.opacity=t.opacity},back:function(){uni.navigateBack()},getcomments:function(t){var e=this,n=t.num,a=t.size,i=c.getRequest(r.getpostsdetail(this.commentid,n,a));i.then((function(t){e.comments=t.data.Data.commentPosts,e.comment=t.data.Data,e.commentsnum=t.data.Data.totalCount,e.mescroll.endSuccess(t.data.Data.commentPosts.length)})).catch((function(){e.mescroll.endErr()}))}},onPageScroll:function(t){this.scrollTop=t.scrollTop}};e.default=s}).call(this,n("0de9")["log"])},fae3:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"nui-nomore-class nui-loadmore-none"},[n("v-uni-view",{class:[t.isDot?"nui-nomore-dot":"nui-nomore"]},[n("v-uni-view",{class:[t.isDot?"nui-dot-text":"nui-nomore-text"],style:{backgroundColor:t.backgroundColor}},[t._v(t._s(t.isDot?t.dotText:t.text))])],1)],1)},i=[]},fccb:function(t,e,n){n("255a"),n("5f2e");t.exports={}}}]);