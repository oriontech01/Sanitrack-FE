"use strict";(self.webpackChunksanitrack_web=self.webpackChunksanitrack_web||[]).push([[1198],{19252:(e,t,r)=>{r.d(t,{A:()=>y});var i=r(98587),a=r(58168),o=r(65043),n=r(58387),l=r(90410),s=r(32400),d=r(68606),c=r(52900),u=r(79644),p=r(27322),m=r(70579);const h=["className","component","disableGutters","fixed","maxWidth","classes"],v=(0,p.A)(),f=(0,u.A)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t["maxWidth".concat((0,l.A)(String(r.maxWidth)))],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),g=e=>(0,c.A)({props:e,name:"MuiContainer",defaultTheme:v});var b=r(6803),A=r(34535),x=r(72876);const w=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{createStyledComponent:t=f,useThemeProps:r=g,componentName:c="MuiContainer"}=e,u=t((e=>{let{theme:t,ownerState:r}=e;return(0,a.A)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!r.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}})}),(e=>{let{theme:t,ownerState:r}=e;return r.fixed&&Object.keys(t.breakpoints.values).reduce(((e,r)=>{const i=r,a=t.breakpoints.values[i];return 0!==a&&(e[t.breakpoints.up(i)]={maxWidth:"".concat(a).concat(t.breakpoints.unit)}),e}),{})}),(e=>{let{theme:t,ownerState:r}=e;return(0,a.A)({},"xs"===r.maxWidth&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},r.maxWidth&&"xs"!==r.maxWidth&&{[t.breakpoints.up(r.maxWidth)]:{maxWidth:"".concat(t.breakpoints.values[r.maxWidth]).concat(t.breakpoints.unit)}})})),p=o.forwardRef((function(e,t){const o=r(e),{className:p,component:v="div",disableGutters:f=!1,fixed:g=!1,maxWidth:b="lg"}=o,A=(0,i.A)(o,h),x=(0,a.A)({},o,{component:v,disableGutters:f,fixed:g,maxWidth:b}),w=((e,t)=>{const{classes:r,fixed:i,disableGutters:a,maxWidth:o}=e,n={root:["root",o&&"maxWidth".concat((0,l.A)(String(o))),i&&"fixed",a&&"disableGutters"]};return(0,d.A)(n,(e=>(0,s.Ay)(t,e)),r)})(x,c);return(0,m.jsx)(u,(0,a.A)({as:v,ownerState:x,className:(0,n.A)(w.root,p),ref:t},A))}));return p}({createStyledComponent:(0,A.Ay)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t["maxWidth".concat((0,b.A)(String(r.maxWidth)))],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,x.A)({props:e,name:"MuiContainer"})}),y=w},39336:(e,t,r)=>{r.d(t,{A:()=>g});var i=r(98587),a=r(58168),o=r(65043),n=r(58387),l=r(68606),s=r(53650),d=r(34535),c=r(72876),u=r(5658),p=r(70579);const m=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],h=(0,d.Ay)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.absolute&&t.absolute,t[r.variant],r.light&&t.light,"vertical"===r.orientation&&t.vertical,r.flexItem&&t.flexItem,r.children&&t.withChildren,r.children&&"vertical"===r.orientation&&t.withChildrenVertical,"right"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignRight,"left"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignLeft]}})((e=>{let{theme:t,ownerState:r}=e;return(0,a.A)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},r.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},r.light&&{borderColor:t.vars?"rgba(".concat(t.vars.palette.dividerChannel," / 0.08)"):(0,s.X4)(t.palette.divider,.08)},"inset"===r.variant&&{marginLeft:72},"middle"===r.variant&&"horizontal"===r.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===r.variant&&"vertical"===r.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===r.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},r.flexItem&&{alignSelf:"stretch",height:"auto"})}),(e=>{let{ownerState:t}=e;return(0,a.A)({},t.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}})}),(e=>{let{theme:t,ownerState:r}=e;return(0,a.A)({},r.children&&"vertical"!==r.orientation&&{"&::before, &::after":{width:"100%",borderTop:"thin solid ".concat((t.vars||t).palette.divider)}})}),(e=>{let{theme:t,ownerState:r}=e;return(0,a.A)({},r.children&&"vertical"===r.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:"thin solid ".concat((t.vars||t).palette.divider)}})}),(e=>{let{ownerState:t}=e;return(0,a.A)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})})),v=(0,d.Ay)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.wrapper,"vertical"===r.orientation&&t.wrapperVertical]}})((e=>{let{theme:t,ownerState:r}=e;return(0,a.A)({display:"inline-block",paddingLeft:"calc(".concat(t.spacing(1)," * 1.2)"),paddingRight:"calc(".concat(t.spacing(1)," * 1.2)")},"vertical"===r.orientation&&{paddingTop:"calc(".concat(t.spacing(1)," * 1.2)"),paddingBottom:"calc(".concat(t.spacing(1)," * 1.2)")})})),f=o.forwardRef((function(e,t){const r=(0,c.A)({props:e,name:"MuiDivider"}),{absolute:o=!1,children:s,className:d,component:f=(s?"div":"hr"),flexItem:g=!1,light:b=!1,orientation:A="horizontal",role:x=("hr"!==f?"separator":void 0),textAlign:w="center",variant:y="fullWidth"}=r,C=(0,i.A)(r,m),S=(0,a.A)({},r,{absolute:o,component:f,flexItem:g,light:b,orientation:A,role:x,textAlign:w,variant:y}),R=(e=>{const{absolute:t,children:r,classes:i,flexItem:a,light:o,orientation:n,textAlign:s,variant:d}=e,c={root:["root",t&&"absolute",d,o&&"light","vertical"===n&&"vertical",a&&"flexItem",r&&"withChildren",r&&"vertical"===n&&"withChildrenVertical","right"===s&&"vertical"!==n&&"textAlignRight","left"===s&&"vertical"!==n&&"textAlignLeft"],wrapper:["wrapper","vertical"===n&&"wrapperVertical"]};return(0,l.A)(c,u.K,i)})(S);return(0,p.jsx)(h,(0,a.A)({as:f,className:(0,n.A)(R.root,d),role:x,ref:t,ownerState:S},C,{children:s?(0,p.jsx)(v,{className:R.wrapper,ownerState:S,children:s}):null}))}));f.muiSkipListHighlight=!0;const g=f},5658:(e,t,r)=>{r.d(t,{A:()=>n,K:()=>o});var i=r(57056),a=r(32400);function o(e){return(0,a.Ay)("MuiDivider",e)}const n=(0,i.A)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"])},81673:(e,t,r)=>{r.d(t,{A:()=>w});var i=r(98587),a=r(58168),o=r(65043),n=r(58387),l=r(68606),s=r(74827),d=r(85213),c=r(34535),u=r(6803),p=r(57056),m=r(32400);function h(e){return(0,m.Ay)("MuiFormHelperText",e)}const v=(0,p.A)("MuiFormHelperText",["root","error","disabled","sizeSmall","sizeMedium","contained","focused","filled","required"]);var f,g=r(72876),b=r(70579);const A=["children","className","component","disabled","error","filled","focused","margin","required","variant"],x=(0,c.Ay)("p",{name:"MuiFormHelperText",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.size&&t["size".concat((0,u.A)(r.size))],r.contained&&t.contained,r.filled&&t.filled]}})((e=>{let{theme:t,ownerState:r}=e;return(0,a.A)({color:(t.vars||t).palette.text.secondary},t.typography.caption,{textAlign:"left",marginTop:3,marginRight:0,marginBottom:0,marginLeft:0,["&.".concat(v.disabled)]:{color:(t.vars||t).palette.text.disabled},["&.".concat(v.error)]:{color:(t.vars||t).palette.error.main}},"small"===r.size&&{marginTop:4},r.contained&&{marginLeft:14,marginRight:14})})),w=o.forwardRef((function(e,t){const r=(0,g.A)({props:e,name:"MuiFormHelperText"}),{children:o,className:c,component:p="p"}=r,m=(0,i.A)(r,A),v=(0,d.A)(),w=(0,s.A)({props:r,muiFormControl:v,states:["variant","size","disabled","error","filled","focused","required"]}),y=(0,a.A)({},r,{component:p,contained:"filled"===w.variant||"outlined"===w.variant,variant:w.variant,size:w.size,disabled:w.disabled,error:w.error,filled:w.filled,focused:w.focused,required:w.required}),C=(e=>{const{classes:t,contained:r,size:i,disabled:a,error:o,filled:n,focused:s,required:d}=e,c={root:["root",a&&"disabled",o&&"error",i&&"size".concat((0,u.A)(i)),r&&"contained",s&&"focused",n&&"filled",d&&"required"]};return(0,l.A)(c,h,t)})(y);return(0,b.jsx)(x,(0,a.A)({as:p,ownerState:y,className:(0,n.A)(C.root,c),ref:t},m,{children:" "===o?f||(f=(0,b.jsx)("span",{className:"notranslate",children:"\u200b"})):o}))}))},71424:(e,t,r)=>{r.d(t,{A:()=>n,f:()=>o});var i=r(57056),a=r(32400);function o(e){return(0,a.Ay)("MuiListItemIcon",e)}const n=(0,i.A)("MuiListItemIcon",["root","alignItemsFlexStart"])},28052:(e,t,r)=>{r.d(t,{A:()=>n,b:()=>o});var i=r(57056),a=r(32400);function o(e){return(0,a.Ay)("MuiListItemText",e)}const n=(0,i.A)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"])},32143:(e,t,r)=>{r.d(t,{A:()=>R});var i=r(98587),a=r(58168),o=r(65043),n=r(58387),l=r(68606),s=r(53650),d=r(34535),c=r(72876),u=r(51347),p=r(66236),m=r(55013),h=r(95849),v=r(5658),f=r(71424),g=r(28052),b=r(57056),A=r(32400);function x(e){return(0,A.Ay)("MuiMenuItem",e)}const w=(0,b.A)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var y=r(70579);const C=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],S=(0,d.Ay)(p.A,{shouldForwardProp:e=>(0,d.ep)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.dense&&t.dense,r.divider&&t.divider,!r.disableGutters&&t.gutters]}})((e=>{let{theme:t,ownerState:r}=e;return(0,a.A)({},t.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!r.disableGutters&&{paddingLeft:16,paddingRight:16},r.divider&&{borderBottom:"1px solid ".concat((t.vars||t).palette.divider),backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},["&.".concat(w.selected)]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.selectedOpacity,")"):(0,s.X4)(t.palette.primary.main,t.palette.action.selectedOpacity),["&.".concat(w.focusVisible)]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / calc(").concat(t.vars.palette.action.selectedOpacity," + ").concat(t.vars.palette.action.focusOpacity,"))"):(0,s.X4)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},["&.".concat(w.selected,":hover")]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / calc(").concat(t.vars.palette.action.selectedOpacity," + ").concat(t.vars.palette.action.hoverOpacity,"))"):(0,s.X4)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.selectedOpacity,")"):(0,s.X4)(t.palette.primary.main,t.palette.action.selectedOpacity)}},["&.".concat(w.focusVisible)]:{backgroundColor:(t.vars||t).palette.action.focus},["&.".concat(w.disabled)]:{opacity:(t.vars||t).palette.action.disabledOpacity},["& + .".concat(v.A.root)]:{marginTop:t.spacing(1),marginBottom:t.spacing(1)},["& + .".concat(v.A.inset)]:{marginLeft:52},["& .".concat(g.A.root)]:{marginTop:0,marginBottom:0},["& .".concat(g.A.inset)]:{paddingLeft:36},["& .".concat(f.A.root)]:{minWidth:36}},!r.dense&&{[t.breakpoints.up("sm")]:{minHeight:"auto"}},r.dense&&(0,a.A)({minHeight:32,paddingTop:4,paddingBottom:4},t.typography.body2,{["& .".concat(f.A.root," svg")]:{fontSize:"1.25rem"}}))})),R=o.forwardRef((function(e,t){const r=(0,c.A)({props:e,name:"MuiMenuItem"}),{autoFocus:s=!1,component:d="li",dense:p=!1,divider:v=!1,disableGutters:f=!1,focusVisibleClassName:g,role:b="menuitem",tabIndex:A,className:w}=r,R=(0,i.A)(r,C),M=o.useContext(u.A),k=o.useMemo((()=>({dense:p||M.dense||!1,disableGutters:f})),[M.dense,p,f]),W=o.useRef(null);(0,m.A)((()=>{s&&W.current&&W.current.focus()}),[s]);const I=(0,a.A)({},r,{dense:k.dense,divider:v,disableGutters:f}),T=(e=>{const{disabled:t,dense:r,divider:i,disableGutters:o,selected:n,classes:s}=e,d={root:["root",r&&"dense",t&&"disabled",!o&&"gutters",i&&"divider",n&&"selected"]},c=(0,l.A)(d,x,s);return(0,a.A)({},s,c)})(r),F=(0,h.A)(W,t);let L;return r.disabled||(L=void 0!==A?A:-1),(0,y.jsx)(u.A.Provider,{value:k,children:(0,y.jsx)(S,(0,a.A)({ref:F,role:b,tabIndex:L,component:d,focusVisibleClassName:(0,n.A)(T.focusVisible,g),className:(0,n.A)(T.root,w)},R,{ownerState:I,classes:T}))})}))},67784:(e,t,r)=>{r.d(t,{A:()=>R});var i=r(58168),a=r(98587),o=r(65043),n=r(58387),l=r(68606),s=r(20992),d=r(34535),c=r(72876),u=r(65761),p=r(1833),m=r(69859),h=r(18356),v=r(53193),f=r(81673),g=r(11659),b=r(57056),A=r(32400);function x(e){return(0,A.Ay)("MuiTextField",e)}(0,b.A)("MuiTextField",["root"]);var w=r(70579);const y=["autoComplete","autoFocus","children","className","color","defaultValue","disabled","error","FormHelperTextProps","fullWidth","helperText","id","InputLabelProps","inputProps","InputProps","inputRef","label","maxRows","minRows","multiline","name","onBlur","onChange","onFocus","placeholder","required","rows","select","SelectProps","type","value","variant"],C={standard:u.A,filled:p.A,outlined:m.A},S=(0,d.Ay)(v.A,{name:"MuiTextField",slot:"Root",overridesResolver:(e,t)=>t.root})({}),R=o.forwardRef((function(e,t){const r=(0,c.A)({props:e,name:"MuiTextField"}),{autoComplete:o,autoFocus:d=!1,children:u,className:p,color:m="primary",defaultValue:v,disabled:b=!1,error:A=!1,FormHelperTextProps:R,fullWidth:M=!1,helperText:k,id:W,InputLabelProps:I,inputProps:T,InputProps:F,inputRef:L,label:N,maxRows:G,minRows:z,multiline:V=!1,name:P,onBlur:j,onChange:O,onFocus:B,placeholder:q,required:H=!1,rows:D,select:X=!1,SelectProps:K,type:_,value:E,variant:J="outlined"}=r,Q=(0,a.A)(r,y),U=(0,i.A)({},r,{autoFocus:d,color:m,disabled:b,error:A,fullWidth:M,multiline:V,required:H,select:X,variant:J}),Y=(e=>{const{classes:t}=e;return(0,l.A)({root:["root"]},x,t)})(U);const Z={};"outlined"===J&&(I&&"undefined"!==typeof I.shrink&&(Z.notched=I.shrink),Z.label=N),X&&(K&&K.native||(Z.id=void 0),Z["aria-describedby"]=void 0);const $=(0,s.A)(W),ee=k&&$?"".concat($,"-helper-text"):void 0,te=N&&$?"".concat($,"-label"):void 0,re=C[J],ie=(0,w.jsx)(re,(0,i.A)({"aria-describedby":ee,autoComplete:o,autoFocus:d,defaultValue:v,fullWidth:M,multiline:V,name:P,rows:D,maxRows:G,minRows:z,type:_,value:E,id:$,inputRef:L,onBlur:j,onChange:O,onFocus:B,placeholder:q,inputProps:T},Z,F));return(0,w.jsxs)(S,(0,i.A)({className:(0,n.A)(Y.root,p),disabled:b,error:A,fullWidth:M,ref:t,required:H,color:m,variant:J,ownerState:U},Q,{children:[null!=N&&""!==N&&(0,w.jsx)(h.A,(0,i.A)({htmlFor:$,id:te},I,{children:N})),X?(0,w.jsx)(g.A,(0,i.A)({"aria-describedby":ee,id:$,labelId:te,value:E,input:ie},K,{children:u})):ie,k&&(0,w.jsx)(f.A,(0,i.A)({id:ee},R,{children:k}))]}))}))},79644:(e,t,r)=>{r.d(t,{A:()=>i});const i=(0,r(30920).Ay)()}}]);
//# sourceMappingURL=1198.fd3a2249.chunk.js.map