(this["webpackJsonpluckyswap-exchange-v2"]=this["webpackJsonpluckyswap-exchange-v2"]||[]).push([[18],{1252:function(t,e,n){"use strict";n.d(e,"d",(function(){return x})),n.d(e,"c",(function(){return h})),n.d(e,"e",(function(){return m})),n.d(e,"b",(function(){return v}));var r=n(3),a=n.n(r),c=n(16),u=n(13),s=n(0),i=n(33),o=n(22),f=n.n(o),p=n(38),b=n(43),d=n(394),l=n(393),j=n(128),O=n(1260),x=function(){var t=Object(s.useState)(new f.a(0)),e=Object(u.a)(t,2),n=e[0],r=e[1],i=Object(j.a)().fastRefresh,o=Object(p.f)(Object(b.g)(),l);return Object(s.useEffect)((function(){o&&function(){var t=Object(c.a)(a.a.mark((function t(){var e;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(O.g)(o);case 2:e=t.sent,r(new f.a(e.toString()));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()}),[o,i]),n},h=function(){var t=Object(s.useState)(new f.a(0)),e=Object(u.a)(t,2),n=e[0],r=e[1],o=Object(s.useState)(!1),j=Object(u.a)(o,2),x=j[0],h=j[1],m=Object(i.d)().account,v=Object(p.f)(Object(b.g)(),l),w=Object(p.f)(Object(b.h)(),d),g=Object(s.useCallback)(Object(c.a)(a.a.mark((function t(){var e;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return h(!0),t.next=3,Object(O.f)(v,w,m);case 3:e=t.sent,r(e),h(!1);case 6:case"end":return t.stop()}}),t)}))),[m,v,w]);return Object(s.useEffect)((function(){m&&v&&w&&g()}),[m,g,v,w]),{claimLoading:x,claimAmount:n}},m=function(){var t=Object(s.useState)([0,0,0,0]),e=Object(u.a)(t,2),n=e[0],r=e[1],i=Object(p.f)(Object(b.g)(),l),o=Object(j.a)().fastRefresh;return Object(s.useEffect)((function(){i&&function(){var t=Object(c.a)(a.a.mark((function t(){var e;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(O.h)(i);case 2:e=t.sent,r(e);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()}),[o,i,r]),n},v=function(t){var e=Object(s.useState)(0),n=Object(u.a)(e,2),r=n[0],i=n[1],o=Object(p.f)(Object(b.g)(),l),f=Object(j.a)().fastRefresh;return Object(s.useEffect)((function(){o&&function(){var e=Object(c.a)(a.a.mark((function e(){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(O.c)(o,t);case 2:n=e.sent,i(n);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[o,t,f]),r};e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=Object(s.useState)([]),n=Object(u.a)(e,2),r=n[0],o=n[1],f=Object(i.d)(),x=f.account,h=Object(p.f)(Object(b.h)(),d),m=Object(p.f)(Object(b.g)(),l),v=Object(j.a)(),w=v.fastRefresh;return Object(s.useEffect)((function(){x&&m&&h&&function(){var e=Object(c.a)(a.a.mark((function e(){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(O.e)(m,h,x,t);case 2:n=e.sent,o(n);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[x,m,h,w,t]),r}},1260:function(t,e,n){"use strict";n.d(e,"i",(function(){return x})),n.d(e,"e",(function(){return h})),n.d(e,"j",(function(){return v})),n.d(e,"f",(function(){return w})),n.d(e,"g",(function(){return g})),n.d(e,"d",(function(){return y})),n.d(e,"a",(function(){return k})),n.d(e,"b",(function(){return S})),n.d(e,"c",(function(){return I})),n.d(e,"h",(function(){return E}));var r=n(3),a=n.n(r),c=n(16),u=n(22),s=n.n(u),i=n(181),o=n(107),f=n(409),p=n(394),b=n(393),d=n(73),l=n(43),j=n(95),O=function(){var t=Object(c.a)(a.a.mark((function t(e,n){var r,c,u,s,p,b,d,O,x,h;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(j.c)();case 2:if(r=t.sent,c=Object(o.a)(r),u=new c.eth.Contract(f,Object(l.j)(r)),s=new i.b(e),p=[],!(n.length>100)){t.next=16;break}b=0,d=a.a.mark((function t(){var e,r,c,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=n.slice(100*b,100*(b+1)),r=e.map((function(t){return[t[0].toLowerCase(),s.encodeFunctionData(t[1],t[2])]})),t.next=4,u.methods.aggregate(r).call();case 4:c=t.sent,i=c.returnData,b++,p=p.concat(i.map((function(t,n){return s.decodeFunctionResult(e[n][1],t)})));case 8:case"end":return t.stop()}}),t)}));case 10:if(!(b<n.length/100)){t.next=14;break}return t.delegateYield(d(),"t0",12);case 12:t.next=10;break;case 14:t.next=22;break;case 16:return O=n.map((function(t){return[t[0].toLowerCase(),s.encodeFunctionData(t[1],t[2])]})),t.next=19,u.methods.aggregate(O).call();case 19:x=t.sent,h=x.returnData,p=h.map((function(t,e){return s.decodeFunctionResult(n[e][1],t)}));case 22:return t.abrupt("return",p);case 23:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),x=function(){var t=Object(c.a)(a.a.mark((function t(e,n,r,c){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.abrupt("return",e.multiBuy(new s.a(n).times(new s.a(10).pow(18)).toString(),r).then((function(t){return t.transactionHash})));case 4:return t.prev=4,t.t0=t.catch(0),t.abrupt("return",console.error(t.t0));case 7:case"end":return t.stop()}}),t,null,[[0,4]])})));return function(e,n,r,a){return t.apply(this,arguments)}}(),h=function(){var t=Object(c.a)(a.a.mark((function t(e,n,r,u){var s,i,o,f,b,d,l,j,x,h;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.t0=u,t.t0){t.next=5;break}return t.next=4,e.issueIndex();case 4:t.t0=t.sent;case 5:return s=t.t0,t.next=8,n.balanceOf(r).catch((function(t){return console.log("length error : ",t)}));case 8:return i=t.sent,o=Array.apply(null,{length:i}).map((function(t,e){return[n.address,"tokenOfOwnerByIndex",[r,e]]})),t.next=12,O(p,o);case 12:return f=t.sent,b=f.map((function(t){return t.toString()})),d=b.map((function(t){return[n.address,"getLotteryIssueIndex",[t]]})),t.next=17,O(p,d);case 17:return l=t.sent,j=[],l.forEach(function(){var t=Object(c.a)(a.a.mark((function t(e,n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.toString()===s.toString()&&j.push(b[n]);case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),x=j.map((function(t){return[n.address,"getLotteryNumbers",[t]]})),t.next=23,O(p,x);case 23:return h=t.sent,t.abrupt("return",h);case 25:case"end":return t.stop()}}),t)})));return function(e,n,r,a){return t.apply(this,arguments)}}(),m=function(){var t=Object(c.a)(a.a.mark((function t(e,n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e.balanceOf(n).catch((function(t){return console.log("ticket amount : ",t)})));case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),v=function(){var t=Object(c.a)(a.a.mark((function t(e,n,r){var c,u,s,i,o,f,d,l,j,x;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.issueIndex();case 2:return t.next=4,m(n,r);case 4:return c=t.sent,u=Array.apply(null,{length:c}).map((function(t,e){return[n.address,"tokenOfOwnerByIndex",[r,e]]})),t.next=8,O(p,u);case 8:return s=t.sent,i=s.map((function(t){return t.toString()})),o=i.map((function(t){return[n.address,"getClaimStatus",[t]]})),t.next=13,O(p,o);case 13:return f=t.sent,d=i.filter((function(t,e){return!f[e][0]})),l=d.map((function(t){return[e.address,"getRewardView",[t]]})),t.next=18,O(b,l);case 18:return j=t.sent,x=[],j.forEach((function(t,e){t>0&&x.push(d[e])})),x.length>200&&(x=x.slice(0,200)),t.prev=22,t.abrupt("return",e.multiClaim(x));case 26:return t.prev=26,t.t0=t.catch(22),t.abrupt("return",console.error(t.t0));case 29:case"end":return t.stop()}}),t,null,[[22,26]])})));return function(e,n,r){return t.apply(this,arguments)}}(),w=function(){var t=Object(c.a)(a.a.mark((function t(e,n,r){var u,i,o,f,d,l,j,x,h,v,w,g,y,k;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.issueIndex();case 3:return u=t.sent,t.next=6,m(n,r);case 6:return i=t.sent,o=Array.apply(null,{length:i}).map((function(t,e){return[n.address,"tokenOfOwnerByIndex",[r,e]]})),t.next=10,O(p,o);case 10:return f=t.sent,d=f.map((function(t){return t.toString()})),l=d.map((function(t){return[n.address,"getLotteryIssueIndex",[t]]})),t.next=15,O(p,l);case 15:return j=t.sent,x=d.map((function(t){return[n.address,"getClaimStatus",[t]]})),t.next=19,O(p,x);case 19:return h=t.sent,t.next=22,S(e);case 22:return v=t.sent,w=[],j.forEach(function(){var t=Object(c.a)(a.a.mark((function t(e,n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(v||e.toString()!==u)&&(h[n][0]||w.push(d[n]));case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),g=w.map((function(t){return[e.address,"getRewardView",[t]]})),t.next=28,O(b,g);case 28:return y=t.sent,k=y.reduce((function(t,e){return s.a.sum(t,e)}),new s.a(0)),t.abrupt("return",k);case 33:t.prev=33,t.t0=t.catch(0),console.error(t.t0);case 36:return t.abrupt("return",new s.a(0));case 37:case"end":return t.stop()}}),t,null,[[0,33]])})));return function(e,n,r){return t.apply(this,arguments)}}(),g=function(){var t=Object(c.a)(a.a.mark((function t(e){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.issueIndex();case 2:return n=t.sent,t.abrupt("return",e.getTotalRewards(n));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),y=function(){var t=Object(c.a)(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e.maxNumber());case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),k=function(){var t=Object(c.a)(a.a.mark((function t(e){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.issueIndex();case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),S=function(){var t=Object(c.a)(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e.drawed());case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),I=function(){var t=Object(c.a)(a.a.mark((function t(e,n){var r,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.issueIndex();case 2:return r=t.sent,t.next=5,e.drawed();case 5:return t.sent||(r-=1),t.prev=7,t.next=10,e.historyAmount(r,5-n);case 10:return c=t.sent,t.abrupt("return",new s.a(c.toString()).div(new s.a(10).pow(18)).div(d.f).toNumber());case 14:t.prev=14,t.t0=t.catch(7),console.error(t.t0);case 17:return t.abrupt("return",0);case 18:case"end":return t.stop()}}),t,null,[[7,14]])})));return function(e,n){return t.apply(this,arguments)}}(),E=function(){var t=Object(c.a)(a.a.mark((function t(e){var n,r,c,u,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.issueIndex();case 2:return n=t.sent,r=[],t.next=6,e.drawed();case 6:if((c=t.sent)||0!==parseInt(n,10)){t.next=9;break}return t.abrupt("return",[0,0,0,0]);case 9:if(c){t.next=22;break}u=0;case 11:if(!(u<4)){t.next=20;break}return t.t0=r,t.next=15,e.historyNumbers(n-1,u);case 15:t.t1=+t.sent.toString(),t.t0.push.call(t.t0,t.t1);case 17:u++,t.next=11;break;case 20:t.next=32;break;case 22:s=0;case 23:if(!(s<4)){t.next=32;break}return t.t2=r,t.next=27,e.winningNumbers(s);case 27:t.t3=+t.sent.toString(),t.t2.push.call(t.t2,t.t3);case 29:s++,t.next=23;break;case 32:return t.abrupt("return",r);case 33:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},1725:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return S}));var r,a,c,u,s=n(3),i=n.n(s),o=n(16),f=n(13),p=n(9),b=n(0),d=n(2),l=n(1260),j=n(90),O=n(185),x=n(38),h=n(43),m=n(393),v=n(33),w=n(1252),g=n(245),y=n(1),k=(d.default.div(r||(r=Object(p.a)(["\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 32px;\n"]))),d.default.div(a||(a=Object(p.a)(["\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-gap: 40px;\n  margin-bottom: 30px;\n\n  @media (min-width: 991px) {\n    grid-template-columns: 1fr 1fr;\n  }\n"]))),d.default.div(c||(c=Object(p.a)(["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-gap: 40px;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 1200px;\n  margin-bottom: 30px;\n"]))),d.default.div(u||(u=Object(p.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  img {\n    width: 100%;\n    max-width: 750px;\n  }\n"])))),S=function(){var t=Object(x.f)(Object(h.g)(),m),e=(Object(j.a)(),Object(b.useState)(0)),n=Object(f.a)(e,2),r=(n[0],n[1],Object(b.useState)([])),a=Object(f.a)(r,2),c=(a[0],a[1]),u=Object(b.useState)(!1),s=Object(f.a)(u,2),p=(s[0],s[1]),d=Object(b.useState)(0),S=Object(f.a)(d,2),I=(S[0],S[1]),E=Object(b.useState)(1),R=Object(f.a)(E,2),C=(R[0],R[1]),A=(Object(v.d)().account,Object(w.c)().claimAmount);Object(g.a)(A);Object(b.useEffect)((function(){fetch("https://api.pancakeswap.com/api/lotteryHistory").then((function(t){return t.json()})).then((function(t){return c(t)})).catch((function(){p(!0)}))}),[]),Object(b.useEffect)((function(){t&&function(){var e=Object(o.a)(i.a.mark((function e(){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(l.a)(t);case 2:n=e.sent,r=n-1,I(n),C(r);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[t]);return Object(y.jsx)(y.Fragment,{children:Object(y.jsx)(O.a,{children:Object(y.jsx)(k,{children:Object(y.jsx)("img",{src:"../images/coming-soon-lot.png",alt:""})})})})}}}]);
//# sourceMappingURL=18.1c957eaa.chunk.js.map