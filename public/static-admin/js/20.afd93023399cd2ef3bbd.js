(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"14Xm":function(t,e,s){t.exports=s("u938")},"4d7F":function(t,e,s){t.exports={default:s("aW7e"),__esModule:!0}},"8gHz":function(t,e,s){var i=s("5K7Z"),r=s("eaoh"),a=s("UWiX")("species");t.exports=function(t,e){var s,n=i(t).constructor;return void 0===n||null==(s=i(n)[a])?e:r(s)}},D3Ub:function(t,e,s){"use strict";e.__esModule=!0;var i,r=s("4d7F"),a=(i=r)&&i.__esModule?i:{default:i};e.default=function(t){return function(){var e=t.apply(this,arguments);return new a.default((function(t,s){return function i(r,n){try{var o=e[r](n),c=o.value}catch(t){return void s(t)}if(!o.done)return a.default.resolve(c).then((function(t){i("next",t)}),(function(t){i("throw",t)}));t(c)}("next")}))}}},EXMj:function(t,e){t.exports=function(t,e,s,i){if(!(t instanceof e)||void 0!==i&&i in t)throw TypeError(s+": incorrect invocation!");return t}},"JMW+":function(t,e,s){"use strict";var i,r,a,n,o=s("uOPS"),c=s("5T2Y"),l=s("2GTP"),u=s("QMMT"),p=s("Y7ZC"),d=s("93I4"),m=s("eaoh"),h=s("EXMj"),f=s("oioR"),v=s("8gHz"),w=s("QXhf").set,y=s("q6LJ")(),x=s("ZW5q"),_=s("RDmV"),L=s("vBP9"),g=s("zXhZ"),C=c.TypeError,b=c.process,k=b&&b.versions,P=k&&k.v8||"",D=c.Promise,W="process"==u(b),T=function(){},I=r=x.f,M=!!function(){try{var t=D.resolve(1),e=(t.constructor={})[s("UWiX")("species")]=function(t){t(T,T)};return(W||"function"==typeof PromiseRejectionEvent)&&t.then(T)instanceof e&&0!==P.indexOf("6.6")&&-1===L.indexOf("Chrome/66")}catch(t){}}(),K=function(t){var e;return!(!d(t)||"function"!=typeof(e=t.then))&&e},R=function(t,e){if(!t._n){t._n=!0;var s=t._c;y((function(){for(var i=t._v,r=1==t._s,a=0,n=function(e){var s,a,n,o=r?e.ok:e.fail,c=e.resolve,l=e.reject,u=e.domain;try{o?(r||(2==t._h&&S(t),t._h=1),!0===o?s=i:(u&&u.enter(),s=o(i),u&&(u.exit(),n=!0)),s===e.promise?l(C("Promise-chain cycle")):(a=K(s))?a.call(s,c,l):c(s)):l(i)}catch(t){u&&!n&&u.exit(),l(t)}};s.length>a;)n(s[a++]);t._c=[],t._n=!1,e&&!t._h&&$(t)}))}},$=function(t){w.call(c,(function(){var e,s,i,r=t._v,a=N(t);if(a&&(e=_((function(){W?b.emit("unhandledRejection",r,t):(s=c.onunhandledrejection)?s({promise:t,reason:r}):(i=c.console)&&i.error&&i.error("Unhandled promise rejection",r)})),t._h=W||N(t)?2:1),t._a=void 0,a&&e.e)throw e.v}))},N=function(t){return 1!==t._h&&0===(t._a||t._c).length},S=function(t){w.call(c,(function(){var e;W?b.emit("rejectionHandled",t):(e=c.onrejectionhandled)&&e({promise:t,reason:t._v})}))},j=function(t){var e=this;e._d||(e._d=!0,(e=e._w||e)._v=t,e._s=2,e._a||(e._a=e._c.slice()),R(e,!0))},E=function(t){var e,s=this;if(!s._d){s._d=!0,s=s._w||s;try{if(s===t)throw C("Promise can't be resolved itself");(e=K(t))?y((function(){var i={_w:s,_d:!1};try{e.call(t,l(E,i,1),l(j,i,1))}catch(t){j.call(i,t)}})):(s._v=t,s._s=1,R(s,!1))}catch(t){j.call({_w:s,_d:!1},t)}}};M||(D=function(t){h(this,D,"Promise","_h"),m(t),i.call(this);try{t(l(E,this,1),l(j,this,1))}catch(t){j.call(this,t)}},(i=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=s("XJU/")(D.prototype,{then:function(t,e){var s=I(v(this,D));return s.ok="function"!=typeof t||t,s.fail="function"==typeof e&&e,s.domain=W?b.domain:void 0,this._c.push(s),this._a&&this._a.push(s),this._s&&R(this,!1),s.promise},catch:function(t){return this.then(void 0,t)}}),a=function(){var t=new i;this.promise=t,this.resolve=l(E,t,1),this.reject=l(j,t,1)},x.f=I=function(t){return t===D||t===n?new a(t):r(t)}),p(p.G+p.W+p.F*!M,{Promise:D}),s("RfKB")(D,"Promise"),s("TJWN")("Promise"),n=s("WEpk").Promise,p(p.S+p.F*!M,"Promise",{reject:function(t){var e=I(this);return(0,e.reject)(t),e.promise}}),p(p.S+p.F*(o||!M),"Promise",{resolve:function(t){return g(o&&this===n?D:this,t)}}),p(p.S+p.F*!(M&&s("TuGD")((function(t){D.all(t).catch(T)}))),"Promise",{all:function(t){var e=this,s=I(e),i=s.resolve,r=s.reject,a=_((function(){var s=[],a=0,n=1;f(t,!1,(function(t){var o=a++,c=!1;s.push(void 0),n++,e.resolve(t).then((function(t){c||(c=!0,s[o]=t,--n||i(s))}),r)})),--n||i(s)}));return a.e&&r(a.v),s.promise},race:function(t){var e=this,s=I(e),i=s.reject,r=_((function(){f(t,!1,(function(t){e.resolve(t).then(s.resolve,i)}))}));return r.e&&i(r.v),s.promise}})},MCSJ:function(t,e){t.exports=function(t,e,s){var i=void 0===s;switch(e.length){case 0:return i?t():t.call(s);case 1:return i?t(e[0]):t.call(s,e[0]);case 2:return i?t(e[0],e[1]):t.call(s,e[0],e[1]);case 3:return i?t(e[0],e[1],e[2]):t.call(s,e[0],e[1],e[2]);case 4:return i?t(e[0],e[1],e[2],e[3]):t.call(s,e[0],e[1],e[2],e[3])}return t.apply(s,e)}},MkQ6:function(t,e,s){"use strict";s.d(e,"a",(function(){return i})),s.d(e,"b",(function(){return r}));var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("Card",{attrs:{header:t.query.typeName}}),t._v(" "),s("Card",{staticClass:"card-radio-con",attrs:{header:"通知方式："}},[s("CardRow",{attrs:{description:"若没勾选，则下面不显示对应的方式。若不能支持，则置灰不能勾选 。 "}},[s("el-checkbox-group",{on:{change:t.noticeListChange},model:{value:t.noticeList,callback:function(e){t.noticeList=e},expression:"noticeList"}},[s("el-checkbox",{attrs:{label:"0"}},[t._v("系统通知")]),t._v(" "),s("el-checkbox",{attrs:{label:"1"}},[t._v("微信模板通知")]),t._v(" "),s("el-checkbox",{attrs:{label:"2"}},[t._v("短信通知")])],1)],1)],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showSystem,expression:"showSystem"}],staticClass:"system-notice"},[s("p",{staticClass:"system-title"},[t._v("系统通知")]),t._v(" "),s("Card",{attrs:{header:t.query.typeName}},[s("CardRow",{attrs:{description:t.systemList.disabled?"当前通知的内容和格式为系统内置，无法自定义配置":"系统发送的欢迎信息的标题，不支持HTML，不超过75字节"}},[s("el-input",{attrs:{type:"text",maxlength:"75",disabled:t.systemList.disabled},model:{value:t.systemList.title,callback:function(e){t.$set(t.systemList,"title",e)},expression:"systemList.title"}})],1)],1),t._v(" "),s("Card",{attrs:{header:"通知内容："}},[s("CardRow",{attrs:{row:"",description:t.systemList.disabled?"":t.systemDes}},[s("el-input",{attrs:{type:"textarea",autosize:{minRows:5,maxRows:5},disabled:t.systemList.disabled,clearable:""},model:{value:t.systemList.content,callback:function(e){t.$set(t.systemList,"content",e)},expression:"systemList.content"}})],1)],1)],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showMini,expression:"showMini"}],staticClass:"system-notice"},[s("p",{staticClass:"system-title"},[t._v("小程序订阅信息")]),t._v(" "),s("Card",{attrs:{header:"模板ID："}},[s("CardRow",{attrs:{description:t.miniProgramList.mini_program_prompt?"请填写小程序订阅消息的模版ID，此消息的触发操作为「"+t.miniProgramList.mini_program_prompt+"」，每一个触发操作最多支持3个不同模板ID的订阅消息":"请填写模板消息的ID"}},[s("el-input",{attrs:{type:"text",maxlength:"75"},model:{value:t.miniProgramList.templateId,callback:function(e){t.$set(t.miniProgramList,"templateId",e)},expression:"miniProgramList.templateId"}})],1)],1),t._v(" "),s("Card",{attrs:{header:""}},[s("div",{staticClass:"applets-box"},[s("div",{staticClass:"applets-box-content"},[s("CardRow",{attrs:{row:"",description:t.miniDes+t.miniTips}},t._l(t.keyList,(function(e,i){return s("div",{key:i,staticClass:"applets"},[s("div",{staticClass:"applets-titles"},[t._v(t._s(e))]),t._v(" "),t.keyList.length>0?s("el-input",{staticClass:"applets-input",attrs:{type:"input"},model:{value:t.miniKeyWord[i],callback:function(e){t.$set(t.miniKeyWord,i,e)},expression:"miniKeyWord[index]"}}):t._e()],1)})),0),t._v(" "),s("CardRow",{attrs:{row:"",description:"请填写正确的小程序路径，填写错误将导致用户无法接收到消息通知"}},[s("div",{staticClass:"applets"},[s("span",{staticClass:"applets-titles"},[t._v("小程序路径：")]),t._v(" "),s("el-input",{staticClass:"applets-input",attrs:{type:"input"},model:{value:t.miniProgramList.pagePath,callback:function(e){t.$set(t.miniProgramList,"pagePath",e)},expression:"miniProgramList.pagePath"}})],1)])],1)])])],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showWx,expression:"showWx"}],staticClass:"system-notice"},[s("p",{staticClass:"system-title"},[t._v("微信模板信息")]),t._v(" "),s("Card",{attrs:{header:"模板ID："}},[s("CardRow",{attrs:{description:"请填写模板消息的ID"}},[s("el-input",{attrs:{type:"text",maxlength:"75"},model:{value:t.wxList.templateId,callback:function(e){t.$set(t.wxList,"templateId",e)},expression:"wxList.templateId"}})],1)],1),t._v(" "),s("Card",{attrs:{header:""}},[s("div",{staticClass:"applets-box"},[s("div",{staticClass:"applets-box-content"},[s("CardRow",{attrs:{row:"",description:t.wxDes}},[s("div",{staticClass:"applets"},[s("span",{staticClass:"applets-titles"},[t._v("first：")]),t._v(" "),s("el-input",{staticClass:"applets-input",attrs:{type:"input"},model:{value:t.wxList.firstData,callback:function(e){t.$set(t.wxList,"firstData",e)},expression:"wxList.firstData"}})],1),t._v(" "),t._l(t.appletsList,(function(e,i){return s("div",{key:i,staticClass:"applets"},[s("span",{staticClass:"applets-title"},[t._v("keyword"+t._s(i+1)+":")]),t._v(" "),s("el-input",{staticClass:"applets-input",attrs:{type:"input"},model:{value:t.appletsList[i],callback:function(e){t.$set(t.appletsList,i,e)},expression:"appletsList[index]"}}),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:i>1,expression:"index>1"}],staticClass:"iconfont iconicon_delect iconhuishouzhan",on:{click:function(e){return t.delectClick(i,"appletsList")}}})],1)})),t._v(" "),s("div",{staticClass:"applets"},[s("span",{staticClass:"applets-titles"}),t._v(" "),s("TableContAdd",{directives:[{name:"show",rawName:"v-show",value:t.showClick,expression:"showClick"}],attrs:{cont:"添加关键字"},on:{tableContAddClick:function(e){return t.tableContAdd("appletsList")}}})],1),t._v(" "),s("div",{staticClass:"applets"},[s("span",{staticClass:"applets-titles"},[t._v("remark：")]),t._v(" "),s("el-input",{staticClass:"applets-input",attrs:{type:"input"},model:{value:t.wxList.remarkData,callback:function(e){t.$set(t.wxList,"remarkData",e)},expression:"wxList.remarkData"}})],1),t._v(" "),s("div",{staticClass:"applets"},[s("span",{staticClass:"applets-title"},[t._v("跳转类型：")]),t._v(" "),s("div",{staticClass:"applets-radio"},[s("el-radio",{attrs:{label:0},model:{value:t.wxList.redirectType,callback:function(e){t.$set(t.wxList,"redirectType",e)},expression:"wxList.redirectType"}},[t._v("无跳转")]),t._v(" "),s("el-radio",{attrs:{label:2},model:{value:t.wxList.redirectType,callback:function(e){t.$set(t.wxList,"redirectType",e)},expression:"wxList.redirectType"}},[t._v("跳转至小程序")]),t._v(" "),s("el-radio",{attrs:{label:1},model:{value:t.wxList.redirectType,callback:function(e){t.$set(t.wxList,"redirectType",e)},expression:"wxList.redirectType"}},[t._v("跳转至H5")])],1)])],2),t._v(" "),s("CardRow",{attrs:{row:"",description:2===t.wxList.redirectType?"请填写正确的小程序路径，填写错误将导致用户无法接收到消息通知。":""}},[s("div",{directives:[{name:"show",rawName:"v-show",value:1===t.wxList.redirectType,expression:"wxList.redirectType === 1"}],staticClass:"applets"},[s("span",{staticClass:"applets-titles"},[t._v("H5网址：")]),t._v(" "),s("el-input",{staticClass:"applets-input",attrs:{type:"input"},model:{value:t.wxList.redirectUrl,callback:function(e){t.$set(t.wxList,"redirectUrl",e)},expression:"wxList.redirectUrl"}})],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2===t.wxList.redirectType,expression:"wxList.redirectType === 2"}],staticClass:"applets"},[s("span",{staticClass:"applets-titles"},[t._v("小程序路径：")]),t._v(" "),s("el-input",{staticClass:"applets-input",attrs:{type:"input"},model:{value:t.wxList.pagePath,callback:function(e){t.$set(t.wxList,"pagePath",e)},expression:"wxList.pagePath"}})],1)])],1)])])],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showSms,expression:"showSms"}],staticClass:"system-notice"},[s("p",{staticClass:"system-title"},[t._v("短信通知")]),t._v(" "),s("Card",{attrs:{header:"短信模板ID："}},[s("CardRow",{attrs:{description:"填写在腾讯云已配置并审核通过的短信验证码的模版的ID"}},[s("el-input",{attrs:{type:"text",maxlength:"75"},model:{value:t.smsList.templateId,callback:function(e){t.$set(t.smsList,"templateId",e)},expression:"smsList.templateId"}})],1)],1),t._v(" "),s("Card",{attrs:{header:""}},[s("div",{staticClass:"applets-box"},[s("div",{staticClass:"applets-box-content"},[s("CardRow",{attrs:{row:"",description:t.smsDes}},[t._l(t.smsKeyWord,(function(e,i){return s("div",{key:i,staticClass:"applets"},[s("span",{staticClass:"applets-title"},[t._v("变量"+t._s("{"+(i+1)+"}")+":")]),t._v(" "),s("el-input",{staticClass:"applets-input",attrs:{type:"input"},model:{value:t.smsKeyWord[i],callback:function(e){t.$set(t.smsKeyWord,i,e)},expression:"smsKeyWord[index]"}}),t._v(" "),s("span",{staticClass:"iconfont iconicon_delect iconhuishouzhan",on:{click:function(e){return t.delectClick(i,"smsKeyWord")}}})],1)})),t._v(" "),s("div",{staticClass:"applets"},[s("span",{staticClass:"applets-titles"}),t._v(" "),s("TableContAdd",{attrs:{cont:"添加关键字"},on:{tableContAddClick:function(e){return t.tableContAdd("smsKeyWord")}}})],1)],2)],1)])])],1),t._v(" "),s("Card",{staticClass:"footer-btn"},[s("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.Submission}},[t._v("提交")])],1)],1)},r=[]},PBE1:function(t,e,s){"use strict";var i=s("Y7ZC"),r=s("WEpk"),a=s("5T2Y"),n=s("8gHz"),o=s("zXhZ");i(i.P+i.R,"Promise",{finally:function(t){var e=n(this,r.Promise||a.Promise),s="function"==typeof t;return this.then(s?function(s){return o(e,t()).then((function(){return s}))}:t,s?function(s){return o(e,t()).then((function(){throw s}))}:t)}})},"Q/yX":function(t,e,s){"use strict";var i=s("Y7ZC"),r=s("ZW5q"),a=s("RDmV");i(i.S,"Promise",{try:function(t){var e=r.f(this),s=a(t);return(s.e?e.reject:e.resolve)(s.v),e.promise}})},QXhf:function(t,e,s){var i,r,a,n=s("2GTP"),o=s("MCSJ"),c=s("MvwC"),l=s("Hsns"),u=s("5T2Y"),p=u.process,d=u.setImmediate,m=u.clearImmediate,h=u.MessageChannel,f=u.Dispatch,v=0,w={},y=function(){var t=+this;if(w.hasOwnProperty(t)){var e=w[t];delete w[t],e()}},x=function(t){y.call(t.data)};d&&m||(d=function(t){for(var e=[],s=1;arguments.length>s;)e.push(arguments[s++]);return w[++v]=function(){o("function"==typeof t?t:Function(t),e)},i(v),v},m=function(t){delete w[t]},"process"==s("a0xu")(p)?i=function(t){p.nextTick(n(y,t,1))}:f&&f.now?i=function(t){f.now(n(y,t,1))}:h?(a=(r=new h).port2,r.port1.onmessage=x,i=n(a.postMessage,a,1)):u.addEventListener&&"function"==typeof postMessage&&!u.importScripts?(i=function(t){u.postMessage(t+"","*")},u.addEventListener("message",x,!1)):i="onreadystatechange"in l("script")?function(t){c.appendChild(l("script")).onreadystatechange=function(){c.removeChild(this),y.call(t)}}:function(t){setTimeout(n(y,t,1),0)}),t.exports={set:d,clear:m}},RDmV:function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},TJWN:function(t,e,s){"use strict";var i=s("5T2Y"),r=s("WEpk"),a=s("2faE"),n=s("jmDH"),o=s("UWiX")("species");t.exports=function(t){var e="function"==typeof r[t]?r[t]:i[t];n&&e&&!e[o]&&a.f(e,o,{configurable:!0,get:function(){return this}})}},"XJU/":function(t,e,s){var i=s("NegM");t.exports=function(t,e,s){for(var r in e)s&&t[r]?t[r]=e[r]:i(t,r,e[r]);return t}},ZW5q:function(t,e,s){"use strict";var i=s("eaoh");function r(t){var e,s;this.promise=new t((function(t,i){if(void 0!==e||void 0!==s)throw TypeError("Bad Promise constructor");e=t,s=i})),this.resolve=i(e),this.reject=i(s)}t.exports.f=function(t){return new r(t)}},aW7e:function(t,e,s){s("wgeU"),s("FlQf"),s("bBy9"),s("JMW+"),s("PBE1"),s("Q/yX"),t.exports=s("WEpk").Promise},gMwa:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(s("QbLZ"));s("lpfh");var r=a(s("wu2b"));function a(t){return t&&t.__esModule?t:{default:t}}e.default=(0,i.default)({name:"notice-configure-view"},r.default)},k2Pg:function(t,e,s){"use strict";s.r(e);var i=s("MkQ6"),r=s("lqGl");for(var a in r)["default"].indexOf(a)<0&&function(t){s.d(e,t,(function(){return r[t]}))}(a);var n=s("KHd+"),o=Object(n.a)(r.default,i.a,i.b,!1,null,null,null);e.default=o.exports},lqGl:function(t,e,s){"use strict";s.r(e);var i=s("gMwa"),r=s.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){s.d(e,t,(function(){return i[t]}))}(a);e.default=r.a},oioR:function(t,e,s){var i=s("2GTP"),r=s("sNwI"),a=s("NwJ3"),n=s("5K7Z"),o=s("tEej"),c=s("fNZA"),l={},u={};(e=t.exports=function(t,e,s,p,d){var m,h,f,v,w=d?function(){return t}:c(t),y=i(s,p,e?2:1),x=0;if("function"!=typeof w)throw TypeError(t+" is not iterable!");if(a(w)){for(m=o(t.length);m>x;x++)if((v=e?y(n(h=t[x])[0],h[1]):y(t[x]))===l||v===u)return v}else for(f=w.call(t);!(h=f.next()).done;)if((v=r(f,y,h.value,e))===l||v===u)return v}).BREAK=l,e.RETURN=u},q6LJ:function(t,e,s){var i=s("5T2Y"),r=s("QXhf").set,a=i.MutationObserver||i.WebKitMutationObserver,n=i.process,o=i.Promise,c="process"==s("a0xu")(n);t.exports=function(){var t,e,s,l=function(){var i,r;for(c&&(i=n.domain)&&i.exit();t;){r=t.fn,t=t.next;try{r()}catch(i){throw t?s():e=void 0,i}}e=void 0,i&&i.enter()};if(c)s=function(){n.nextTick(l)};else if(!a||i.navigator&&i.navigator.standalone)if(o&&o.resolve){var u=o.resolve(void 0);s=function(){u.then(l)}}else s=function(){r.call(i,l)};else{var p=!0,d=document.createTextNode("");new a(l).observe(d,{characterData:!0}),s=function(){d.data=p=!p}}return function(i){var r={fn:i,next:void 0};e&&(e.next=r),t||(t=r,s()),e=r}}},u938:function(t,e,s){var i=function(){return this}()||Function("return this")(),r=i.regeneratorRuntime&&Object.getOwnPropertyNames(i).indexOf("regeneratorRuntime")>=0,a=r&&i.regeneratorRuntime;if(i.regeneratorRuntime=void 0,t.exports=s("ls82"),r)i.regeneratorRuntime=a;else try{delete i.regeneratorRuntime}catch(t){i.regeneratorRuntime=void 0}},vBP9:function(t,e,s){var i=s("5T2Y").navigator;t.exports=i&&i.userAgent||""},wu2b:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=c(s("14Xm")),r=c(s("D3Ub")),a=c(s("4gYi")),n=c(s("pNQN")),o=c(s("kAKY"));function c(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{query:"",typeName:"",showSystem:!1,showWx:!1,showMini:!1,showSms:!1,noticeList:[],wxDes:"",systemDes:"",smsDes:"",miniDes:"",systemList:"",wxList:"",miniProgramList:"",smsList:"",appletsList:[],smsKeyWord:[],miniKeyWord:[],showClick:!0,keyList:[],miniTips:""}},components:{Card:a.default,CardRow:n.default,TableContAdd:o.default},created:function(){this.query=this.$route.query,this.typeStatus=this.$route.query.typeStatus,this.typeName=this.$route.query.typeName,this.noticeConfigure()},methods:{tableContAdd:function(t,e){"appletsList"===t&&this.appletsList.length<=4?this.appletsList.push(""):"appletsList"===t&&this.appletsList.length>4?this.showClick=!1:"smsKeyWord"===t?this.smsKeyWord.push(""):"miniKeyWord"===t&&this.miniKeyWord.push("")},delectClick:function(t,e){"appletsList"===e?(this.showClick=!0,this.appletsList.splice(t,1)):"smsKeyWord"===e?this.smsKeyWord.splice(t,1):"miniKeyWord"===e&&this.miniKeyWord.splice(t,1)},noticeListChange:function(t){this.showSystem=t.includes("0"),this.showWx=t.includes("1"),this.showMini=t.includes("4"),this.showSms=t.includes("2")},noticeConfigure:function(){var t=this;this.appFetch({url:"notices_detail_get_v3",method:"get",splice:"?typeName="+this.typeName,data:{}}).then((function(e){if(0===e.Code){if(e.Data[0]){t.systemList=e.Data[0];var s=t.systemList.templateVariables;if(s)for(var i in t.systemDes="请输入模板消息详细内容对应的变量。关键字个数需与已添加的模板一致。\n\n可以使用如下变量：\n",s)t.systemDes+=i+" "+s[i]+"\n";1===t.systemList.status?(!t.noticeList.includes("0")&&t.noticeList.push("0"),t.showSystem=!0):t.showSystem=!1}if(e.Data[1]){t.wxList=e.Data[1];var r=t.wxList.templateVariables;if(r)for(var a in t.wxDes="请输入模板消息详细内容对应的变量。关键字个数需与已添加的模板一致。\n\n可以使用如下变量：\n",r)t.wxDes+=a+" "+r[a]+"\n";t.appletsList=t.wxList.keywordsData.length>0?t.wxList.keywordsData:["",""],1===t.wxList.status?(!t.noticeList.includes("1")&&t.noticeList.push("1"),t.showWx=!0):t.showWx=!1}if(e.Data[2]){t.smsList=e.Data[2],t.smsKeyWord=t.smsList.keywordsData.length>0?t.smsList.keywordsData:[""];var n=t.smsList.templateVariables;if(n)for(var o in t.smsDes="请输入模板消息详细内容对应的变量。关键字个数需与已添加的模板一致。\n\n可以使用如下变量：\n",n)t.smsDes+=o+" "+n[o]+"\n";1===t.smsList.status?(!t.noticeList.includes("2")&&t.noticeList.push("2"),t.showSms=!0):t.showSms=!1}if(e.Data[3]){t.miniProgramList=e.Data[3],t.keyList=t.miniProgramList.keys,t.miniKeyWord=t.miniProgramList.keywordsData.length>0?t.miniProgramList.keywordsData:["",""];var c=t.miniProgramList.templateVariables;if(t.miniTips='\n<a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html" target="_blank">订阅消息参数值内容限制说明</a>填写错误将导致用户无法接收到消息通知',c)for(var l in t.miniDes="请输入模板消息详细内容对应的变量。关键字个数需与已添加的模板一致。\n\n可以使用如下变量：\n",c)t.miniDes+=l+" "+c[l]+"\n";1===t.miniProgramList.status?(!t.noticeList.includes("4")&&t.noticeList.push("4"),t.showMini=!0):t.showMini=!1}}else t.$message.error(e.Message)}))},getNoticesDetail:function(t,e){var s=this;return(0,r.default)(i.default.mark((function r(){var a;return i.default.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,s.appFetch({url:"notices_detail_get_v3",method:"get",data:{typeName:e,type:t}});case 3:return a=i.sent,i.abrupt("return",a);case 7:i.prev=7,i.t0=i.catch(0);case 9:case"end":return i.stop()}}),r,s,[[0,7]])})))()},Submission:function(){var t=this,e=[];if(!0===this.showSystem?e.push({id:this.systemList.tplId,status:1,templateId:this.systemList.templateId,title:this.systemList.title,content:this.systemList.content}):e.push({id:this.systemList.tplId,status:0}),!0===this.showWx){if(""===this.wxList.firstData)return void this.$message.error("请填写first");for(var s in this.appletsList){if(s>=2)break;if(!this.appletsList[s])return void this.$message.error("请填写keywords")}if(""===this.wxList.remarkData)return void this.$message.error("请填写remark");e.push({id:this.wxList.tplId,status:1,templateId:this.wxList.templateId,firstData:this.wxList.firstData,keywordsData:this.appletsList,remarkData:this.wxList.remarkData,redirectType:this.wxList.redirectType,redirectUrl:this.wxList.redirectUrl,pagePath:this.wxList.pagePath})}else e.push({id:this.wxList.tplId,status:0});if(!0===this.showSms){if(""===this.smsList.templateId)return void this.$message.error("请填写短信模版ID");for(var i in this.smsKeyWord){if(i>=2)break;if(!this.smsKeyWord[i])return void this.$message.error("请填写keywords")}e.push({id:this.smsList.tplId,status:1,title:this.smsList.title,templateId:this.smsList.templateId,keywordsData:this.smsKeyWord})}else e.push({id:this.smsList.tplId,status:0});if(!0===this.showMini){if(""===this.miniProgramList.templateId)return void this.$message.error("请填写小程序模版ID");if(this.keyList.length>0)for(var r=0,a=this.miniKeyWord.length;r<a;r++)if(""===this.miniKeyWord[r])return void this.$message.error("请填写keywords");if(""===this.miniProgramList.pagePath)return void this.$message.error("请填写小程序路径");e.push({id:this.miniProgramList.tplId,status:1,templateId:this.miniProgramList.templateId,title:this.miniProgramList.title,keywordsData:this.miniKeyWord,pagePath:this.miniProgramList.pagePath})}else e.push({id:this.miniProgramList.tplId,status:0});this.appFetch({url:"notices_update_post_v3",method:"post",data:{data:e}}).then((function(e){if(e.errors)e.errors[0].detail?t.$message.error(e.errors[0].code+"\n"+e.errors[0].detail[0]):t.$message.error(e.errors[0].code);else{if(0!==e.Code)return void t.$message.error(e.Message);t.$message({message:"提交成功",type:"success"}),t.noticeConfigure()}}))}}}},zXhZ:function(t,e,s){var i=s("5K7Z"),r=s("93I4"),a=s("ZW5q");t.exports=function(t,e){if(i(t),r(e)&&e.constructor===t)return e;var s=a.f(t);return(0,s.resolve)(e),s.promise}}}]);