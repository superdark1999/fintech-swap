(this["webpackJsonpluckyswap-exchange-v2"]=this["webpackJsonpluckyswap-exchange-v2"]||[]).push([[1],{1099:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return i}));var r=n(37),a=n.n(r),o=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:18,n=new a.a(t).dividedBy(new a.a(10).pow(e));return n.toNumber()},i=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:18;return t.dividedBy(new a.a(10).pow(e)).toFixed()}},1111:function(t,e,n){"use strict";var r=n(12),a=(n(0),n(5)),o=n(218),i=n(87),u=n(1);e.a=function(t){var e=Object(i.a)(),n=Object(o.a)(),s=n.login,c=n.logout,f=Object(a.Jb)(s,c).onPresentConnectModal;return Object(u.jsx)("div",{className:"custom-btn",children:Object(u.jsx)(a.l,Object(r.a)(Object(r.a)({onClick:f},t),{},{children:e(292,"Unlock Wallet")}))})}},1120:function(t,e,n){"use strict";n.d(e,"c",(function(){return a})),n.d(e,"d",(function(){return o})),n.d(e,"b",(function(){return i})),n.d(e,"a",(function(){return s})),n.d(e,"e",(function(){return c})),n.d(e,"f",(function(){return f}));var r=n(1263);r.a.config({EXPONENTIAL_AT:1e3,DECIMAL_PLACES:80});var a=3,o=new r.a(40),i=new r.a(60/a*60*24*365),u="https://exchange.finance",s="".concat(u,"/#/add"),c=("".concat(u,"/#/pool"),50),f=1},1168:function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"i",(function(){return f})),n.d(e,"d",(function(){return p})),n.d(e,"e",(function(){return d})),n.d(e,"j",(function(){return l})),n.d(e,"f",(function(){return m})),n.d(e,"c",(function(){return h})),n.d(e,"b",(function(){return b})),n.d(e,"g",(function(){return v})),n.d(e,"h",(function(){return w}));var r=n(4),a=n.n(r),o=n(19),i=n(37),u=n.n(i),s=n(1246),c=function(){var t=Object(o.a)(a.a.mark((function t(e,n,r){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e.methods.approve(n.options.address,s.a.constants.MaxUint256).send({from:r}));case 1:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),f=function(){var t=Object(o.a)(a.a.mark((function t(e,n,r,o){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==n){t.next=2;break}return t.abrupt("return",e.methods.enterStaking(new u.a(r).times(new u.a(10).pow(18)).toString()).send({from:o,gas:2e5}).on("transactionHash",(function(t){return t.transactionHash})));case 2:return t.abrupt("return",e.methods.deposit(n,new u.a(r).times(new u.a(10).pow(18)).toString()).send({from:o,gas:2e5}).on("transactionHash",(function(t){return t.transactionHash})));case 3:case"end":return t.stop()}}),t)})));return function(e,n,r,a){return t.apply(this,arguments)}}(),p=function(){var t=Object(o.a)(a.a.mark((function t(e,n){var r,o,i=arguments;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=i.length>2&&void 0!==i[2]?i[2]:18,o=i.length>3?i[3]:void 0,t.abrupt("return",e.methods.deposit(new u.a(n).times(new u.a(10).pow(r)).toString()).send({from:o,gas:2e5}).on("transactionHash",(function(t){return t.transactionHash})));case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),d=function(){var t=Object(o.a)(a.a.mark((function t(e,n,r){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e.methods.deposit().send({from:r,gas:2e5,value:new u.a(n).times(new u.a(10).pow(18)).toString()}).on("transactionHash",(function(t){return t.transactionHash})));case 1:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),l=function(){var t=Object(o.a)(a.a.mark((function t(e,n,r,o){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==n){t.next=2;break}return t.abrupt("return",e.methods.leaveStaking(new u.a(r).times(new u.a(10).pow(18)).toString()).send({from:o,gas:2e5}).on("transactionHash",(function(t){return t.transactionHash})));case 2:return t.abrupt("return",e.methods.withdraw(n,new u.a(r).times(new u.a(10).pow(18)).toString()).send({from:o,gas:2e5}).on("transactionHash",(function(t){return t.transactionHash})));case 3:case"end":return t.stop()}}),t)})));return function(e,n,r,a){return t.apply(this,arguments)}}(),m=function(){var t=Object(o.a)(a.a.mark((function t(e,n){var r,o,i=arguments;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=i.length>2&&void 0!==i[2]?i[2]:18,o=i.length>3?i[3]:void 0,"0x3B9B74f48E89Ebd8b45a53444327013a2308A9BC"!==e.options.address){t.next=4;break}return t.abrupt("return",e.methods.emergencyWithdraw().send({from:o}).on("transactionHash",(function(t){return t.transactionHash})));case 4:if("0xBb2B66a2c7C2fFFB06EA60BeaD69741b3f5BF831"!==e.options.address){t.next=6;break}return t.abrupt("return",e.methods.emergencyWithdraw().send({from:o}).on("transactionHash",(function(t){return t.transactionHash})));case 6:if("0x453a75908fb5a36d482d5f8fe88eca836f32ead5"!==e.options.address){t.next=8;break}return t.abrupt("return",e.methods.emergencyWithdraw().send({from:o}).on("transactionHash",(function(t){return t.transactionHash})));case 8:return t.abrupt("return",e.methods.withdraw(new u.a(n).times(new u.a(10).pow(r)).toString()).send({from:o,gas:2e5}).on("transactionHash",(function(t){return t.transactionHash})));case 9:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),h=function(){var t=Object(o.a)(a.a.mark((function t(e,n,r){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e.methods.emergencyWithdraw().send({from:r}).on("transactionHash",(function(t){return t.transactionHash})));case 1:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),b=function(){var t=Object(o.a)(a.a.mark((function t(e,n,r){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==n){t.next=2;break}return t.abrupt("return",e.methods.leaveStaking("0").send({from:r,gas:2e5}).on("transactionHash",(function(t){return t.transactionHash})));case 2:return t.abrupt("return",e.methods.deposit(n,"0").send({from:r,gas:2e5}).on("transactionHash",(function(t){return t.transactionHash})));case 3:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),v=function(){var t=Object(o.a)(a.a.mark((function t(e,n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e.methods.deposit("0").send({from:n,gas:2e5}).on("transactionHash",(function(t){return t.transactionHash})));case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),w=function(){var t=Object(o.a)(a.a.mark((function t(e,n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e.methods.deposit().send({from:n,gas:2e5,value:new u.a(0)}).on("transactionHash",(function(t){return t.transactionHash})));case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},1187:function(t,e,n){"use strict";n.d(e,"a",(function(){return h}));var r,a,o,i=n(9),u=n(0),s=n.n(u),c=n(2),f=n(1),p=c.default.div(r||(r=Object(i.a)(["\n  height: ","px;\n  width: ","px;\n"])),(function(t){return t.size}),(function(t){return t.size})),d=function(t){var e,n=t.size,r=void 0===n?"md":n,a=Object(u.useContext)(c.ThemeContext).spacing;switch(r){case"lg":e=a[6];break;case"sm":e=a[2];break;case"md":default:e=a[4]}return Object(f.jsx)(p,{size:e})},l=c.default.div(a||(a=Object(i.a)(["\n  align-items: center;\n  background-color: ","00;\n  display: flex;\n  margin: 0;\n  padding: ","px 0;\n"])),(function(t){return t.theme.colors.primaryDark}),(function(t){return t.theme.spacing[4]})),m=c.default.div(o||(o=Object(i.a)(["\n  flex: 1;\n"]))),h=function(t){var e=t.children,n=s.a.Children.toArray(e).length;return Object(f.jsx)(l,{children:s.a.Children.map(e,(function(t,e){return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(m,{children:t}),e<n-1&&Object(f.jsx)(d,{})]})}))})}},1198:function(t,e,n){"use strict";var r,a=n(9),o=(n(0),n(2)),i=n(5),u=n(87),s=n(1),c=o.default.div(r||(r=Object(a.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n\n  svg {\n    fill: ",";\n  }\n"])),(function(t){return t.theme.colors.primary})),f=function(t){var e=t.onClick,n=t.expanded,r=Object(u.a)();return Object(s.jsxs)(c,{"aria-label":"Hide or show expandable content",role:"button",onClick:function(){return e()},children:[Object(s.jsx)(i.tb,{color:"primary",bold:!0,children:n?r(1066,"Hide"):r(658,"Details")}),n?Object(s.jsx)(i.A,{}):Object(s.jsx)(i.x,{})]})};f.defaultProps={expanded:!1},e.a=f},1264:function(t,e,n){"use strict";n.d(e,"a",(function(){return d})),n.d(e,"b",(function(){return l}));var r=n(4),a=n.n(r),o=n(19),i=n(0),u=n(44),s=(n(1246),n(113)),c=n(142),f=n(1168),p=n(51),d=function(t){var e=Object(s.b)(),n=Object(u.d)().account,r=Object(p.n)();return{onApprove:Object(i.useCallback)(Object(o.a)(a.a.mark((function o(){var i;return a.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Object(f.a)(t,r,n);case 3:return i=a.sent,e(Object(c.b)(n)),a.abrupt("return",i);case 8:return a.prev=8,a.t0=a.catch(0),a.abrupt("return",!1);case 11:case"end":return a.stop()}}),o,null,[[0,8]])}))),[n,e,t,r])}},l=function(){var t=Object(u.d)().account,e=Object(p.d)(),n=Object(p.l)();return{onApprove:Object(i.useCallback)(Object(o.a)(a.a.mark((function r(){var o;return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,Object(f.a)(e,n,t);case 3:return o=r.sent,r.abrupt("return",o);case 7:return r.prev=7,r.t0=r.catch(0),r.abrupt("return",!1);case 10:case"end":return r.stop()}}),r,null,[[0,7]])}))),[t,e,n])}}},1265:function(t,e,n){"use strict";function r(t){return t&&"object"===typeof t&&"default"in t?t.default:t}Object.defineProperty(e,"__esModule",{value:!0});var a=r(n(10)),o=n(0),i=r(o),u=r(n(1331)),s=r(n(1332));function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function m(t,e){return(m=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function b(t,e){return!e||"object"!==typeof e&&"function"!==typeof e?h(t):e}function v(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t))&&"[object Arguments]"!==Object.prototype.toString.call(t))return;var n=[],r=!0,a=!1,o=void 0;try{for(var i,u=t[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(s){a=!0,o=s}finally{try{r||null==u.return||u.return()}finally{if(a)throw o}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var w=function(t,e){var n=e.decimal,r=e.decimals,a=e.duration,o=e.easingFn,i=e.end,u=e.formattingFn,c=e.prefix,f=e.separator,p=e.start,d=e.suffix,l=e.useEasing;return new s(t,p,i,r,a,{decimal:n,easingFn:o,formattingFn:u,separator:f,prefix:c,suffix:d,useEasing:l,useGrouping:!!f})},g=function(t){function e(){var t,n;c(this,e);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return p(h(n=b(this,(t=l(e)).call.apply(t,[this].concat(a)))),"createInstance",(function(){return"function"===typeof n.props.children&&u(n.containerRef.current&&(n.containerRef.current instanceof HTMLElement||n.containerRef.current instanceof SVGTextElement||n.containerRef.current instanceof SVGTSpanElement),'Couldn\'t find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an HTMLElement, eg. <span ref={containerRef} />.'),w(n.containerRef.current,n.props)})),p(h(n),"pauseResume",(function(){var t=h(n),e=t.reset,r=t.restart,a=t.update,o=n.props.onPauseResume;n.instance.pauseResume(),o({reset:e,start:r,update:a})})),p(h(n),"reset",(function(){var t=h(n),e=t.pauseResume,r=t.restart,a=t.update,o=n.props.onReset;n.instance.reset(),o({pauseResume:e,start:r,update:a})})),p(h(n),"restart",(function(){n.reset(),n.start()})),p(h(n),"start",(function(){var t=h(n),e=t.pauseResume,r=t.reset,a=t.restart,o=t.update,i=n.props,u=i.delay,s=i.onEnd,c=i.onStart,f=function(){return n.instance.start((function(){return s({pauseResume:e,reset:r,start:a,update:o})}))};u>0?n.timeoutId=setTimeout(f,1e3*u):f(),c({pauseResume:e,reset:r,update:o})})),p(h(n),"update",(function(t){var e=h(n),r=e.pauseResume,a=e.reset,o=e.restart,i=n.props.onUpdate;n.instance.update(t),i({pauseResume:r,reset:a,start:o})})),p(h(n),"containerRef",i.createRef()),n}var n,r,a;return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&m(t,e)}(e,t),n=e,(r=[{key:"componentDidMount",value:function(){var t=this.props,e=t.children,n=t.delay;this.instance=this.createInstance(),"function"===typeof e&&0!==n||this.start()}},{key:"shouldComponentUpdate",value:function(t){var e=this.props,n=e.end,r=e.start,a=e.suffix,o=e.prefix,i=e.redraw,u=e.duration,s=e.separator,c=e.decimals,f=e.decimal;return u!==t.duration||n!==t.end||r!==t.start||a!==t.suffix||o!==t.prefix||s!==t.separator||c!==t.decimals||f!==t.decimal||i}},{key:"componentDidUpdate",value:function(t){var e=this.props,n=e.end,r=e.start,a=e.suffix,o=e.prefix,i=e.duration,u=e.separator,s=e.decimals,c=e.decimal,f=e.preserveValue;i===t.duration&&r===t.start&&a===t.suffix&&o===t.prefix&&u===t.separator&&s===t.decimals&&c===t.decimal||(this.instance.reset(),this.instance=this.createInstance(),this.start()),n!==t.end&&(f||this.instance.reset(),this.instance.update(n))}},{key:"componentWillUnmount",value:function(){this.timeoutId&&clearTimeout(this.timeoutId),this.instance.reset()}},{key:"render",value:function(){var t=this.props,e=t.children,n=t.className,r=t.style,a=this.containerRef,o=this.pauseResume,u=this.reset,s=this.restart,c=this.update;return"function"===typeof e?e({countUpRef:a,pauseResume:o,reset:u,start:s,update:c}):i.createElement("span",{className:n,ref:a,style:r})}}])&&f(n.prototype,r),a&&f(n,a),e}(o.Component);p(g,"propTypes",{decimal:a.string,decimals:a.number,delay:a.number,easingFn:a.func,end:a.number.isRequired,formattingFn:a.func,onEnd:a.func,onStart:a.func,prefix:a.string,redraw:a.bool,separator:a.string,start:a.number,startOnMount:a.bool,suffix:a.string,style:a.object,useEasing:a.bool,preserveValue:a.bool}),p(g,"defaultProps",{decimal:".",decimals:0,delay:null,duration:null,easingFn:null,formattingFn:null,onEnd:function(){},onPauseResume:function(){},onReset:function(){},onStart:function(){},onUpdate:function(){},prefix:"",redraw:!1,separator:"",start:0,startOnMount:!0,suffix:"",style:void 0,useEasing:!0,preserveValue:!1});var y={innerHTML:null};e.default=g,e.useCountUp=function(t){var e=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){p(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},g.defaultProps,{},t),n=e.start,r=e.formattingFn,a=v(o.useState("function"===typeof r?r(n):n),2),i=a[0],u=a[1],s=o.useRef(null),c=function(){var t=s.current;if(null!==t)return t;var n=function(){var t=w(y,e),n=t.options.formattingFn;return t.options.formattingFn=function(){var t=n.apply(void 0,arguments);u(t)},t}();return s.current=n,n},f=function(){var t=e.onReset;c().reset(),t({pauseResume:m,start:l,update:h})},l=function t(){var n=e.onStart,r=e.onEnd;c().reset(),c().start((function(){r({pauseResume:m,reset:f,start:t,update:h})})),n({pauseResume:m,reset:f,update:h})},m=function(){var t=e.onPauseResume;c().pauseResume(),t({reset:f,start:l,update:h})},h=function(t){var n=e.onUpdate;c().update(t),n({pauseResume:m,reset:f,start:l})};return o.useEffect((function(){var t=e.delay,n=e.onStart,r=e.onEnd;if(e.startOnMount)var a=setTimeout((function(){n({pauseResume:m,reset:f,update:h}),c().start((function(){clearTimeout(a),r({pauseResume:m,reset:f,start:l,update:h})}))}),1e3*t);return f}),[]),{countUp:i,start:l,pauseResume:m,reset:f,update:h}}},1331:function(t,e,n){"use strict";var r=function(){};t.exports=r},1332:function(t,e,n){var r,a;void 0===(a="function"===typeof(r=function(t,e,n){return function(t,e,n,r,a,o){function i(t){var e,n,r,a,o,i,u=t<0;if(t=Math.abs(t).toFixed(c.decimals),n=(e=(t+="").split("."))[0],r=e.length>1?c.options.decimal+e[1]:"",c.options.useGrouping){for(a="",o=0,i=n.length;o<i;++o)0!==o&&o%3===0&&(a=c.options.separator+a),a=n[i-o-1]+a;n=a}return c.options.numerals.length&&(n=n.replace(/[0-9]/g,(function(t){return c.options.numerals[+t]})),r=r.replace(/[0-9]/g,(function(t){return c.options.numerals[+t]}))),(u?"-":"")+c.options.prefix+n+r+c.options.suffix}function u(t,e,n,r){return n*(1-Math.pow(2,-10*t/r))*1024/1023+e}function s(t){return"number"==typeof t&&!isNaN(t)}var c=this;if(c.version=function(){return"1.9.3"},c.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:u,formattingFn:i,prefix:"",suffix:"",numerals:[]},o&&"object"==typeof o)for(var f in c.options)o.hasOwnProperty(f)&&null!==o[f]&&(c.options[f]=o[f]);""===c.options.separator?c.options.useGrouping=!1:c.options.separator=""+c.options.separator;for(var p=0,d=["webkit","moz","ms","o"],l=0;l<d.length&&!window.requestAnimationFrame;++l)window.requestAnimationFrame=window[d[l]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[d[l]+"CancelAnimationFrame"]||window[d[l]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,e){var n=(new Date).getTime(),r=Math.max(0,16-(n-p)),a=window.setTimeout((function(){t(n+r)}),r);return p=n+r,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)}),c.initialize=function(){return!!c.initialized||(c.error="",c.d="string"==typeof t?document.getElementById(t):t,c.d?(c.startVal=Number(e),c.endVal=Number(n),s(c.startVal)&&s(c.endVal)?(c.decimals=Math.max(0,r||0),c.dec=Math.pow(10,c.decimals),c.duration=1e3*Number(a)||2e3,c.countDown=c.startVal>c.endVal,c.frameVal=c.startVal,c.initialized=!0,!0):(c.error="[CountUp] startVal ("+e+") or endVal ("+n+") is not a number",!1)):(c.error="[CountUp] target is null or undefined",!1))},c.printValue=function(t){var e=c.options.formattingFn(t);"INPUT"===c.d.tagName?this.d.value=e:"text"===c.d.tagName||"tspan"===c.d.tagName?this.d.textContent=e:this.d.innerHTML=e},c.count=function(t){c.startTime||(c.startTime=t),c.timestamp=t;var e=t-c.startTime;c.remaining=c.duration-e,c.options.useEasing?c.countDown?c.frameVal=c.startVal-c.options.easingFn(e,0,c.startVal-c.endVal,c.duration):c.frameVal=c.options.easingFn(e,c.startVal,c.endVal-c.startVal,c.duration):c.countDown?c.frameVal=c.startVal-(c.startVal-c.endVal)*(e/c.duration):c.frameVal=c.startVal+(c.endVal-c.startVal)*(e/c.duration),c.countDown?c.frameVal=c.frameVal<c.endVal?c.endVal:c.frameVal:c.frameVal=c.frameVal>c.endVal?c.endVal:c.frameVal,c.frameVal=Math.round(c.frameVal*c.dec)/c.dec,c.printValue(c.frameVal),e<c.duration?c.rAF=requestAnimationFrame(c.count):c.callback&&c.callback()},c.start=function(t){c.initialize()&&(c.callback=t,c.rAF=requestAnimationFrame(c.count))},c.pauseResume=function(){c.paused?(c.paused=!1,delete c.startTime,c.duration=c.remaining,c.startVal=c.frameVal,requestAnimationFrame(c.count)):(c.paused=!0,cancelAnimationFrame(c.rAF))},c.reset=function(){c.paused=!1,delete c.startTime,c.initialized=!1,c.initialize()&&(cancelAnimationFrame(c.rAF),c.printValue(c.startVal))},c.update=function(t){if(c.initialize()){if(!s(t=Number(t)))return void(c.error="[CountUp] update() - new endVal is not a number: "+t);c.error="",t!==c.frameVal&&(cancelAnimationFrame(c.rAF),c.paused=!1,delete c.startTime,c.startVal=c.frameVal,c.endVal=t,c.countDown=c.startVal>c.endVal,c.rAF=requestAnimationFrame(c.count))}},c.initialize()&&c.printValue(c.startVal)}})?r.call(e,n,e,t):r)||(t.exports=a)}}]);
//# sourceMappingURL=1.283760e6.chunk.js.map