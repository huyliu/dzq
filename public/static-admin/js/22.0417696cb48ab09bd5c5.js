(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"14Xm":function(e,t,n){e.exports=n("u938")},"1GR3":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n("14Xm")),o=s(n("D3Ub")),i=s(n("4gYi")),c=s(n("pNQN"));function s(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){return{secretId:"",secretKey:"",appId:"",type:""}},created:function(){this.tencentCloudList();var e=this.$route.query.type;this.type=e},methods:{configClick:function(e){},tencentCloudList:function(){var e=this;this.appFetch({url:"forum_get_v3",method:"get",data:{}}).then((function(t){if(t.errors)e.$message.error(t.errors[0].code);else{if(0!==t.Code)return void e.$message.error(t.Message);var n=t.Data;e.appId=n.qcloud.qcloudAppId,e.secretId=n.qcloud.qcloudSecretId,e.secretKey=n.qcloud.qcloudSecretKey}}))},Submission:function(){var e=this;return(0,o.default)(r.default.mark((function t(){return r.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.secretId=e.secretId.trim(),e.secretKey=e.secretKey.trim(),t.prev=2,t.next=5,e.appFetch({url:"settings_post_v3",method:"post",data:{data:[{key:"qcloud_app_id",value:e.appId,tag:"qcloud"},{key:"qcloud_secret_id",value:e.secretId,tag:"qcloud"},{key:"qcloud_secret_key",value:e.secretKey,tag:"qcloud"}]}}).then((function(t){if(t.errors)throw new Error(t.errors[0].code);0===t.Code?e.$message({message:"提交成功",type:"success"}):e.$message.error(t.Message)}));case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(2),e.$message({showClose:!0,message:t.t0});case 10:case"end":return t.stop()}}),t,e,[[2,7]])})))()}},components:{Card:i.default,CardRow:c.default}}},"4d7F":function(e,t,n){e.exports={default:n("aW7e"),__esModule:!0}},"8gHz":function(e,t,n){var r=n("5K7Z"),o=n("eaoh"),i=n("UWiX")("species");e.exports=function(e,t){var n,c=r(e).constructor;return void 0===c||null==(n=r(c)[i])?t:o(n)}},"9nIw":function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}));var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Card",{attrs:{header:"云API配置"}}),e._v(" "),n("Card",{attrs:{header:"Secretid："}},[n("CardRow",{attrs:{description:"腾讯云账户 - 访问管理 - 访问密钥 - API密钥的SecretId"}},[n("el-input",{attrs:{clearable:""},model:{value:e.secretId,callback:function(t){e.secretId=t},expression:"secretId"}})],1)],1),e._v(" "),n("Card",{attrs:{header:"SecretKey："}},[n("CardRow",{attrs:{description:"腾讯云账户 - 访问管理 - 访问密钥 - API密钥的SecretKey"}},[n("el-input",{attrs:{clearable:""},model:{value:e.secretKey,callback:function(t){e.secretKey=t},expression:"secretKey"}})],1)],1),e._v(" "),n("Card",{staticClass:"footer-btn"},[n("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.Submission}},[e._v("提交")])],1)],1)},o=[]},C8go:function(e,t,n){"use strict";n.r(t);var r=n("9nIw"),o=n("NrPb");for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);var c=n("KHd+"),s=Object(c.a)(o.default,r.a,r.b,!1,null,null,null);t.default=s.exports},D3Ub:function(e,t,n){"use strict";t.__esModule=!0;var r,o=n("4d7F"),i=(r=o)&&r.__esModule?r:{default:r};t.default=function(e){return function(){var t=e.apply(this,arguments);return new i.default((function(e,n){return function r(o,c){try{var s=t[o](c),u=s.value}catch(e){return void n(e)}if(!s.done)return i.default.resolve(u).then((function(e){r("next",e)}),(function(e){r("throw",e)}));e(u)}("next")}))}}},EXMj:function(e,t){e.exports=function(e,t,n,r){if(!(e instanceof t)||void 0!==r&&r in e)throw TypeError(n+": incorrect invocation!");return e}},HcrZ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n("QbLZ"));n("lpfh");var o=i(n("1GR3"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=(0,r.default)({name:"tencent-cloud-config-cloud-view"},o.default)},"JMW+":function(e,t,n){"use strict";var r,o,i,c,s=n("uOPS"),u=n("5T2Y"),a=n("2GTP"),f=n("QMMT"),l=n("Y7ZC"),d=n("93I4"),v=n("eaoh"),h=n("EXMj"),p=n("oioR"),m=n("8gHz"),_=n("QXhf").set,y=n("q6LJ")(),g=n("ZW5q"),w=n("RDmV"),x=n("vBP9"),P=n("zXhZ"),b=u.TypeError,C=u.process,M=C&&C.versions,I=M&&M.v8||"",R=u.Promise,j="process"==f(C),T=function(){},E=o=g.f,k=!!function(){try{var e=R.resolve(1),t=(e.constructor={})[n("UWiX")("species")]=function(e){e(T,T)};return(j||"function"==typeof PromiseRejectionEvent)&&e.then(T)instanceof t&&0!==I.indexOf("6.6")&&-1===x.indexOf("Chrome/66")}catch(e){}}(),q=function(e){var t;return!(!d(e)||"function"!=typeof(t=e.then))&&t},W=function(e,t){if(!e._n){e._n=!0;var n=e._c;y((function(){for(var r=e._v,o=1==e._s,i=0,c=function(t){var n,i,c,s=o?t.ok:t.fail,u=t.resolve,a=t.reject,f=t.domain;try{s?(o||(2==e._h&&Z(e),e._h=1),!0===s?n=r:(f&&f.enter(),n=s(r),f&&(f.exit(),c=!0)),n===t.promise?a(b("Promise-chain cycle")):(i=q(n))?i.call(n,u,a):u(n)):a(r)}catch(e){f&&!c&&f.exit(),a(e)}};n.length>i;)c(n[i++]);e._c=[],e._n=!1,t&&!e._h&&K(e)}))}},K=function(e){_.call(u,(function(){var t,n,r,o=e._v,i=X(e);if(i&&(t=w((function(){j?C.emit("unhandledRejection",o,e):(n=u.onunhandledrejection)?n({promise:e,reason:o}):(r=u.console)&&r.error&&r.error("Unhandled promise rejection",o)})),e._h=j||X(e)?2:1),e._a=void 0,i&&t.e)throw t.v}))},X=function(e){return 1!==e._h&&0===(e._a||e._c).length},Z=function(e){_.call(u,(function(){var t;j?C.emit("rejectionHandled",e):(t=u.onrejectionhandled)&&t({promise:e,reason:e._v})}))},S=function(e){var t=this;t._d||(t._d=!0,(t=t._w||t)._v=e,t._s=2,t._a||(t._a=t._c.slice()),W(t,!0))},O=function(e){var t,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===e)throw b("Promise can't be resolved itself");(t=q(e))?y((function(){var r={_w:n,_d:!1};try{t.call(e,a(O,r,1),a(S,r,1))}catch(e){S.call(r,e)}})):(n._v=e,n._s=1,W(n,!1))}catch(e){S.call({_w:n,_d:!1},e)}}};k||(R=function(e){h(this,R,"Promise","_h"),v(e),r.call(this);try{e(a(O,this,1),a(S,this,1))}catch(e){S.call(this,e)}},(r=function(e){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=n("XJU/")(R.prototype,{then:function(e,t){var n=E(m(this,R));return n.ok="function"!=typeof e||e,n.fail="function"==typeof t&&t,n.domain=j?C.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&W(this,!1),n.promise},catch:function(e){return this.then(void 0,e)}}),i=function(){var e=new r;this.promise=e,this.resolve=a(O,e,1),this.reject=a(S,e,1)},g.f=E=function(e){return e===R||e===c?new i(e):o(e)}),l(l.G+l.W+l.F*!k,{Promise:R}),n("RfKB")(R,"Promise"),n("TJWN")("Promise"),c=n("WEpk").Promise,l(l.S+l.F*!k,"Promise",{reject:function(e){var t=E(this);return(0,t.reject)(e),t.promise}}),l(l.S+l.F*(s||!k),"Promise",{resolve:function(e){return P(s&&this===c?R:this,e)}}),l(l.S+l.F*!(k&&n("TuGD")((function(e){R.all(e).catch(T)}))),"Promise",{all:function(e){var t=this,n=E(t),r=n.resolve,o=n.reject,i=w((function(){var n=[],i=0,c=1;p(e,!1,(function(e){var s=i++,u=!1;n.push(void 0),c++,t.resolve(e).then((function(e){u||(u=!0,n[s]=e,--c||r(n))}),o)})),--c||r(n)}));return i.e&&o(i.v),n.promise},race:function(e){var t=this,n=E(t),r=n.reject,o=w((function(){p(e,!1,(function(e){t.resolve(e).then(n.resolve,r)}))}));return o.e&&r(o.v),n.promise}})},MCSJ:function(e,t){e.exports=function(e,t,n){var r=void 0===n;switch(t.length){case 0:return r?e():e.call(n);case 1:return r?e(t[0]):e.call(n,t[0]);case 2:return r?e(t[0],t[1]):e.call(n,t[0],t[1]);case 3:return r?e(t[0],t[1],t[2]):e.call(n,t[0],t[1],t[2]);case 4:return r?e(t[0],t[1],t[2],t[3]):e.call(n,t[0],t[1],t[2],t[3])}return e.apply(n,t)}},NrPb:function(e,t,n){"use strict";n.r(t);var r=n("HcrZ"),o=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t.default=o.a},PBE1:function(e,t,n){"use strict";var r=n("Y7ZC"),o=n("WEpk"),i=n("5T2Y"),c=n("8gHz"),s=n("zXhZ");r(r.P+r.R,"Promise",{finally:function(e){var t=c(this,o.Promise||i.Promise),n="function"==typeof e;return this.then(n?function(n){return s(t,e()).then((function(){return n}))}:e,n?function(n){return s(t,e()).then((function(){throw n}))}:e)}})},"Q/yX":function(e,t,n){"use strict";var r=n("Y7ZC"),o=n("ZW5q"),i=n("RDmV");r(r.S,"Promise",{try:function(e){var t=o.f(this),n=i(e);return(n.e?t.reject:t.resolve)(n.v),t.promise}})},QXhf:function(e,t,n){var r,o,i,c=n("2GTP"),s=n("MCSJ"),u=n("MvwC"),a=n("Hsns"),f=n("5T2Y"),l=f.process,d=f.setImmediate,v=f.clearImmediate,h=f.MessageChannel,p=f.Dispatch,m=0,_={},y=function(){var e=+this;if(_.hasOwnProperty(e)){var t=_[e];delete _[e],t()}},g=function(e){y.call(e.data)};d&&v||(d=function(e){for(var t=[],n=1;arguments.length>n;)t.push(arguments[n++]);return _[++m]=function(){s("function"==typeof e?e:Function(e),t)},r(m),m},v=function(e){delete _[e]},"process"==n("a0xu")(l)?r=function(e){l.nextTick(c(y,e,1))}:p&&p.now?r=function(e){p.now(c(y,e,1))}:h?(i=(o=new h).port2,o.port1.onmessage=g,r=c(i.postMessage,i,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(r=function(e){f.postMessage(e+"","*")},f.addEventListener("message",g,!1)):r="onreadystatechange"in a("script")?function(e){u.appendChild(a("script")).onreadystatechange=function(){u.removeChild(this),y.call(e)}}:function(e){setTimeout(c(y,e,1),0)}),e.exports={set:d,clear:v}},RDmV:function(e,t){e.exports=function(e){try{return{e:!1,v:e()}}catch(e){return{e:!0,v:e}}}},TJWN:function(e,t,n){"use strict";var r=n("5T2Y"),o=n("WEpk"),i=n("2faE"),c=n("jmDH"),s=n("UWiX")("species");e.exports=function(e){var t="function"==typeof o[e]?o[e]:r[e];c&&t&&!t[s]&&i.f(t,s,{configurable:!0,get:function(){return this}})}},"XJU/":function(e,t,n){var r=n("NegM");e.exports=function(e,t,n){for(var o in t)n&&e[o]?e[o]=t[o]:r(e,o,t[o]);return e}},ZW5q:function(e,t,n){"use strict";var r=n("eaoh");function o(e){var t,n;this.promise=new e((function(e,r){if(void 0!==t||void 0!==n)throw TypeError("Bad Promise constructor");t=e,n=r})),this.resolve=r(t),this.reject=r(n)}e.exports.f=function(e){return new o(e)}},aW7e:function(e,t,n){n("wgeU"),n("FlQf"),n("bBy9"),n("JMW+"),n("PBE1"),n("Q/yX"),e.exports=n("WEpk").Promise},oioR:function(e,t,n){var r=n("2GTP"),o=n("sNwI"),i=n("NwJ3"),c=n("5K7Z"),s=n("tEej"),u=n("fNZA"),a={},f={};(t=e.exports=function(e,t,n,l,d){var v,h,p,m,_=d?function(){return e}:u(e),y=r(n,l,t?2:1),g=0;if("function"!=typeof _)throw TypeError(e+" is not iterable!");if(i(_)){for(v=s(e.length);v>g;g++)if((m=t?y(c(h=e[g])[0],h[1]):y(e[g]))===a||m===f)return m}else for(p=_.call(e);!(h=p.next()).done;)if((m=o(p,y,h.value,t))===a||m===f)return m}).BREAK=a,t.RETURN=f},q6LJ:function(e,t,n){var r=n("5T2Y"),o=n("QXhf").set,i=r.MutationObserver||r.WebKitMutationObserver,c=r.process,s=r.Promise,u="process"==n("a0xu")(c);e.exports=function(){var e,t,n,a=function(){var r,o;for(u&&(r=c.domain)&&r.exit();e;){o=e.fn,e=e.next;try{o()}catch(r){throw e?n():t=void 0,r}}t=void 0,r&&r.enter()};if(u)n=function(){c.nextTick(a)};else if(!i||r.navigator&&r.navigator.standalone)if(s&&s.resolve){var f=s.resolve(void 0);n=function(){f.then(a)}}else n=function(){o.call(r,a)};else{var l=!0,d=document.createTextNode("");new i(a).observe(d,{characterData:!0}),n=function(){d.data=l=!l}}return function(r){var o={fn:r,next:void 0};t&&(t.next=o),e||(e=o,n()),t=o}}},u938:function(e,t,n){var r=function(){return this}()||Function("return this")(),o=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,i=o&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,e.exports=n("ls82"),o)r.regeneratorRuntime=i;else try{delete r.regeneratorRuntime}catch(e){r.regeneratorRuntime=void 0}},vBP9:function(e,t,n){var r=n("5T2Y").navigator;e.exports=r&&r.userAgent||""},zXhZ:function(e,t,n){var r=n("5K7Z"),o=n("93I4"),i=n("ZW5q");e.exports=function(e,t){if(r(e),o(t)&&t.constructor===e)return t;var n=i.f(e);return(0,n.resolve)(t),n.promise}}}]);