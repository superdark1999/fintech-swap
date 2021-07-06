(this["webpackJsonpluckyswap-exchange-v2"]=this["webpackJsonpluckyswap-exchange-v2"]||[]).push([[19],{1864:function(e,n,t){"use strict";t.r(n);var r,a,i,o,c,s,l,p=t(16),d=t(0),u=t(73),h=t(403),b=t(10),g=t(3),x=t(255),f=t(1),m=g.default.div(r||(r=Object(b.a)(["\n  /* display: flex;\n  justify-content: center;\n  align-items: center; */\n  margin-bottom: 39px;\n\n  .custom-bt {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    flex-direction: row;\n\n    @media (max-width: 768px) {\n      flex-direction: column;\n    }\n\n    a {\n      padding: 25px;\n\n      svg {\n        width: 40px;\n        height: 40px;\n      }\n    }\n  }\n\n  select {\n    padding: 12px 56px 12px 14px;\n    margin: 0 7px;\n    background-color: #4a4873;\n    font-size: 21px;\n    color: #dcbd6b;\n    border-radius: 0.5rem;\n    cursor: pointer;\n    border: none;\n    appearance: none;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    background-image: url('../images/rocket.png');\n    background-repeat: no-repeat;\n    background-size: 1.5rem;\n    background-position: right 1.2rem top 50%;\n    width: 100%;\n    max-width: 215px;\n\n    @media (max-width: 768px) {\n      width: 100%;\n      max-width: 100%;\n      margin-bottom: 15px;\n    }\n\n    &.list-options {\n      background-image: url('../images/plannet.svg');\n    }\n  }\n\n  select:hover,\n  select:focus {\n    background-size: 2rem;\n    outline: none;\n  }\n\n  form {\n    box-sizing: border-box;\n    display: flex;\n    margin-left: 10px;\n    position: relative;\n\n    @media (max-width: 768px) {\n      margin-left: 0;\n      width: 100%;\n    }\n\n    input {\n      text-indent: 10px;\n      height: 40px;\n      width: 175px;\n      border: 1px transparent solid;\n      border-top-left-radius: 10px;\n      border-bottom-left-radius: 10px;\n      outline: none;\n\n      @media (max-width: 768px) {\n        width: 100%;\n      }\n    }\n\n    img {\n      width: 20px;\n      height: 20px;\n    }\n\n    button {\n      background-color: #f5c606;\n      height: 40px;\n      width: 40px;\n      border: 1px transparent solid;\n      border-top-right-radius: 10px;\n      border-bottom-right-radius: 10px;\n\n      @media (max-width: 768px) {\n        width: 50px;\n        position: absolute;\n        top: 0;\n        right: 0;\n      }\n\n      &:hover {\n        background-color: #fbcf1a;\n        height: 40px;\n        width: 40px;\n        border: 1px transparent solid;\n      }\n    }\n  }\n"]))),j=g.default.div(a||(a=Object(b.a)(["\n  display: flex;\n  align-items: center;\n\n  @media (max-width: 768px) {\n    width: 100%;\n    flex-direction: column;\n  }\n"]))),O=function(){var e=Object(u.i)(),n=(e.url,e.isExact,Object(x.a)()),t=Object(p.a)(n,2),r=t[0],a=t[1];return Object(f.jsx)(m,{children:Object(f.jsx)("div",{className:"custom-bt",children:Object(f.jsxs)(j,{children:[Object(f.jsxs)("select",{children:[Object(f.jsx)("option",{children:"All"}),Object(f.jsx)("option",{children:"BEP-20"}),Object(f.jsx)("option",{children:"NFT"})]}),Object(f.jsx)("select",{className:"list-options",value:r.statusCombo,onChange:function(e){return a.filterLaunchWithStatus(e.target.value)},children:r.status.map((function(e){return Object(f.jsx)("option",{value:e.key,children:e.name},e.key)}))}),Object(f.jsxs)("form",{children:[Object(f.jsx)("input",{type:"search",value:r.keySearch,placeholder:"search",onChange:function(e){return a.changeKeySearch(e.target.value)}}),Object(f.jsx)("button",{type:"submit","aria-label":"Save",value:"search",children:Object(f.jsx)("img",{src:"../images/icon-search.svg",alt:""})})]})]})})})},v=t(7),k=t(89),y=(Object(g.default)(v.K).attrs({as:"h1",size:"xl"})(i||(i=Object(b.a)(["\n  color: ",";\n  margin-bottom: 24px;\n"])),(function(e){return e.theme.colors.secondary})),Object(g.default)(v.sb)(o||(o=Object(b.a)(["\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 600;\n"])))),w=g.default.div(c||(c=Object(b.a)(["\n  display: flex;\n  align-items: center;\n  background: url('../images/banner-mobile.png');\n  background-repeat: no-repeat;\n  background-size: cover;\n  width: 100%;\n  height: 350px;\n  padding-bottom: 40px;\n  padding-top: 40px;\n  margin-bottom: 32px;\n\n  @media (min-width: 768px) {\n    background: url('../images/banner-tablet.png');\n    background-repeat: no-repeat;\n    background-size: cover;\n }\n\n @media (min-width: 991px) {\n    background: url('../images/large-pc.png');\n    background-repeat: no-repeat;\n    background-size: cover;\n  }\n"]))),C=g.default.h1(s||(s=Object(b.a)(["\n  color: #fff;\n  font-weight: 600;\n  line-height: 1.1;\n  font-size: 40px;\n  margin-bottom: 24px;\n"]))),z=g.default.div(l||(l=Object(b.a)(["\n  padding-left: 50px;\n\n  @media (min-width: 768px) {\n    padding-left: 100px;\n  }\n\n  @media (min-width: 991px) {\n    padding-left: 120px;\n  }\n"]))),P=function(){var e=Object(k.a)();return Object(f.jsx)(w,{children:Object(f.jsxs)(z,{children:[Object(f.jsx)(C,{children:"Luckyswap Launchpad"}),Object(f.jsx)(y,{children:e(502,"Finding the best investment opportunities for you")})]})})},E=t(54),N=t(57),S=t(17),L=t(398),W=t(399),D=t(45),A=t(400),F=t(401),I=t(35),M=t.n(I),B=t(1262),R=t(1478),_={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"}}]},name:"check",theme:"outlined"},q=t(1231),T=function(e,n){return d.createElement(q.a,Object.assign({},e,{ref:n,icon:_}))};T.displayName="CheckOutlined";var H=d.forwardRef(T),J=t(1479),K=t(1480),V=t(1180),G=t(327),Q=t(1261),U=t(1383);function X(e){return!e||e<0?0:e>100?100:e}function Y(e){var n=e.success,t=e.successPercent;return n&&"progress"in n&&(Object(Q.a)(!1,"Progress","`success.progress` is deprecated. Please use `success.percent` instead."),t=n.progress),n&&"percent"in n&&(t=n.percent),t}var Z=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)n.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(t[r[a]]=e[r[a]])}return t},$=function(e,n){var t=e.from,r=void 0===t?U.b.blue:t,a=e.to,i=void 0===a?U.b.blue:a,o=e.direction,c=void 0===o?"rtl"===n?"to left":"to right":o,s=Z(e,["from","to","direction"]);if(0!==Object.keys(s).length){var l=function(e){var n=[];return Object.keys(e).forEach((function(t){var r=parseFloat(t.replace(/%/g,""));isNaN(r)||n.push({key:r,value:e[t]})})),(n=n.sort((function(e,n){return e.key-n.key}))).map((function(e){var n=e.key,t=e.value;return"".concat(t," ").concat(n,"%")})).join(", ")}(s);return{backgroundImage:"linear-gradient(".concat(c,", ").concat(l,")")}}return{backgroundImage:"linear-gradient(".concat(c,", ").concat(r,", ").concat(i,")")}},ee=function(e){var n=e.prefixCls,t=e.direction,r=e.percent,a=e.strokeWidth,i=e.size,o=e.strokeColor,c=e.strokeLinecap,s=e.children,l=e.trailColor,p=e.success,u=o&&"string"!==typeof o?$(o,t):{background:o},h=l?{backgroundColor:l}:void 0,b=Object(S.a)({width:"".concat(X(r),"%"),height:a||("small"===i?6:8),borderRadius:"square"===c?0:""},u),g=Y(e),x={width:"".concat(X(g),"%"),height:a||("small"===i?6:8),borderRadius:"square"===c?0:"",backgroundColor:null===p||void 0===p?void 0:p.strokeColor},f=void 0!==g?d.createElement("div",{className:"".concat(n,"-success-bg"),style:x}):null;return d.createElement(d.Fragment,null,d.createElement("div",{className:"".concat(n,"-outer")},d.createElement("div",{className:"".concat(n,"-inner"),style:h},d.createElement("div",{className:"".concat(n,"-bg"),style:b}),f)),s)},ne=t(209),te=t(1225),re={className:"",percent:0,prefixCls:"rc-progress",strokeColor:"#2db7f5",strokeLinecap:"round",strokeWidth:1,style:{},trailColor:"#D9D9D9",trailWidth:1},ae=function(e){var n=e.map((function(){return Object(d.useRef)()})),t=Object(d.useRef)(null);return Object(d.useEffect)((function(){var e=Date.now(),r=!1;Object.keys(n).forEach((function(a){var i=n[a].current;if(i){r=!0;var o=i.style;o.transitionDuration=".3s, .3s, .3s, .06s",t.current&&e-t.current<100&&(o.transitionDuration="0s, 0s")}})),r&&(t.current=Date.now())})),[n]},ie=function(e){var n=e.className,t=e.percent,r=e.prefixCls,a=e.strokeColor,i=e.strokeLinecap,o=e.strokeWidth,c=e.style,s=e.trailColor,l=e.trailWidth,p=e.transition,u=Object(te.a)(e,["className","percent","prefixCls","strokeColor","strokeLinecap","strokeWidth","style","trailColor","trailWidth","transition"]);delete u.gapPosition;var h=Array.isArray(t)?t:[t],b=Array.isArray(a)?a:[a],g=ae(h),x=Object(ne.a)(g,1)[0],f=o/2,m=100-o/2,j="M ".concat("round"===i?f:0,",").concat(f,"\n         L ").concat("round"===i?m:100,",").concat(f),O="0 0 100 ".concat(o),v=0;return d.createElement("svg",Object(S.a)({className:M()("".concat(r,"-line"),n),viewBox:O,preserveAspectRatio:"none",style:c},u),d.createElement("path",{className:"".concat(r,"-line-trail"),d:j,strokeLinecap:i,stroke:s,strokeWidth:l||o,fillOpacity:"0"}),h.map((function(e,n){var t=1;switch(i){case"round":t=1-o/100;break;case"square":t=1-o/2/100;break;default:t=1}var a={strokeDasharray:"".concat(e*t,"px, 100px"),strokeDashoffset:"-".concat(v,"px"),transition:p||"stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear"},c=b[n]||b[b.length-1];return v+=e,d.createElement("path",{key:n,className:"".concat(r,"-line-path"),d:j,strokeLinecap:i,stroke:c,strokeWidth:o,fillOpacity:"0",ref:x[n],style:a})})))};ie.defaultProps=re,ie.displayName="Line";var oe=0;function ce(e){return+e.replace("%","")}function se(e){return Array.isArray(e)?e:[e]}function le(e,n,t,r){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,i=arguments.length>5?arguments[5]:void 0,o=50-r/2,c=0,s=-o,l=0,p=-2*o;switch(i){case"left":c=-o,s=0,l=2*o,p=0;break;case"right":c=o,s=0,l=-2*o,p=0;break;case"bottom":s=o,p=2*o}var d="M 50,50 m ".concat(c,",").concat(s,"\n   a ").concat(o,",").concat(o," 0 1 1 ").concat(l,",").concat(-p,"\n   a ").concat(o,",").concat(o," 0 1 1 ").concat(-l,",").concat(p),u=2*Math.PI*o,h={stroke:"string"===typeof t?t:void 0,strokeDasharray:"".concat(n/100*(u-a),"px ").concat(u,"px"),strokeDashoffset:"-".concat(a/2+e/100*(u-a),"px"),transition:"stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s"};return{pathString:d,pathStyle:h}}var pe=function(e){var n=e.prefixCls,t=e.strokeWidth,r=e.trailWidth,a=e.gapDegree,i=e.gapPosition,o=e.trailColor,c=e.strokeLinecap,s=e.style,l=e.className,p=e.strokeColor,u=e.percent,h=Object(te.a)(e,["prefixCls","strokeWidth","trailWidth","gapDegree","gapPosition","trailColor","strokeLinecap","style","className","strokeColor","percent"]),b=d.useMemo((function(){return oe+=1}),[]),g=le(0,100,o,t,a,i),x=g.pathString,f=g.pathStyle,m=se(u),j=se(p),O=j.find((function(e){return"[object Object]"===Object.prototype.toString.call(e)})),v=ae(m),k=Object(ne.a)(v,1)[0];return d.createElement("svg",Object(S.a)({className:M()("".concat(n,"-circle"),l),viewBox:"0 0 100 100",style:s},h),O&&d.createElement("defs",null,d.createElement("linearGradient",{id:"".concat(n,"-gradient-").concat(b),x1:"100%",y1:"0%",x2:"0%",y2:"0%"},Object.keys(O).sort((function(e,n){return ce(e)-ce(n)})).map((function(e,n){return d.createElement("stop",{key:n,offset:e,stopColor:O[e]})})))),d.createElement("path",{className:"".concat(n,"-circle-trail"),d:x,stroke:o,strokeLinecap:c,strokeWidth:r||t,fillOpacity:"0",style:f}),function(){var e=0;return m.map((function(r,o){var s=j[o]||j[j.length-1],l="[object Object]"===Object.prototype.toString.call(s)?"url(#".concat(n,"-gradient-").concat(b,")"):"",p=le(e,r,s,t,a,i);return e+=r,d.createElement("path",{key:o,className:"".concat(n,"-circle-path"),d:p.pathString,stroke:l,strokeLinecap:c,strokeWidth:t,opacity:0===r?0:1,fillOpacity:"0",style:p.pathStyle,ref:k[o]})}))}().reverse())};pe.defaultProps=re,pe.displayName="Circle";var de=pe;function ue(e){var n=e.percent,t=e.success,r=e.successPercent,a=X(n),i=Y({success:t,successPercent:r});return i?[X(i),X(a-X(i))]:a}var he=function(e){var n=e.prefixCls,t=e.width,r=e.strokeWidth,a=e.trailColor,i=e.strokeLinecap,o=e.gapPosition,c=e.gapDegree,s=e.type,l=e.children,p=t||120,u={width:p,height:p,fontSize:.15*p+6},h=r||6,b=o||"dashboard"===s&&"bottom"||"top",g=function(e){var n=e.success,t=e.strokeColor||null;return Y({success:n,successPercent:e.successPercent})?[U.b.green,t]:t}(e),x="[object Object]"===Object.prototype.toString.call(g),f=M()("".concat(n,"-inner"),Object(N.a)({},"".concat(n,"-circle-gradient"),x));return d.createElement("div",{className:f,style:u},d.createElement(de,{percent:ue(e),strokeWidth:h,trailWidth:h,strokeColor:g,strokeLinecap:i,trailColor:a,prefixCls:n,gapDegree:c||0===c?c:"dashboard"===s?75:void 0,gapPosition:b}),l)},be=function(e){for(var n=e.size,t=e.steps,r=e.percent,a=void 0===r?0:r,i=e.strokeWidth,o=void 0===i?8:i,c=e.strokeColor,s=e.trailColor,l=e.prefixCls,p=e.children,u=Math.round(t*(a/100)),h="small"===n?2:14,b=[],g=0;g<t;g+=1)b.push(d.createElement("div",{key:g,className:M()("".concat(l,"-steps-item"),Object(N.a)({},"".concat(l,"-steps-item-active"),g<=u-1)),style:{backgroundColor:g<=u-1?c:s,width:h,height:o}}));return d.createElement("div",{className:"".concat(l,"-steps-outer")},b,p)},ge=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)n.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(t[r[a]]=e[r[a]])}return t},xe=(Object(G.a)("line","circle","dashboard"),Object(G.a)("normal","exception","active","success")),fe=function(e){Object(A.a)(t,e);var n=Object(F.a)(t);function t(){var e;return Object(L.a)(this,t),(e=n.apply(this,arguments)).renderProgress=function(n){var t,r,a=n.getPrefixCls,i=n.direction,o=Object(D.a)(e).props,c=o.prefixCls,s=o.className,l=o.size,p=o.type,u=o.steps,h=o.showInfo,b=o.strokeColor,g=ge(o,["prefixCls","className","size","type","steps","showInfo","strokeColor"]),x=a("progress",c),f=e.getProgressStatus(),m=e.renderProcessInfo(x,f);Object(Q.a)(!("successPercent"in o),"Progress","`successPercent` is deprecated. Please use `success.percent` instead."),"line"===p?r=u?d.createElement(be,Object(S.a)({},e.props,{strokeColor:"string"===typeof b?b:void 0,prefixCls:x,steps:u}),m):d.createElement(ee,Object(S.a)({},e.props,{prefixCls:x,direction:i}),m):"circle"!==p&&"dashboard"!==p||(r=d.createElement(he,Object(S.a)({},e.props,{prefixCls:x,progressStatus:f}),m));var j=M()(x,(t={},Object(N.a)(t,"".concat(x,"-").concat(("dashboard"===p?"circle":u&&"steps")||p),!0),Object(N.a)(t,"".concat(x,"-status-").concat(f),!0),Object(N.a)(t,"".concat(x,"-show-info"),h),Object(N.a)(t,"".concat(x,"-").concat(l),l),Object(N.a)(t,"".concat(x,"-rtl"),"rtl"===i),t),s);return d.createElement("div",Object(S.a)({},Object(B.a)(g,["status","format","trailColor","strokeWidth","width","gapDegree","gapPosition","strokeLinecap","percent","success","successPercent"]),{className:j}),r)},e}return Object(W.a)(t,[{key:"getPercentNumber",value:function(){var e=this.props.percent,n=void 0===e?0:e,t=Y(this.props);return parseInt(void 0!==t?t.toString():n.toString(),10)}},{key:"getProgressStatus",value:function(){var e=this.props.status;return xe.indexOf(e)<0&&this.getPercentNumber()>=100?"success":e||"normal"}},{key:"renderProcessInfo",value:function(e,n){var t,r=this.props,a=r.showInfo,i=r.format,o=r.type,c=r.percent,s=Y(this.props);if(!a)return null;var l="line"===o;return i||"exception"!==n&&"success"!==n?t=(i||function(e){return"".concat(e,"%")})(X(c),X(s)):"exception"===n?t=l?d.createElement(K.a,null):d.createElement(R.a,null):"success"===n&&(t=l?d.createElement(J.a,null):d.createElement(H,null)),d.createElement("span",{className:"".concat(e,"-text"),title:"string"===typeof t?t:void 0},t)}},{key:"render",value:function(){return d.createElement(V.a,null,this.renderProgress)}}]),t}(d.Component);fe.defaultProps={type:"line",percent:0,showInfo:!0,trailColor:null,size:"default",gapDegree:void 0,strokeLinecap:"round"};var me,je,Oe,ve,ke,ye,we,Ce,ze,Pe,Ee,Ne,Se,Le,We,De,Ae,Fe,Ie=fe,Me=t(598),Be=t(78),Re=t(229),_e=(Object(g.default)(v.p)(me||(me=Object(b.a)(["\n  background-image: ",";\n  background-repeat: no-repeat;\n  background-size: contain;\n  padding-top: 112px;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 437px;\n  width: 100%;\n"])),(function(e){var n=e.ifoId;return"url('/images/ifos/".concat(n,"-bg.svg')")})),g.default.div(je||(je=Object(b.a)(["\n  margin-bottom: 16px;\n"])))),qe=g.default.p(Oe||(Oe=Object(b.a)(["\n  font-size: 14px;\n  line-height: 20px;\n  font-weight: 600;\n  margin-bottom: 4px;\n"]))),Te=g.default.p(ve||(ve=Object(b.a)(["\n  font-size: 12px;\n  line-height: 18px;\n  font-weight: 600;\n  display: grid;\n  grid-template-columns: 30px auto auto;\n"]))),He=g.default.div(ke||(ke=Object(b.a)(["\n  color: #f90943;\n"]))),Je=g.default.div(ye||(ye=Object(b.a)([""]))),Ke=g.default.div(we||(we=Object(b.a)(["\n  margin-left: auto;\n"]))),Ve=(g.default.div(Ce||(Ce=Object(b.a)(["\n  display: flex;\n  overflow: hidden;\n  height: 8px;\n  border-radius: 8px;\n  margin-bottom: 8px;\n"]))),g.default.div(ze||(ze=Object(b.a)(["\n  width: 100%;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #861818;\n  transition: width 0.6s ease;\n"]))),g.default.div(Pe||(Pe=Object(b.a)(["\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 16px;\n  margin-bottom: 16px;\n"])))),Ge=g.default.div(Ee||(Ee=Object(b.a)(["\n  p {\n    font-size: 12px;\n    line-height: 18px;\n    font-weight: 600;\n    margin-bottom: 4px;\n    color: #212121;\n  }\n\n  h3 {\n    font-size: 22px;\n    line-height: 28px;\n    font-weight: 600;\n    margin-bottom: 0;\n    color: #0c8fb6;\n  }\n"]))),Qe=g.default.div(Ne||(Ne=Object(b.a)(["\n  box-sizing: border-box;\n  margin: 0px 0px 20px;\n  min-width: 0px;\n  padding: 0px;\n  width: 100%;\n  border-radius: 26px;\n  background: rgb(234 234 234);\n  overflow: hidden;\n  box-shadow: rgb(171 133 115 / 16%) 0px 2px 10px;\n  align-items: stretch;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n\n  &:hover {\n    box-shadow: 1px 2px 20px #fff0c1;\n    transition: 0.5s;\n  }\n\n  @media (min-width: 768px) {\n    width: 100%;\n  }\n\n  &:not(:nth-child(3n)) {\n    margin-right: 0;\n\n    @media (min-width: 768px) {\n      margin-right: 17px;\n    }\n  }\n\n  &.item-coming {\n    .item-coming-title {\n      min-height: 106px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-weight: 700;\n      font-size: 24px;\n      background: #8a8989;\n      color: #fff;\n    }\n\n    .item-coming-content {\n      margin: 0px;\n      width: 100%;\n      display: flex;\n      align-items: center;\n      height: 100%;\n      text-align: center;\n\n      div {\n        display: flex;\n        flex-direction: column;\n        width: 100%;\n      }\n\n      h2 {\n        font-size: 20px;\n        margin-bottom: 10px;\n      }\n    }\n  }\n"]))),Ue=g.default.div(Se||(Se=Object(b.a)(["\n  margin-bottom: 16px;\n\n  h2 {\n    font-size: 28px;\n    line-height: 34px;\n    font-weight: 600;\n    margin-bottom: 0;\n    display: flex;\n    align-items: center;\n    min-height: 68px;\n\n    span {\n      width: 40px;\n      height: 40px;\n      line-height: 40px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin-right: 5px;\n\n      img {\n        width: 40px;\n      }\n    }\n  }\n"]))),Xe=Object(g.default)(v.p)(Le||(Le=Object(b.a)(["\n  ","\n  position: relative;\n  width: 100%;\n  height: 106px;\n  background-size: cover;\n  color: rgb(255, 255, 255);\n  margin: 0;\n\n  @media (min-width: 768px) {\n    width: 100%;\n  }\n\n  section {\n    position: absolute;\n    top: 16px;\n    left: 0px;\n    background: rgb(165, 165, 165);\n    border-top-right-radius: 12px;\n    border-bottom-right-radius: 12px;\n    color: rgb(255, 253, 250);\n    font-family: 'Baloo Da';\n    font-weight: 400;\n    padding: 6px 12px;\n\n    span {\n      box-sizing: border-box;\n      margin: 0px;\n      min-width: 0px;\n      font-size: 12px;\n      font-weight: 600;\n      text-transform: capitalize;\n    }\n  }\n"])),(function(e){var n=e.img;return n&&"\n  background-image: url(".concat(Be.b+n,");\n\n  ")})),Ye=g.default.div(We||(We=Object(b.a)(["\n  span {\n    font-size: 14px;\n    line-height: 20px;\n    font-weight: 600;\n    margin-bottom: 4px;\n    display: block;\n  }\n\n  h2 {\n    font-size: 28px;\n    line-height: 34px;\n    font-weight: 500;\n    text-transform: uppercase;\n    margin-bottom: 16px;\n    color: #0c8fb6;\n  }\n"]))),Ze=g.default.div(De||(De=Object(b.a)(["\n  padding: 20px 24px 8px;\n\n  h4 {\n    box-sizing: border-box;\n    margin: 0px;\n    min-width: 0px;\n    font-weight: bold;\n    font-size: 24px;\n    color: rgb(37 37 53);\n    line-height: 28px;\n  }\n"]))),$e=g.default.div(Ae||(Ae=Object(b.a)(["\n  display: flex;\n  justify-content: center;\n  color: #2b2e2f;\n\n  a {\n    display: block;\n    width: 232px;\n    height: 40px;\n    line-height: 40px;\n    font-weight: bold;\n    font-size: 14px;\n    color: #2b2e2f;\n    text-align: center;\n    background: #f5c606;\n    border-radius: 10px;\n    text-decoration: none;\n\n    &:hover {\n      background-color: #e4bc17;\n      transition: 0.5s;\n      color: #2b2e2f;\n    }\n  }\n"]))),en=function(e){var n=e.ifo,t=n.sympol,r=n.typePool,a=n.banner,i=n.logo,o=n.name,c=n.currency,s=Object(Me.a)(n),l=s.offeringAmount,d=s.raisingAmount,u=s.totalAmount,h=s.getAddressListLength,b=s.status,g=(function(e,n){"coming_soon"===e?(v.t,n(999,"Coming Soon")):"live"===e&&(v.t,n(999,"LIVE NOW!"))}(b,Object(k.a)()),Object(x.a)()),m=Object(p.a)(g,2),j=m[0],O=(m[1],l.toNumber()&&d.toNumber()?"".concat(l.div(d).toFixed(2)):"?"),y=u.toNumber()&&d.toNumber()?"".concat(u.multipliedBy(100).div(d).toFixed(2)):"0";return b!==j.statusCombo&&"all"!==j.statusCombo?Object(f.jsx)(f.Fragment,{}):Object(f.jsx)(f.Fragment,{children:Object(f.jsxs)(Qe,{children:[Object(f.jsx)(Xe,{img:a,children:Object(f.jsx)("section",{children:Object(f.jsx)("span",{children:b})})}),Object(f.jsxs)(Ze,{children:[Object(f.jsxs)(Ue,{children:[Object(f.jsxs)("h2",{children:[Object(f.jsx)("span",{children:Object(f.jsx)("img",{src:"".concat(Be.b,"/").concat(i),alt:""})}),o]}),Object(f.jsxs)("p",{children:["1 ",c," = ",O," ",t]})]}),Object(f.jsxs)(Ye,{children:[Object(f.jsx)("span",{children:"Total Raise"}),Object(f.jsxs)("h2",{children:[Object(f.jsx)(Re.a,{bold:!0,color:"",value:parseFloat(l.div(1e18).toFixed(2)),decimals:0,fontSize:"10px",fontWeight:"600"}),c]})]}),Object(f.jsxs)(_e,{children:[Object(f.jsx)(qe,{children:"Progress"}),Object(f.jsx)(Ie,{percent:parseFloat(y),status:"active",showInfo:!1}),Object(f.jsxs)(Te,{children:[Object(f.jsxs)(He,{children:[y,"%"]}),Object(f.jsx)(Je,{style:{marginLeft:"10px"},children:" (Min.0%)"}),Object(f.jsx)(Ke,{children:"0/100"})]})]}),Object(f.jsxs)(Ve,{children:[Object(f.jsxs)(Ge,{children:[Object(f.jsx)("p",{children:"Participants"}),Object(f.jsx)("h3",{children:h})]}),Object(f.jsxs)(Ge,{children:[Object(f.jsxs)("p",{children:["Max",Object(f.jsx)("span",{children:" ".concat(c)})]}),Object(f.jsx)("h3",{children:Object(f.jsx)(Re.a,{bold:!0,color:"",value:parseFloat(d.div(1e18).toFixed(2)),decimals:0,fontSize:"10px",fontWeight:"600"})})]}),Object(f.jsxs)(Ge,{children:[Object(f.jsx)("p",{children:"Access"}),Object(f.jsx)("h5",{children:r})]})]}),Object(f.jsx)($e,{children:Object(f.jsx)(E.b,{to:"/IfoDetail/".concat(n._id),children:"Participate"})})]})]})})},nn=g.default.div(Fe||(Fe=Object(b.a)(["\n  align-items: start;\n  border-top: 2px solid #2b2c3a;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-gap: 20px;\n  padding-bottom: 40px;\n  padding-top: 40px;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-gap: 20px;\n\n  @media (min-width: 768px) {\n    grid-template-columns: repeat(3,1fr);\n  }\n\n  @media (min-width: 991px) {\n    grid-template-columns: repeat(3,1fr);\n  }\n"])));nn.defaultProps={isSingle:!1};var tn,rn=nn,an=g.default.div(tn||(tn=Object(b.a)(["\n  background: url('../images/bg-ido.png');\n  background-size: cover;\n  background-position: right;\n  background-repeat: no-repeat;\n  height: 277px;\n  margin-bottom: 40px;\n  position: relative;\n  border-radius: 20px;\n\n  @media (max-width: 768px) {\n    height: auto;\n    background: unset;\n    padding: 20px;\n  }\n\n  .content {\n    position: relative;\n    padding: 20px 200px 10px 211px;\n    color: #fff;\n\n    @media (max-width: 768px) {\n      padding: 0;\n    }\n  }\n\n  h4 {\n    box-sizing: border-box;\n    margin: 0px;\n    min-width: 0px;\n    font-size: 28px;\n    font-weight: 700;\n    padding-bottom: 10px;\n    color: #fff;\n  }\n\n  p {\n    font-size: 16px;\n    margin-bottom: 16px;\n    line-height: 22px;\n    font-weight: 500;\n  }\n\n  a {\n    display: inline-block;\n    width: 152px;\n    height: 40px;\n    line-height: 40px;\n    background: linear-gradient(180.24deg,rgb(114 186 255) 0.21%,rgb(28 144 255) 63.19%);\n    border-radius: 8px;\n    color: #fff;\n    text-align: center;\n    font-weight: 500;\n    margin-top: 18px;\n\n    &:hover {\n      opacity: 0.7;\n      transition: 0.5s;\n    }\n  }\n"]))),on=function(e){var n=e.ifos;return Object(f.jsxs)("div",{children:[Object(f.jsx)(rn,{isSingle:!0,children:n.map((function(e){return Object(f.jsx)(en,{ifo:e},e._id)}))}),Object(f.jsx)(an,{children:Object(f.jsxs)("div",{className:"content",children:[Object(f.jsx)("h4",{children:"How to launch your own IDO ?"}),Object(f.jsx)("p",{children:"Launch your project with LuckySwap, LuckySwap is a decentralized trading platform that uses the automatic market maker (AMM) model. At the same time LuckySwap is the 1st AMM+NFT exchange on Binance Smart Chain.Various data indicate the rapid growth of LuckySwap in the DEFI ecosystem"}),Object(f.jsx)("a",{rel:"noreferrer",href:"https://docs.google.com/forms/u/3/d/e/1FAIpQLSdeFTnAHObS3CWDxB4b8c3zFRsj9DXb1MJ_vqE7YLUO4BeChg/viewform",target:"_blank",children:"Apply Now"})]})})]})};n.default=function(){var e=Object(u.i)().path,n=Object(x.a)(),t=Object(p.a)(n,2),r=t[0],a=t[1],i=r.launchpads;return Object(d.useEffect)((function(){a.getLaunchpads()}),[]),r.keySearch&&(i=i.filter((function(e){return e.name.toLowerCase().indexOf(r.keySearch.toLowerCase())>-1}))),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(P,{}),Object(f.jsxs)(h.a,{children:[Object(f.jsx)(O,{}),Object(f.jsx)(u.b,{exact:!0,path:"".concat(e),children:Object(f.jsx)(on,{ifos:i})})]})]})}}}]);
//# sourceMappingURL=19.1d5108e3.chunk.js.map