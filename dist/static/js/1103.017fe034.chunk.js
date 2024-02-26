"use strict";(self.webpackChunksanitrack_web=self.webpackChunksanitrack_web||[]).push([[1103],{929:(e,t,a)=>{a.d(t,{A:()=>r});var o=a(77154),n=a(65043);const r=()=>{const e="http://52.55.254.57:5000/api/",t=localStorage.getItem("auth-token"),[a,r]=(0,n.useState)([]),[s,i]=(0,n.useState)([]);return{getRoom:async()=>{await o.A.get("".concat(e,"evidence/room-name"),{headers:{Authorization:"Bearer ".concat(t)}}).then((e=>{r(e.data.data)})).catch((e=>{if(e.response){const{status:t,data:a}=e.response;400===t&&a&&a.message?(setResponseMessage(a.message),console.log("An error occured",a.message)):403===t&&a&&a.message?(console.log("An error with status 403 occured",a.message),setResponseMessage(a.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},allRooms:a,getImages:async a=>{await o.A.get("".concat(e,"evidence/images?taskId=").concat(a),{headers:{Authorization:"Bearer ".concat(t)}}).then((e=>{i(e.data.data)})).catch((e=>{if(e.response){const{status:t,data:a}=e.response;400===t&&a&&a.message?(setResponseMessage(a.message),console.log("An error occured",a.message)):403===t&&a&&a.message?(console.log("An error with status 403 occured",a.message),setResponseMessage(a.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},allImages:s}}},21103:(e,t,a)=>{a.r(t),a.d(t,{default:()=>R});var o=a(73216),n=a(929),r=a(65043),s=a(19252),i=a(85865),c=a(68903),d=a(12110),l=a(98587),m=a(58168),u=a(58387),v=a(68606),g=a(72876),p=a(34535),A=a(57056),h=a(32400);function x(e){return(0,h.Ay)("MuiCardMedia",e)}(0,A.A)("MuiCardMedia",["root","media","img"]);var f=a(70579);const b=["children","className","component","image","src","style"],k=(0,p.Ay)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e,{isMediaComponent:o,isImageComponent:n}=a;return[t.root,o&&t.media,n&&t.img]}})((e=>{let{ownerState:t}=e;return(0,m.A)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},t.isMediaComponent&&{width:"100%"},t.isImageComponent&&{objectFit:"cover"})})),w=["video","audio","picture","iframe","img"],M=["picture","img"],y=r.forwardRef((function(e,t){const a=(0,g.A)({props:e,name:"MuiCardMedia"}),{children:o,className:n,component:r="div",image:s,src:i,style:c}=a,d=(0,l.A)(a,b),p=-1!==w.indexOf(r),A=!p&&s?(0,m.A)({backgroundImage:'url("'.concat(s,'")')},c):c,h=(0,m.A)({},a,{component:r,isMediaComponent:p,isImageComponent:-1!==M.indexOf(r)}),y=(e=>{const{classes:t,isMediaComponent:a,isImageComponent:o}=e,n={root:["root",a&&"media",o&&"img"]};return(0,v.A)(n,x,t)})(h);return(0,f.jsx)(k,(0,m.A)({className:(0,u.A)(y.root,n),as:r,role:!p&&s?"img":void 0,ref:t,style:A,ownerState:h,src:p?s||i:void 0},d,{children:o}))}));var C=a(79453);const R=()=>{const{taskId:e}=(0,o.g)(),{getImages:t,allImages:a}=(0,n.A)(),[l,m]=(0,r.useState)(!1);return(0,r.useEffect)((()=>{(async()=>{m(!0),await t(e),m(!1)})()}),[]),l?(0,f.jsx)(C.A,{}):(0,f.jsxs)(s.A,{className:"evidence-container",children:[(0,f.jsxs)(i.A,{variant:"h2",gutterBottom:!0,children:["Gallery for Task ",e]}),(0,f.jsx)(c.Ay,{container:!0,spacing:2,className:"gallery-images",children:a&&a.length>0?a.map(((e,t)=>(0,f.jsx)(c.Ay,{item:!0,xs:12,sm:6,md:4,lg:3,children:(0,f.jsx)(d.A,{children:(0,f.jsx)(y,{component:"img",image:"empty"!==e.image_url?e.image_url:"",alt:"Image ".concat(t+1),style:{height:"auto",width:"100%",objectFit:"cover",marginTop:"10px"}})})},t))):(0,f.jsx)(c.Ay,{item:!0,xs:12,children:(0,f.jsx)(i.A,{variant:"body1",children:"No image has been uploaded for this task"})})})]})}},12110:(e,t,a)=>{a.d(t,{A:()=>h});var o=a(58168),n=a(98587),r=a(65043),s=a(58387),i=a(68606),c=a(34535),d=a(72876),l=a(63336),m=a(57056),u=a(32400);function v(e){return(0,u.Ay)("MuiCard",e)}(0,m.A)("MuiCard",["root"]);var g=a(70579);const p=["className","raised"],A=(0,c.Ay)(l.A,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({overflow:"hidden"}))),h=r.forwardRef((function(e,t){const a=(0,d.A)({props:e,name:"MuiCard"}),{className:r,raised:c=!1}=a,l=(0,n.A)(a,p),m=(0,o.A)({},a,{raised:c}),u=(e=>{const{classes:t}=e;return(0,i.A)({root:["root"]},v,t)})(m);return(0,g.jsx)(A,(0,o.A)({className:(0,s.A)(u.root,r),elevation:c?8:void 0,ref:t,ownerState:m},l))}))},19252:(e,t,a)=>{a.d(t,{A:()=>w});var o=a(98587),n=a(58168),r=a(65043),s=a(58387),i=a(90410),c=a(32400),d=a(68606),l=a(52900),m=a(79644),u=a(27322),v=a(70579);const g=["className","component","disableGutters","fixed","maxWidth","classes"],p=(0,u.A)(),A=(0,m.A)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t["maxWidth".concat((0,i.A)(String(a.maxWidth)))],a.fixed&&t.fixed,a.disableGutters&&t.disableGutters]}}),h=e=>(0,l.A)({props:e,name:"MuiContainer",defaultTheme:p});var x=a(6803),f=a(34535),b=a(72876);const k=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{createStyledComponent:t=A,useThemeProps:a=h,componentName:l="MuiContainer"}=e,m=t((e=>{let{theme:t,ownerState:a}=e;return(0,n.A)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!a.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}})}),(e=>{let{theme:t,ownerState:a}=e;return a.fixed&&Object.keys(t.breakpoints.values).reduce(((e,a)=>{const o=a,n=t.breakpoints.values[o];return 0!==n&&(e[t.breakpoints.up(o)]={maxWidth:"".concat(n).concat(t.breakpoints.unit)}),e}),{})}),(e=>{let{theme:t,ownerState:a}=e;return(0,n.A)({},"xs"===a.maxWidth&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},a.maxWidth&&"xs"!==a.maxWidth&&{[t.breakpoints.up(a.maxWidth)]:{maxWidth:"".concat(t.breakpoints.values[a.maxWidth]).concat(t.breakpoints.unit)}})})),u=r.forwardRef((function(e,t){const r=a(e),{className:u,component:p="div",disableGutters:A=!1,fixed:h=!1,maxWidth:x="lg"}=r,f=(0,o.A)(r,g),b=(0,n.A)({},r,{component:p,disableGutters:A,fixed:h,maxWidth:x}),k=((e,t)=>{const{classes:a,fixed:o,disableGutters:n,maxWidth:r}=e,s={root:["root",r&&"maxWidth".concat((0,i.A)(String(r))),o&&"fixed",n&&"disableGutters"]};return(0,d.A)(s,(e=>(0,c.Ay)(t,e)),a)})(b,l);return(0,v.jsx)(m,(0,n.A)({as:p,ownerState:b,className:(0,s.A)(k.root,u),ref:t},f))}));return u}({createStyledComponent:(0,f.Ay)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t["maxWidth".concat((0,x.A)(String(a.maxWidth)))],a.fixed&&t.fixed,a.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,b.A)({props:e,name:"MuiContainer"})}),w=k},63336:(e,t,a)=>{a.d(t,{A:()=>x});var o=a(98587),n=a(58168),r=a(65043),s=a(58387),i=a(68606),c=a(53650),d=a(34535);const l=e=>{let t;return t=e<1?5.11916*e**2:4.5*Math.log(e+1)+2,(t/100).toFixed(2)};var m=a(72876),u=a(57056),v=a(32400);function g(e){return(0,v.Ay)("MuiPaper",e)}(0,u.A)("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);var p=a(70579);const A=["className","component","elevation","square","variant"],h=(0,d.Ay)("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],!a.square&&t.rounded,"elevation"===a.variant&&t["elevation".concat(a.elevation)]]}})((e=>{let{theme:t,ownerState:a}=e;var o;return(0,n.A)({backgroundColor:(t.vars||t).palette.background.paper,color:(t.vars||t).palette.text.primary,transition:t.transitions.create("box-shadow")},!a.square&&{borderRadius:t.shape.borderRadius},"outlined"===a.variant&&{border:"1px solid ".concat((t.vars||t).palette.divider)},"elevation"===a.variant&&(0,n.A)({boxShadow:(t.vars||t).shadows[a.elevation]},!t.vars&&"dark"===t.palette.mode&&{backgroundImage:"linear-gradient(".concat((0,c.X4)("#fff",l(a.elevation)),", ").concat((0,c.X4)("#fff",l(a.elevation)),")")},t.vars&&{backgroundImage:null==(o=t.vars.overlays)?void 0:o[a.elevation]}))})),x=r.forwardRef((function(e,t){const a=(0,m.A)({props:e,name:"MuiPaper"}),{className:r,component:c="div",elevation:d=1,square:l=!1,variant:u="elevation"}=a,v=(0,o.A)(a,A),x=(0,n.A)({},a,{component:c,elevation:d,square:l,variant:u}),f=(e=>{const{square:t,elevation:a,variant:o,classes:n}=e,r={root:["root",o,!t&&"rounded","elevation"===o&&"elevation".concat(a)]};return(0,i.A)(r,g,n)})(x);return(0,p.jsx)(h,(0,n.A)({as:c,ownerState:x,className:(0,s.A)(f.root,r),ref:t},v))}))},79644:(e,t,a)=>{a.d(t,{A:()=>o});const o=(0,a(30920).Ay)()}}]);
//# sourceMappingURL=1103.017fe034.chunk.js.map