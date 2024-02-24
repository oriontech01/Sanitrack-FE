/*! For license information please see 6660.6e0e9834.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunksanitrack_web=self.webpackChunksanitrack_web||[]).push([[6660],{63336:(e,o,t)=>{t.d(o,{A:()=>A});var r=t(98587),n=t(58168),a=t(65043),l=t(58387),i=t(68606),c=t(53650),s=t(34535);const v=e=>{let o;return o=e<1?5.11916*e**2:4.5*Math.log(e+1)+2,(o/100).toFixed(2)};var u=t(72876),d=t(57056),m=t(32400);function f(e){return(0,m.Ay)("MuiPaper",e)}(0,d.A)("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);var p=t(70579);const S=["className","component","elevation","square","variant"],h=(0,s.Ay)("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,o[t.variant],!t.square&&o.rounded,"elevation"===t.variant&&o["elevation".concat(t.elevation)]]}})((e=>{let{theme:o,ownerState:t}=e;var r;return(0,n.A)({backgroundColor:(o.vars||o).palette.background.paper,color:(o.vars||o).palette.text.primary,transition:o.transitions.create("box-shadow")},!t.square&&{borderRadius:o.shape.borderRadius},"outlined"===t.variant&&{border:"1px solid ".concat((o.vars||o).palette.divider)},"elevation"===t.variant&&(0,n.A)({boxShadow:(o.vars||o).shadows[t.elevation]},!o.vars&&"dark"===o.palette.mode&&{backgroundImage:"linear-gradient(".concat((0,c.X4)("#fff",v(t.elevation)),", ").concat((0,c.X4)("#fff",v(t.elevation)),")")},o.vars&&{backgroundImage:null==(r=o.vars.overlays)?void 0:r[t.elevation]}))})),A=a.forwardRef((function(e,o){const t=(0,u.A)({props:e,name:"MuiPaper"}),{className:a,component:c="div",elevation:s=1,square:v=!1,variant:d="elevation"}=t,m=(0,r.A)(t,S),A=(0,n.A)({},t,{component:c,elevation:s,square:v,variant:d}),y=(e=>{const{square:o,elevation:t,variant:r,classes:n}=e,a={root:["root",r,!o&&"rounded","elevation"===r&&"elevation".concat(t)]};return(0,i.A)(a,f,n)})(A);return(0,p.jsx)(h,(0,n.A)({as:c,ownerState:A,className:(0,l.A)(y.root,a),ref:o},m))}))},59662:(e,o,t)=>{t.d(o,{A:()=>y});var r=t(58168),n=t(65043),a=t(98587),l=t(58387),i=t(68606),c=t(6803),s=t(72876),v=t(34535),u=t(57056),d=t(32400);function m(e){return(0,d.Ay)("MuiSvgIcon",e)}(0,u.A)("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var f=t(70579);const p=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],S=(0,v.Ay)("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,"inherit"!==t.color&&o["color".concat((0,c.A)(t.color))],o["fontSize".concat((0,c.A)(t.fontSize))]]}})((e=>{let{theme:o,ownerState:t}=e;var r,n,a,l,i,c,s,v,u,d,m,f,p;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:null==(r=o.transitions)||null==(n=r.create)?void 0:n.call(r,"fill",{duration:null==(a=o.transitions)||null==(a=a.duration)?void 0:a.shorter}),fontSize:{inherit:"inherit",small:(null==(l=o.typography)||null==(i=l.pxToRem)?void 0:i.call(l,20))||"1.25rem",medium:(null==(c=o.typography)||null==(s=c.pxToRem)?void 0:s.call(c,24))||"1.5rem",large:(null==(v=o.typography)||null==(u=v.pxToRem)?void 0:u.call(v,35))||"2.1875rem"}[t.fontSize],color:null!=(d=null==(m=(o.vars||o).palette)||null==(m=m[t.color])?void 0:m.main)?d:{action:null==(f=(o.vars||o).palette)||null==(f=f.action)?void 0:f.active,disabled:null==(p=(o.vars||o).palette)||null==(p=p.action)?void 0:p.disabled,inherit:void 0}[t.color]}})),h=n.forwardRef((function(e,o){const t=(0,s.A)({props:e,name:"MuiSvgIcon"}),{children:v,className:u,color:d="inherit",component:h="svg",fontSize:A="medium",htmlColor:y,inheritViewBox:b=!1,titleAccess:w,viewBox:g="0 0 24 24"}=t,x=(0,a.A)(t,p),z=n.isValidElement(v)&&"svg"===v.type,k=(0,r.A)({},t,{color:d,component:h,fontSize:A,instanceFontSize:e.fontSize,inheritViewBox:b,viewBox:g,hasSvgAsChild:z}),R={};b||(R.viewBox=g);const M=(e=>{const{color:o,fontSize:t,classes:r}=e,n={root:["root","inherit"!==o&&"color".concat((0,c.A)(o)),"fontSize".concat((0,c.A)(t))]};return(0,i.A)(n,m,r)})(k);return(0,f.jsxs)(S,(0,r.A)({as:h,className:(0,l.A)(M.root,u),focusable:"false",color:y,"aria-hidden":!w||void 0,role:w?"img":void 0,ref:o},R,x,z&&v.props,{ownerState:k,children:[z?v.props.children:v,w?(0,f.jsx)("title",{children:w}):null]}))}));h.muiName="SvgIcon";const A=h;function y(e,o){function t(t,n){return(0,f.jsx)(A,(0,r.A)({"data-testid":"".concat(o,"Icon"),ref:n},t,{children:e}))}return t.muiName=A.muiName,n.memo(n.forwardRef(t))}},80950:(e,o,t)=>{t.d(o,{A:()=>r});const r=t(76440).A},22427:(e,o,t)=>{t.d(o,{A:()=>r});const r=t(22144).A},36078:(e,o,t)=>{t.d(o,{A:()=>r});const r=t(46288).A},55013:(e,o,t)=>{t.d(o,{A:()=>r});const r=t(63844).A},76440:(e,o,t)=>{function r(e){let o,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:166;function r(){for(var r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];clearTimeout(o),o=setTimeout((()=>{e.apply(this,n)}),t)}return r.clear=()=>{clearTimeout(o)},r}t.d(o,{A:()=>r})},95082:(e,o)=>{var t,r=Symbol.for("react.element"),n=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),s=Symbol.for("react.context"),v=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),S=Symbol.for("react.offscreen");function h(e){if("object"===typeof e&&null!==e){var o=e.$$typeof;switch(o){case r:switch(e=e.type){case a:case i:case l:case d:case m:return e;default:switch(e=e&&e.$$typeof){case v:case s:case u:case p:case f:case c:return e;default:return o}}case n:return o}}}t=Symbol.for("react.module.reference")},2086:(e,o,t)=>{t(95082)}}]);
//# sourceMappingURL=6660.6e0e9834.chunk.js.map