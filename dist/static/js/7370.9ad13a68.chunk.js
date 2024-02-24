"use strict";(self.webpackChunksanitrack_web=self.webpackChunksanitrack_web||[]).push([[7370],{32667:(e,o,t)=>{t.d(o,{A:()=>n});var s=t(77154),a=t(65043),r=t(73216);const n=()=>{const e="http://52.55.254.57:5000/api/",o=(0,r.Zp)(),[t,n]=(0,a.useState)(),[c,i]=(0,a.useState)([]),[l,d]=(0,a.useState)([]),[m,u]=(0,a.useState)(!1),[g,h]=(0,a.useState)(),p=localStorage.getItem("auth-token");return{addRoom:async t=>{u(!0),await s.A.post("".concat(e,"room/create-room"),t,{headers:{Authorization:"Bearer ".concat(p)}}).then((e=>{u(!1),n(e.data.message),o("/dashboard/rooms")})).catch((e=>{if(u(!1),e.response){const{status:o,data:t}=e.response;400===o&&t&&t.message?(n(t.message),console.log("An error occured",t.message)):403===o&&t&&t.message?(console.log("An error with status 403 occured",t.message),n(t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},responseMessage:t,getRoom:async()=>{u(!0),await s.A.get("".concat(e,"/room/get"),{headers:{Authorization:"Bearer ".concat(p)}}).then((e=>{u(!1),i(e.data.data.allRooms),h(e.data.data.allRooms.length)})).catch((e=>{if(u(!1),e.response){const{status:o,data:t}=e.response;400===o&&t&&t.message?(n(t.message),console.log("An error occured",t.message)):403===o&&t&&t.message?(console.log("An error with status 403 occured",t.message),n(t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},allRooms:c,getRoomById:async o=>{await s.A.get("".concat(e,"/room/get-single?roomId=").concat(o),{headers:{Authorization:"Bearer ".concat(p)}}).then((e=>{d(e.data.data),console.log("omah",e.data.data)})).catch((e=>{if(e.response){const{status:o,data:t}=e.response;400===o&&t&&t.message?(n(t.message),console.log("An error occured",t.message)):403===o&&t&&t.message?(console.log("An error with status 403 occured",t.message),n(t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},allRoomsById:l,updateRoomDetail:async t=>{await s.A.put("".concat(e,"room/update-room"),t,{headers:{Authorization:"Bearer ".concat(p)}}).then((e=>{n(e.data.message),o("/dashboard/rooms")})).catch((e=>{if(e.response){const{status:o,data:t}=e.response;400===o&&t&&t.message?(n(t.message),console.log("An error occured",t.message)):403===o&&t&&t.message?(console.log("An error with status 403 occured",t.message),n(t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},deleteRoom:async t=>{await s.A.delete("".concat(e,"room/delete?roomId=").concat(t),{headers:{Authorization:"Bearer ".concat(p)}}).then((e=>{console.log(e),o("/dashboard/rooms")})).catch((e=>{if(e.response){const{status:o,data:t}=e.response;400===o&&t&&t.message?(n(t.message),console.log("An error occured",t.message)):403===o&&t&&t.message?(console.log("An error with status 403 occured",t.message),n(t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},roomsCount:g,isLoading:m}}},37370:(e,o,t)=>{t.r(o),t.d(o,{default:()=>A});var s=t(65043),a=t(73216),r=t(32667),n=t(79453),c=t(19252),i=t(85865),l=t(79650),d=t(71806),m=t(84882),u=t(28076),g=t(10039),h=t(73460),p=t(19090),x=t(70579);const A=()=>{const{getRoom:e,allRooms:o,deleteRoom:t,isLoading:A}=(0,r.A)(),b=(0,a.Zp)(),[f,w]=(0,s.useState)(0),[v,y]=(0,s.useState)(5);(0,s.useEffect)((()=>{e()}),[]);const j=(e,o)=>{w(o)},R=e=>{y(+e.target.value),w(0)},k=()=>{b("/dashboard/add-room")};return A?(0,x.jsx)(n.A,{}):(0,x.jsx)(c.A,{maxWidth:"lg",children:(0,x.jsxs)("div",{className:"center-me",children:[(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,x.jsx)(i.A,{variant:"h2",gutterBottom:!0,children:"All Rooms"}),(0,x.jsx)("button",{disabled:A,className:"text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 ",onClick:k,children:"Create New Room"})]}),(0,x.jsx)("div",{style:{marginTop:"20px"},children:(0,x.jsxs)(l.A,{children:[(0,x.jsxs)(d.A,{id:"taskTable",children:[(0,x.jsx)(m.A,{children:(0,x.jsxs)(u.A,{children:[(0,x.jsx)(g.A,{children:"Room name"}),(0,x.jsx)(g.A,{children:"Location"}),(0,x.jsx)(g.A,{children:"Action"})]})}),(0,x.jsx)(h.A,{children:o.slice(f*v,f*v+v).map((o=>(0,x.jsxs)(u.A,{children:[(0,x.jsx)(g.A,{children:o.roomName}),(0,x.jsx)(g.A,{children:"".concat(o.location.city,", ").concat(o.location.state," ").concat(o.location.country)}),(0,x.jsxs)(g.A,{className:"flex gap-x-3",children:[(0,x.jsx)("button",{disabled:A,className:"text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 ",onClick:()=>{return e=o._id,void b("/dashboard/view-details/".concat(e));var e},children:"View Details"}),(0,x.jsx)("button",{disabled:A,className:"text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-black w-auto lg:h-[40px] text-base border-t-2 ",onClick:()=>(async o=>{await t(o),e()})(o._id),children:"Delete"})]})]},o._id)))})]}),(0,x.jsx)(p.A,{component:"div",count:o.length,rowsPerPage:v,page:f,onPageChange:j,onRowsPerPageChange:R,rowsPerPageOptions:[5,10,25]})]})})]})})}},19252:(e,o,t)=>{t.d(o,{A:()=>y});var s=t(98587),a=t(58168),r=t(65043),n=t(58387),c=t(90410),i=t(32400),l=t(68606),d=t(52900),m=t(79644),u=t(27322),g=t(70579);const h=["className","component","disableGutters","fixed","maxWidth","classes"],p=(0,u.A)(),x=(0,m.A)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,o["maxWidth".concat((0,c.A)(String(t.maxWidth)))],t.fixed&&o.fixed,t.disableGutters&&o.disableGutters]}}),A=e=>(0,d.A)({props:e,name:"MuiContainer",defaultTheme:p});var b=t(6803),f=t(34535),w=t(72876);const v=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{createStyledComponent:o=x,useThemeProps:t=A,componentName:d="MuiContainer"}=e,m=o((e=>{let{theme:o,ownerState:t}=e;return(0,a.A)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:o.spacing(2),paddingRight:o.spacing(2),[o.breakpoints.up("sm")]:{paddingLeft:o.spacing(3),paddingRight:o.spacing(3)}})}),(e=>{let{theme:o,ownerState:t}=e;return t.fixed&&Object.keys(o.breakpoints.values).reduce(((e,t)=>{const s=t,a=o.breakpoints.values[s];return 0!==a&&(e[o.breakpoints.up(s)]={maxWidth:"".concat(a).concat(o.breakpoints.unit)}),e}),{})}),(e=>{let{theme:o,ownerState:t}=e;return(0,a.A)({},"xs"===t.maxWidth&&{[o.breakpoints.up("xs")]:{maxWidth:Math.max(o.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[o.breakpoints.up(t.maxWidth)]:{maxWidth:"".concat(o.breakpoints.values[t.maxWidth]).concat(o.breakpoints.unit)}})})),u=r.forwardRef((function(e,o){const r=t(e),{className:u,component:p="div",disableGutters:x=!1,fixed:A=!1,maxWidth:b="lg"}=r,f=(0,s.A)(r,h),w=(0,a.A)({},r,{component:p,disableGutters:x,fixed:A,maxWidth:b}),v=((e,o)=>{const{classes:t,fixed:s,disableGutters:a,maxWidth:r}=e,n={root:["root",r&&"maxWidth".concat((0,c.A)(String(r))),s&&"fixed",a&&"disableGutters"]};return(0,l.A)(n,(e=>(0,i.Ay)(o,e)),t)})(w,d);return(0,g.jsx)(m,(0,a.A)({as:p,ownerState:w,className:(0,n.A)(v.root,u),ref:o},f))}));return u}({createStyledComponent:(0,f.Ay)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,o["maxWidth".concat((0,b.A)(String(t.maxWidth)))],t.fixed&&o.fixed,t.disableGutters&&o.disableGutters]}}),useThemeProps:e=>(0,w.A)({props:e,name:"MuiContainer"})}),y=v},79650:(e,o,t)=>{t.d(o,{A:()=>x});var s=t(58168),a=t(98587),r=t(65043),n=t(58387),c=t(68606),i=t(72876),l=t(34535),d=t(57056),m=t(32400);function u(e){return(0,m.Ay)("MuiTableContainer",e)}(0,d.A)("MuiTableContainer",["root"]);var g=t(70579);const h=["className","component"],p=(0,l.Ay)("div",{name:"MuiTableContainer",slot:"Root",overridesResolver:(e,o)=>o.root})({width:"100%",overflowX:"auto"}),x=r.forwardRef((function(e,o){const t=(0,i.A)({props:e,name:"MuiTableContainer"}),{className:r,component:l="div"}=t,d=(0,a.A)(t,h),m=(0,s.A)({},t,{component:l}),x=(e=>{const{classes:o}=e;return(0,c.A)({root:["root"]},u,o)})(m);return(0,g.jsx)(p,(0,s.A)({ref:o,as:l,className:(0,n.A)(x.root,r),ownerState:m},d))}))},84882:(e,o,t)=>{t.d(o,{A:()=>f});var s=t(58168),a=t(98587),r=t(65043),n=t(58387),c=t(68606),i=t(21573),l=t(72876),d=t(34535),m=t(57056),u=t(32400);function g(e){return(0,u.Ay)("MuiTableHead",e)}(0,m.A)("MuiTableHead",["root"]);var h=t(70579);const p=["className","component"],x=(0,d.Ay)("thead",{name:"MuiTableHead",slot:"Root",overridesResolver:(e,o)=>o.root})({display:"table-header-group"}),A={variant:"head"},b="thead",f=r.forwardRef((function(e,o){const t=(0,l.A)({props:e,name:"MuiTableHead"}),{className:r,component:d=b}=t,m=(0,a.A)(t,p),u=(0,s.A)({},t,{component:d}),f=(e=>{const{classes:o}=e;return(0,c.A)({root:["root"]},g,o)})(u);return(0,h.jsx)(i.A.Provider,{value:A,children:(0,h.jsx)(x,(0,s.A)({as:d,className:(0,n.A)(f.root,r),ref:o,role:d===b?null:"rowgroup",ownerState:u},m))})}))},79644:(e,o,t)=>{t.d(o,{A:()=>s});const s=(0,t(30920).Ay)()}}]);
//# sourceMappingURL=7370.9ad13a68.chunk.js.map