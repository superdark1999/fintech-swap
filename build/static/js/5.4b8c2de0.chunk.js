(this["webpackJsonpluckyswap-exchange-v2"]=this["webpackJsonpluckyswap-exchange-v2"]||[]).push([[5],{1413:function(e,t,n){"use strict";var o;function r(e){if("undefined"===typeof document)return 0;if(e||void 0===o){var t=document.createElement("div");t.style.width="100%",t.style.height="200px";var n=document.createElement("div"),r=n.style;r.position="absolute",r.top="0",r.left="0",r.pointerEvents="none",r.visibility="hidden",r.width="200px",r.height="150px",r.overflow="hidden",n.appendChild(t),document.body.appendChild(n);var c=t.offsetWidth;n.style.overflow="scroll";var a=t.offsetWidth;c===a&&(a=n.clientWidth),document.body.removeChild(n),o=c-a}return o}n.d(t,"a",(function(){return r}))},1635:function(e,t,n){"use strict";var o=n(19),r=n(227),c=n(0),a=n(1637),i=n(332),l=n(45),u=n.n(l),s=n(1346),f=n(1347),d=n(1299);function m(e){var t=e.prefixCls,n=e.style,r=e.visible,a=e.maskProps,l=e.motionName;return c.createElement(d.b,{key:"mask",visible:r,motionName:l,leavedClassName:"".concat(t,"-mask-hidden")},(function(e){var r=e.className,l=e.style;return c.createElement("div",Object(o.a)({style:Object(i.a)(Object(i.a)({},l),n),className:u()("".concat(t,"-mask"),r)},a))}))}function v(e,t,n){var o=t;return!o&&n&&(o="".concat(e,"-").concat(n)),o}var p=-1;function b(e,t){var n=e["page".concat(t?"Y":"X","Offset")],o="scroll".concat(t?"Top":"Left");if("number"!==typeof n){var r=e.document;"number"!==typeof(n=r.documentElement[o])&&(n=r.body[o])}return n}var C=c.memo((function(e){return e.children}),(function(e,t){return!t.shouldUpdate})),g={width:0,height:0,overflow:"hidden",outline:"none"},h=c.forwardRef((function(e,t){var n=e.closable,a=e.prefixCls,l=e.width,s=e.height,f=e.footer,m=e.title,v=e.closeIcon,p=e.style,h=e.className,y=e.visible,O=e.forceRender,j=e.bodyStyle,k=e.bodyProps,E=e.children,x=e.destroyOnClose,w=e.modalRender,N=e.motionName,T=e.ariaId,P=e.onClose,R=e.onVisibleChanged,S=e.onMouseDown,I=e.onMouseUp,L=e.mousePosition,M=Object(c.useRef)(),A=Object(c.useRef)(),W=Object(c.useRef)();c.useImperativeHandle(t,(function(){return{focus:function(){var e;null===(e=M.current)||void 0===e||e.focus()},changeActive:function(e){var t=document.activeElement;e&&t===A.current?M.current.focus():e||t!==M.current||A.current.focus()}}}));var D,F,H,B=c.useState(),U=Object(r.a)(B,2),z=U[0],V=U[1],X={};function Y(){var e=function(e){var t=e.getBoundingClientRect(),n={left:t.left,top:t.top},o=e.ownerDocument,r=o.defaultView||o.parentWindow;return n.left+=b(r),n.top+=b(r,!0),n}(W.current);V(L?"".concat(L.x-e.left,"px ").concat(L.y-e.top,"px"):"")}void 0!==l&&(X.width=l),void 0!==s&&(X.height=s),z&&(X.transformOrigin=z),f&&(D=c.createElement("div",{className:"".concat(a,"-footer")},f)),m&&(F=c.createElement("div",{className:"".concat(a,"-header")},c.createElement("div",{className:"".concat(a,"-title"),id:T},m))),n&&(H=c.createElement("button",{type:"button",onClick:P,"aria-label":"Close",className:"".concat(a,"-close")},v||c.createElement("span",{className:"".concat(a,"-close-x")})));var J=c.createElement("div",{className:"".concat(a,"-content")},H,F,c.createElement("div",Object(o.a)({className:"".concat(a,"-body"),style:j},k),E),D);return c.createElement(d.b,{visible:y,onVisibleChanged:R,onAppearPrepare:Y,onEnterPrepare:Y,forceRender:O,motionName:N,removeOnLeave:x,ref:W},(function(e,t){var n=e.className,o=e.style;return c.createElement("div",{key:"dialog-element",role:"document",ref:t,style:Object(i.a)(Object(i.a)(Object(i.a)({},o),p),X),className:u()(a,h,n),onMouseDown:S,onMouseUp:I},c.createElement("div",{tabIndex:0,ref:M,style:g,"aria-hidden":"true"}),c.createElement(C,{shouldUpdate:y||O},w?w(J):J),c.createElement("div",{tabIndex:0,ref:A,style:g,"aria-hidden":"true"}))}))}));h.displayName="Content";var y=h;function O(e){var t=e.prefixCls,n=void 0===t?"rc-dialog":t,a=e.zIndex,l=e.visible,d=void 0!==l&&l,b=e.keyboard,C=void 0===b||b,g=e.focusTriggerAfterClose,h=void 0===g||g,O=e.scrollLocker,j=e.title,k=e.wrapStyle,E=e.wrapClassName,x=e.wrapProps,w=e.onClose,N=e.afterClose,T=e.transitionName,P=e.animation,R=e.closable,S=void 0===R||R,I=e.mask,L=void 0===I||I,M=e.maskTransitionName,A=e.maskAnimation,W=e.maskClosable,D=void 0===W||W,F=e.maskStyle,H=e.maskProps,B=Object(c.useRef)(),U=Object(c.useRef)(),z=Object(c.useRef)(),V=c.useState(d),X=Object(r.a)(V,2),Y=X[0],J=X[1],K=Object(c.useRef)();function q(e){null===w||void 0===w||w(e)}K.current||(K.current="rcDialogTitle".concat(p+=1));var G=Object(c.useRef)(!1),Q=Object(c.useRef)(),Z=null;return D&&(Z=function(e){G.current?G.current=!1:U.current===e.target&&q(e)}),Object(c.useEffect)((function(){return d&&J(!0),function(){}}),[d]),Object(c.useEffect)((function(){return function(){clearTimeout(Q.current)}}),[]),Object(c.useEffect)((function(){return Y?(null===O||void 0===O||O.lock(),null===O||void 0===O?void 0:O.unLock):function(){}}),[Y,O]),c.createElement("div",{className:"".concat(n,"-root")},c.createElement(m,{prefixCls:n,visible:L&&d,motionName:v(n,M,A),style:Object(i.a)({zIndex:a},F),maskProps:H}),c.createElement("div",Object(o.a)({tabIndex:-1,onKeyDown:function(e){if(C&&e.keyCode===s.a.ESC)return e.stopPropagation(),void q(e);d&&e.keyCode===s.a.TAB&&z.current.changeActive(!e.shiftKey)},className:u()("".concat(n,"-wrap"),E),ref:U,onClick:Z,role:"dialog","aria-labelledby":j?K.current:null,style:Object(i.a)(Object(i.a)({zIndex:a},k),{},{display:Y?null:"none"})},x),c.createElement(y,Object(o.a)({},e,{onMouseDown:function(){clearTimeout(Q.current),G.current=!0},onMouseUp:function(){Q.current=setTimeout((function(){G.current=!1}))},ref:z,closable:S,ariaId:K.current,prefixCls:n,visible:d,onClose:q,onVisibleChanged:function(e){if(e){var t;if(!Object(f.a)(U.current,document.activeElement))B.current=document.activeElement,null===(t=z.current)||void 0===t||t.focus()}else{if(J(!1),L&&B.current&&h){try{B.current.focus({preventScroll:!0})}catch(n){}B.current=null}Y&&(null===N||void 0===N||N())}},motionName:v(n,T,P)}))))}var j=function(e){var t=e.visible,n=e.getContainer,i=e.forceRender,l=e.destroyOnClose,u=void 0!==l&&l,s=e.afterClose,f=c.useState(t),d=Object(r.a)(f,2),m=d[0],v=d[1];return c.useEffect((function(){t&&v(!0)}),[t]),!1===n?c.createElement(O,Object(o.a)({},e,{getOpenCount:function(){return 2}})):i||!u||m?c.createElement(a.a,{visible:t,forceRender:i,getContainer:n},(function(t){return c.createElement(O,Object(o.a)({},e,{destroyOnClose:u,afterClose:function(){null===s||void 0===s||s(),v(!1)}},t))})):null};j.displayName="Dialog";var k=j;t.a=k},1637:function(e,t,n){"use strict";var o=n(410),r=n(411),c=n(412),a=n(630),i=n(252),l=n(185),u=n(0),s=n(1296),f=n(1410),d=n(417),m=n(1413);var v=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)return{};var n=t.element,o=void 0===n?document.body:n,r={},c=Object.keys(e);return c.forEach((function(e){r[e]=o.style[e]})),c.forEach((function(t){o.style[t]=e[t]})),r};var p={},b=function(e){if(document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth||e){var t="ant-scrolling-effect",n=new RegExp("".concat(t),"g"),o=document.body.className;if(e){if(!n.test(o))return;return v(p),p={},void(document.body.className=o.replace(n,"").trim())}var r=Object(m.a)();if(r&&(p=v({position:"relative",width:"calc(100% - ".concat(r,"px)")}),!n.test(o))){var c="".concat(o," ").concat(t);document.body.className=c.trim()}}},C=n(1286),g=[],h="ant-scrolling-effect",y=new RegExp("".concat(h),"g"),O=0,j=new Map,k=function e(t){var n=this;Object(o.a)(this,e),this.getContainer=function(){var e;return null===(e=n.options)||void 0===e?void 0:e.container},this.reLock=function(e){var t=g.find((function(e){return e.target===n.lockTarget}));t&&n.unLock(),n.options=e,t&&(t.options=e,n.lock())},this.lock=function(){var e;if(!g.some((function(e){return e.target===n.lockTarget})))if(g.some((function(e){var t,o=e.options;return(null===o||void 0===o?void 0:o.container)===(null===(t=n.options)||void 0===t?void 0:t.container)})))g=[].concat(Object(C.a)(g),[{target:n.lockTarget,options:n.options}]);else{var t=0,o=(null===(e=n.options)||void 0===e?void 0:e.container)||document.body;(o===document.body&&window.innerWidth-document.documentElement.clientWidth>0||o.scrollHeight>o.clientHeight)&&(t=Object(m.a)());var r=o.className;if(0===g.filter((function(e){var t,o=e.options;return(null===o||void 0===o?void 0:o.container)===(null===(t=n.options)||void 0===t?void 0:t.container)})).length&&j.set(o,v({width:"calc(100% - ".concat(t,"px)"),overflow:"hidden",overflowX:"hidden",overflowY:"hidden"},{element:o})),!y.test(r)){var c="".concat(r," ").concat(h);o.className=c.trim()}g=[].concat(Object(C.a)(g),[{target:n.lockTarget,options:n.options}])}},this.unLock=function(){var e,t=g.find((function(e){return e.target===n.lockTarget}));if(g=g.filter((function(e){return e.target!==n.lockTarget})),t&&!g.some((function(e){var n,o=e.options;return(null===o||void 0===o?void 0:o.container)===(null===(n=t.options)||void 0===n?void 0:n.container)}))){var o=(null===(e=n.options)||void 0===e?void 0:e.container)||document.body,r=o.className;y.test(r)&&(v(j.get(o),{element:o}),j.delete(o),o.className=o.className.replace(y,"").trim())}},this.lockTarget=O++,this.options=t};function E(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=Object(i.a)(e);if(t){var r=Object(i.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(a.a)(this,n)}}var x=0,w=Object(d.a)();var N={},T=function(e){if(!w)return null;if(e){if("string"===typeof e)return document.querySelectorAll(e)[0];if("function"===typeof e)return e();if("object"===Object(l.a)(e)&&e instanceof window.HTMLElement)return e}return document.body},P=function(e){Object(c.a)(n,e);var t=E(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).componentRef=u.createRef(),r.updateScrollLocker=function(e){var t=(e||{}).visible,n=r.props,o=n.getContainer,c=n.visible;c&&c!==t&&w&&T(o)!==r.scrollLocker.getContainer()&&r.scrollLocker.reLock({container:T(o)})},r.updateOpenCount=function(e){var t=e||{},n=t.visible,o=t.getContainer,c=r.props,a=c.visible,i=c.getContainer;a!==n&&w&&T(i)===document.body&&(a&&!n?x+=1:e&&(x-=1)),("function"===typeof i&&"function"===typeof o?i.toString()!==o.toString():i!==o)&&r.removeCurrentContainer()},r.attachToParent=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e||r.container&&!r.container.parentNode){var t=T(r.props.getContainer);return!!t&&(t.appendChild(r.container),!0)}return!0},r.getContainer=function(){return w?(r.container||(r.container=document.createElement("div"),r.attachToParent(!0)),r.setWrapperClassName(),r.container):null},r.setWrapperClassName=function(){var e=r.props.wrapperClassName;r.container&&e&&e!==r.container.className&&(r.container.className=e)},r.removeCurrentContainer=function(){var e,t;null===(e=r.container)||void 0===e||null===(t=e.parentNode)||void 0===t||t.removeChild(r.container)},r.switchScrollingEffect=function(){1!==x||Object.keys(N).length?x||(v(N),N={},b(!0)):(b(),N=v({overflow:"hidden",overflowX:"hidden",overflowY:"hidden"}))},r.scrollLocker=new k({container:T(e.getContainer)}),r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.updateOpenCount(),this.attachToParent()||(this.rafId=Object(s.a)((function(){e.forceUpdate()})))}},{key:"componentDidUpdate",value:function(e){this.updateOpenCount(e),this.updateScrollLocker(e),this.setWrapperClassName(),this.attachToParent()}},{key:"componentWillUnmount",value:function(){var e=this.props,t=e.visible,n=e.getContainer;w&&T(n)===document.body&&(x=t&&x?x-1:x),this.removeCurrentContainer(),s.a.cancel(this.rafId)}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.forceRender,o=e.visible,r=null,c={getOpenCount:function(){return x},getContainer:this.getContainer,switchScrollingEffect:this.switchScrollingEffect,scrollLocker:this.scrollLocker};return(n||o||this.componentRef.current)&&(r=u.createElement(f.a,{getContainer:this.getContainer,ref:this.componentRef},t(c))),r}}]),n}(u.Component);t.a=P},1659:function(e,t,n){"use strict";var o=n(63),r=n(19),c=n(0),a=n(1635),i=n(45),l=n.n(i),u=n(1402),s=n(1286),f=n(227);var d=n(1332),m=n(1397),v=function(e){var t=c.useRef(!1),n=c.useRef(),o=c.useState(!1),a=Object(f.a)(o,2),i=a[0],l=a[1];c.useEffect((function(){var t;if(e.autoFocus){var o=n.current;t=setTimeout((function(){return o.focus()}))}return function(){t&&clearTimeout(t)}}),[]);var u=e.type,s=e.children,v=e.prefixCls,p=e.buttonProps;return c.createElement(d.a,Object(r.a)({},Object(m.a)(u),{onClick:function(){var n=e.actionFn,o=e.closeModal;if(!t.current)if(t.current=!0,n){var r;if(n.length)r=n(o),t.current=!1;else if(!(r=n()))return void o();!function(n){var o=e.closeModal;n&&n.then&&(l(!0),n.then((function(){o.apply(void 0,arguments)}),(function(e){console.error(e),l(!1),t.current=!1})))}(r)}else o()},loading:i,prefixCls:v},p,{ref:n}),s)},p=n(1290),b=n(228),C=n(1331),g=function(e){var t=e.icon,n=e.onCancel,r=e.onOk,a=e.close,i=e.zIndex,u=e.afterClose,s=e.visible,f=e.keyboard,d=e.centered,m=e.getContainer,g=e.maskStyle,h=e.okText,y=e.okButtonProps,O=e.cancelText,j=e.cancelButtonProps,k=e.direction,E=e.prefixCls,x=e.rootPrefixCls,w=e.bodyStyle,N=e.closable,T=void 0!==N&&N,P=e.closeIcon,R=e.modalRender,S=e.focusTriggerAfterClose;Object(p.a)(!("string"===typeof t&&t.length>2),"Modal","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(t,"` at https://ant.design/components/icon"));var I=e.okType||"primary",L="".concat(E,"-confirm"),M=!("okCancel"in e)||e.okCancel,A=e.width||416,W=e.style||{},D=void 0===e.mask||e.mask,F=void 0!==e.maskClosable&&e.maskClosable,H=null!==e.autoFocusButton&&(e.autoFocusButton||"ok"),B=l()(L,"".concat(L,"-").concat(e.type),Object(o.a)({},"".concat(L,"-rtl"),"rtl"===k),e.className),U=M&&c.createElement(v,{actionFn:n,closeModal:a,autoFocus:"cancel"===H,buttonProps:j,prefixCls:"".concat(x,"-btn")},O);return c.createElement(Y,{prefixCls:E,className:B,wrapClassName:l()(Object(o.a)({},"".concat(L,"-centered"),!!e.centered)),onCancel:function(){return a({triggerCancel:!0})},visible:s,title:"",footer:"",transitionName:Object(C.b)(x,"zoom",e.transitionName),maskTransitionName:Object(C.b)(x,"fade",e.maskTransitionName),mask:D,maskClosable:F,maskStyle:g,style:W,width:A,zIndex:i,afterClose:u,keyboard:f,centered:d,getContainer:m,closable:T,closeIcon:P,modalRender:R,focusTriggerAfterClose:S},c.createElement("div",{className:"".concat(L,"-body-wrapper")},c.createElement(b.a,{prefixCls:x},c.createElement("div",{className:"".concat(L,"-body"),style:w},t,void 0===e.title?null:c.createElement("span",{className:"".concat(L,"-title")},e.title),c.createElement("div",{className:"".concat(L,"-content")},e.content))),c.createElement("div",{className:"".concat(L,"-btns")},U,c.createElement(v,{type:I,actionFn:r,closeModal:a,autoFocus:"ok"===H,buttonProps:y,prefixCls:"".concat(x,"-btn")},h))))},h=n(429),y=n(422),O=n(689),j=function(e,t){var n=e.afterClose,o=e.config,a=c.useState(!0),i=Object(f.a)(a,2),l=i[0],u=i[1],s=c.useState(o),d=Object(f.a)(s,2),m=d[0],v=d[1],p=c.useContext(O.b),b=p.direction,C=p.getPrefixCls,j=C("modal"),k=C();function E(){u(!1);for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=t.some((function(e){return e&&e.triggerCancel}));m.onCancel&&o&&m.onCancel()}return c.useImperativeHandle(t,(function(){return{destroy:E,update:function(e){v((function(t){return Object(r.a)(Object(r.a)({},t),e)}))}}})),c.createElement(y.a,{componentName:"Modal",defaultLocale:h.a.Modal},(function(e){return c.createElement(g,Object(r.a)({prefixCls:j,rootPrefixCls:k},m,{close:E,visible:l,afterClose:n,okText:m.okText||(m.okCancel?e.okText:e.justOkText),direction:b,cancelText:m.cancelText||e.cancelText}))}))},k=c.forwardRef(j),E=n(95),x=n(1451),w=n(1450),N=n(1452),T=n(1453),P=n(1343),R=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n},S="";function I(e){var t=document.createElement("div");document.body.appendChild(t);var n=Object(r.a)(Object(r.a)({},e),{close:i,visible:!0});function o(){var n=E.unmountComponentAtNode(t);n&&t.parentNode&&t.parentNode.removeChild(t);for(var o=arguments.length,r=new Array(o),c=0;c<o;c++)r[c]=arguments[c];var a=r.some((function(e){return e&&e.triggerCancel}));e.onCancel&&a&&e.onCancel.apply(e,r);for(var l=0;l<V.length;l++){var u=V[l];if(u===i){V.splice(l,1);break}}}function a(e){var n=e.okText,o=e.cancelText,a=e.prefixCls,i=R(e,["okText","cancelText","prefixCls"]);setTimeout((function(){var e=Object(P.b)(),l=(0,Object(b.b)().getPrefixCls)(void 0,S),u=a||"".concat(l,"-modal");E.render(c.createElement(g,Object(r.a)({},i,{prefixCls:u,rootPrefixCls:l,okText:n||(i.okCancel?e.okText:e.justOkText),cancelText:o||e.cancelText})),t)}))}function i(){for(var t=this,c=arguments.length,i=new Array(c),l=0;l<c;l++)i[l]=arguments[l];a(n=Object(r.a)(Object(r.a)({},n),{visible:!1,afterClose:function(){"function"===typeof e.afterClose&&e.afterClose(),o.apply(t,i)}}))}return a(n),V.push(i),{destroy:i,update:function(e){a(n="function"===typeof e?e(n):Object(r.a)(Object(r.a)({},n),e))}}}function L(e){return Object(r.a)(Object(r.a)({icon:c.createElement(T.a,null),okCancel:!1},e),{type:"warning"})}function M(e){return Object(r.a)(Object(r.a)({icon:c.createElement(x.a,null),okCancel:!1},e),{type:"info"})}function A(e){return Object(r.a)(Object(r.a)({icon:c.createElement(w.a,null),okCancel:!1},e),{type:"success"})}function W(e){return Object(r.a)(Object(r.a)({icon:c.createElement(N.a,null),okCancel:!1},e),{type:"error"})}function D(e){return Object(r.a)(Object(r.a)({icon:c.createElement(T.a,null),okCancel:!0},e),{type:"confirm"})}var F=0,H=c.memo(c.forwardRef((function(e,t){var n=function(){var e=c.useState([]),t=Object(f.a)(e,2),n=t[0],o=t[1];return[n,c.useCallback((function(e){return o((function(t){return[].concat(Object(s.a)(t),[e])})),function(){o((function(t){return t.filter((function(t){return t!==e}))}))}}),[])]}(),o=Object(f.a)(n,2),r=o[0],a=o[1];return c.useImperativeHandle(t,(function(){return{patchElement:a}}),[]),c.createElement(c.Fragment,null,r)})));var B,U=n(631),z=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n},V=[];Object(U.a)()&&document.documentElement.addEventListener("click",(function(e){B={x:e.pageX,y:e.pageY},setTimeout((function(){B=null}),100)}),!0);var X=function(e){var t,n=c.useContext(O.b),i=n.getPopupContainer,s=n.getPrefixCls,f=n.direction,v=function(t){var n=e.onCancel;null===n||void 0===n||n(t)},p=function(t){var n=e.onOk;null===n||void 0===n||n(t)},b=function(t){var n=e.okText,o=e.okType,a=e.cancelText,i=e.confirmLoading;return c.createElement(c.Fragment,null,c.createElement(d.a,Object(r.a)({onClick:v},e.cancelButtonProps),a||t.cancelText),c.createElement(d.a,Object(r.a)({},Object(m.a)(o),{loading:i,onClick:p},e.okButtonProps),n||t.okText))},g=e.prefixCls,h=e.footer,j=e.visible,k=e.wrapClassName,E=e.centered,x=e.getContainer,w=e.closeIcon,N=e.focusTriggerAfterClose,T=void 0===N||N,R=z(e,["prefixCls","footer","visible","wrapClassName","centered","getContainer","closeIcon","focusTriggerAfterClose"]),S=s("modal",g),I=s(),L=c.createElement(y.a,{componentName:"Modal",defaultLocale:Object(P.b)()},b),M=c.createElement("span",{className:"".concat(S,"-close-x")},w||c.createElement(u.a,{className:"".concat(S,"-close-icon")})),A=l()(k,(t={},Object(o.a)(t,"".concat(S,"-centered"),!!E),Object(o.a)(t,"".concat(S,"-wrap-rtl"),"rtl"===f),t));return c.createElement(a.a,Object(r.a)({},R,{getContainer:void 0===x?i:x,prefixCls:S,wrapClassName:A,footer:void 0===h?L:h,visible:j,mousePosition:B,onClose:v,closeIcon:M,focusTriggerAfterClose:T,transitionName:Object(C.b)(I,"zoom",e.transitionName),maskTransitionName:Object(C.b)(I,"fade",e.maskTransitionName)}))};X.useModal=function(){var e=c.useRef(null),t=c.useState([]),n=Object(f.a)(t,2),o=n[0],r=n[1];c.useEffect((function(){o.length&&(Object(s.a)(o).forEach((function(e){e()})),r([]))}),[o]);var a=c.useCallback((function(t){return function(n){var o;F+=1;var a,i=c.createRef(),l=c.createElement(k,{key:"modal-".concat(F),config:t(n),ref:i,afterClose:function(){a()}});return a=null===(o=e.current)||void 0===o?void 0:o.patchElement(l),{destroy:function(){function e(){var e;null===(e=i.current)||void 0===e||e.destroy()}i.current?e():r((function(t){return[].concat(Object(s.a)(t),[e])}))},update:function(e){function t(){var t;null===(t=i.current)||void 0===t||t.update(e)}i.current?t():r((function(e){return[].concat(Object(s.a)(e),[t])}))}}}}),[]);return[c.useMemo((function(){return{info:a(M),success:a(A),error:a(W),warning:a(L),confirm:a(D)}}),[]),c.createElement(H,{ref:e})]},X.defaultProps={width:520,confirmLoading:!1,visible:!1,okType:"primary"};var Y=X;function J(e){return I(L(e))}var K=Y;K.info=function(e){return I(M(e))},K.success=function(e){return I(A(e))},K.error=function(e){return I(W(e))},K.warning=J,K.warn=J,K.confirm=function(e){return I(D(e))},K.destroyAll=function(){for(;V.length;){var e=V.pop();e&&e()}},K.config=function(e){var t=e.rootPrefixCls;Object(p.a)(!1,"Modal","Modal.config is deprecated. Please use ConfigProvider.config instead."),S=t};t.a=K}}]);
//# sourceMappingURL=5.4b8c2de0.chunk.js.map