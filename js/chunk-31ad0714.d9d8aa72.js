(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31ad0714"],{"14c3":function(t,e,n){var r=n("c6b6"),a=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var o=n.call(t,e);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(t,e)}},5319:function(t,e,n){"use strict";var r=n("d784"),a=n("825a"),o=n("7b0b"),i=n("50c4"),u=n("a691"),c=n("1d80"),s=n("8aa5"),l=n("14c3"),f=Math.max,d=Math.min,p=Math.floor,v=/\$([$&'`]|\d\d?|<[^>]*>)/g,h=/\$([$&'`]|\d\d?)/g,b=function(t){return void 0===t?t:String(t)};r("replace",2,(function(t,e,n,r){return[function(n,r){var a=c(this),o=void 0==n?void 0:n[t];return void 0!==o?o.call(n,a,r):e.call(String(a),n,r)},function(t,o){if(r.REPLACE_KEEPS_$0||"string"===typeof o&&-1===o.indexOf("$0")){var c=n(e,t,this,o);if(c.done)return c.value}var p=a(t),v=String(this),h="function"===typeof o;h||(o=String(o));var x=p.global;if(x){var m=p.unicode;p.lastIndex=0}var w=[];while(1){var y=l(p,v);if(null===y)break;if(w.push(y),!x)break;var E=String(y[0]);""===E&&(p.lastIndex=s(v,i(p.lastIndex),m))}for(var $="",k=0,O=0;O<w.length;O++){y=w[O];for(var R=String(y[0]),_=f(d(u(y.index),v.length),0),S=[],j=1;j<y.length;j++)S.push(b(y[j]));var C=y.groups;if(h){var I=[R].concat(S,_,v);void 0!==C&&I.push(C);var P=String(o.apply(void 0,I))}else P=g(R,v,_,S,C,o);_>=k&&($+=v.slice(k,_)+P,k=_+R.length)}return $+v.slice(k)}];function g(t,n,r,a,i,u){var c=r+t.length,s=a.length,l=h;return void 0!==i&&(i=o(i),l=v),e.call(u,l,(function(e,o){var u;switch(o.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(c);case"<":u=i[o.slice(1,-1)];break;default:var l=+o;if(0===l)return e;if(l>s){var f=p(l/10);return 0===f?e:f<=s?void 0===a[f-1]?o.charAt(1):a[f-1]+o.charAt(1):e}u=a[l-1]}return void 0===u?"":u}))}}))},6401:function(t,e,n){"use strict";var r=n("f1ca"),a=n.n(r);a.a},"8aa5":function(t,e,n){"use strict";var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},9263:function(t,e,n){"use strict";var r=n("ad6d"),a=n("9f7f"),o=RegExp.prototype.exec,i=String.prototype.replace,u=o,c=function(){var t=/a/,e=/b*/g;return o.call(t,"a"),o.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),s=a.UNSUPPORTED_Y||a.BROKEN_CARET,l=void 0!==/()??/.exec("")[1],f=c||l||s;f&&(u=function(t){var e,n,a,u,f=this,d=s&&f.sticky,p=r.call(f),v=f.source,h=0,b=t;return d&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),b=String(t).slice(f.lastIndex),f.lastIndex>0&&(!f.multiline||f.multiline&&"\n"!==t[f.lastIndex-1])&&(v="(?: "+v+")",b=" "+b,h++),n=new RegExp("^(?:"+v+")",p)),l&&(n=new RegExp("^"+v+"$(?!\\s)",p)),c&&(e=f.lastIndex),a=o.call(d?n:f,b),d?a?(a.input=a.input.slice(h),a[0]=a[0].slice(h),a.index=f.lastIndex,f.lastIndex+=a[0].length):f.lastIndex=0:c&&a&&(f.lastIndex=f.global?a.index+a[0].length:e),l&&a&&a.length>1&&i.call(a[0],n,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(a[u]=void 0)})),a}),t.exports=u},"9ed6":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login"},[n("van-nav-bar",{attrs:{title:"登录"}}),n("ValidationObserver",{ref:"myform"},[n("ValidationProvider",{attrs:{name:"手机号",immediate:"",rules:"required|mobile"}},[n("van-field",{attrs:{"left-icon":"phone-o",placeholder:"请输入手机号"},model:{value:t.user.mobile,callback:function(e){t.$set(t.user,"mobile",e)},expression:"user.mobile"}})],1),n("ValidationProvider",{attrs:{name:"验证码",immediate:"",rules:"required|code"}},[n("van-field",{attrs:{"left-icon":"phone-o",placeholder:"请输入验证码"},model:{value:t.user.code,callback:function(e){t.$set(t.user,"code",e)},expression:"user.code"}},[t.isCountDownShow?n("van-count-down",{attrs:{slot:"button",time:2e4,format:"ss s"},on:{finish:function(e){t.isCountDownShow=!1}},slot:"button"}):n("van-button",{attrs:{slot:"button",round:"",size:"small",type:"primary"},on:{click:t.getCode},slot:"button"},[t._v("发送验证码")])],1)],1)],1),n("div",{staticClass:"login_but"},[n("van-button",{staticStyle:{width:"100%",color:"#fff","font-size":"16px"},attrs:{type:"info"},on:{click:t.onLogin}},[t._v("登录")])],1)],1)},a=[],o=(n("d3b7"),n("ac1f"),n("5319"),n("ddb0"),n("96cf"),n("1da1")),i=n("c24f"),u=n("7bb1"),c={data:function(){return{user:{mobile:"13911111111",code:"246810"},isCountDownShow:!1}},methods:{onLogin:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,n,r,a,o,u,c,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this.user,t.next=3,this.$refs.myform.validate();case 3:if(n=t.sent,n){t.next=16;break}r=this.$refs.myform.errors,t.t0=regeneratorRuntime.keys(r);case 7:if((t.t1=t.t0()).done){t.next=15;break}if(a=t.t1.value,o=r[a],!o[0]){t.next=13;break}return this.$toast(o[0]),t.abrupt("return");case 13:t.next=7;break;case 15:return t.abrupt("return");case 16:return this.$toast.loading({duration:0,message:"登录中...",forbidClick:!0}),t.prev=17,t.next=20,Object(i["f"])(e);case 20:u=t.sent,c=u.data,this.$store.commit("setUser",c.data),this.$toast.success("登录成功"),s=this.$route.query.redirect||"/",this.$router.replace(s),t.next=31;break;case 28:t.prev=28,t.t2=t["catch"](17),this.$toast.fail("登录失败");case 31:case"end":return t.stop()}}),t,this,[[17,28]])})));function e(){return t.apply(this,arguments)}return e}(),getCode:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e=this.user.mobile,t.next=4,Object(u["d"])(e,"required|mobile",{name:"手机号"});case 4:if(n=t.sent,n.valid){t.next=8;break}return this.$toast(n.errors[0]),t.abrupt("return");case 8:return this.isCountDownShow=!0,t.next=11,Object(i["a"])(e);case 11:r=t.sent,console.log(r),t.next=20;break;case 15:t.prev=15,t.t0=t["catch"](0),console.log(t.t0),this.isCountDownShow=!1,this.$toast("请勿频繁操作");case 20:case"end":return t.stop()}}),t,this,[[0,15]])})));function e(){return t.apply(this,arguments)}return e}()}},s=c,l=(n("6401"),n("2877")),f=Object(l["a"])(s,r,a,!1,null,"6042d50e",null);e["default"]=f.exports},"9f7f":function(t,e,n){"use strict";var r=n("d039");function a(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=r((function(){var t=a("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=r((function(){var t=a("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},ac1f:function(t,e,n){"use strict";var r=n("23e7"),a=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},c24f:function(t,e,n){"use strict";n.d(e,"f",(function(){return a})),n.d(e,"a",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"d",(function(){return u})),n.d(e,"b",(function(){return c})),n.d(e,"g",(function(){return s})),n.d(e,"e",(function(){return l})),n.d(e,"h",(function(){return f})),n.d(e,"i",(function(){return d}));var r=n("b775"),a=function(t){return Object(r["a"])({method:"post",url:"/app/v1_0/authorizations",data:t})},o=function(t){return Object(r["a"])({url:"/app/v1_0/sms/codes/".concat(t)})},i=function(){return Object(r["a"])({url:"/app/v1_0/user"})},u=function(t){return Object(r["a"])({url:"/app/v1_0/users/".concat(t)})},c=function(t){return Object(r["a"])({method:"post",url:"/app/v1_0/user/followings",data:{target:t}})},s=function(t){return Object(r["a"])({method:"delete",url:"/app/v1_0/user/followings/".concat(t)})},l=function(){return Object(r["a"])({method:"GET",url:"/app/v1_0/user/profile"})},f=function(t){return Object(r["a"])({method:"PATCH",url:"/app/v1_0/user/photo",data:t})},d=function(t){return Object(r["a"])({method:"PATCH",url:"/app/v1_0/user/profile",data:t})}},d784:function(t,e,n){"use strict";var r=n("6eeb"),a=n("d039"),o=n("b622"),i=n("9263"),u=n("9112"),c=o("species"),s=!a((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),f=!a((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,d){var p=o(t),v=!a((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),h=v&&!a((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[c]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return e=!0,null},n[p](""),!e}));if(!v||!h||"replace"===t&&(!s||!l)||"split"===t&&!f){var b=/./[p],g=n(p,""[t],(function(t,e,n,r,a){return e.exec===i?v&&!a?{done:!0,value:b.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),{REPLACE_KEEPS_$0:l}),x=g[0],m=g[1];r(String.prototype,t,x),r(RegExp.prototype,p,2==e?function(t,e){return m.call(t,this,e)}:function(t){return m.call(t,this)})}d&&u(RegExp.prototype[p],"sham",!0)}},f1ca:function(t,e,n){}}]);
//# sourceMappingURL=chunk-31ad0714.d9d8aa72.js.map