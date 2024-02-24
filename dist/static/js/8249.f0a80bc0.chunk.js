"use strict";(self.webpackChunksanitrack_web=self.webpackChunksanitrack_web||[]).push([[8249],{44196:(e,a,t)=>{t.d(a,{A:()=>n});var s=t(77154),o=t(65043),r=t(73216);const n=()=>{const e="http://52.55.254.57:5000/api/",a=(0,r.Zp)(),[t,n]=(0,o.useState)(),[c,i]=(0,o.useState)([]),[l,d]=(0,o.useState)([]),[u,A]=(0,o.useState)(1),[h,g]=(0,o.useState)(!1),[m,f]=(0,o.useState)([]),[p,x]=(0,o.useState)([]),b=localStorage.getItem("auth-token");return{addStaff:async t=>{await s.A.post("".concat(e,"create-user"),t,{headers:{Authorization:"Bearer ".concat(b)}}).then((e=>{n("Staff Added."),console.log("Here is staff added response",e.json()),a("/home/user")})).catch((e=>{if(e.response){const{status:a,data:t}=e.response;400===a&&t&&t.message?(n(t.message),console.log("An error occured",t.message)):(console.log("Axios error:",t.err.details[0].message),alert(t.err.details[0].message))}else console.log("Network error:",e.message)}))},responseMessage:t,getStaffById:async a=>{try{const t=await s.A.get("".concat(e,"get-user?userId=").concat(a),{headers:{Authorization:"Bearer ".concat(b)}});return t.data}catch(t){return console.error("Error fetching user details for ID ".concat(a,":"),t),null}},getStaffByUserName:async a=>{await s.A.get("".concat(e,"staff/?userName=").concat(a),{headers:{Authorization:"Bearer ".concat(b)}}).then((e=>{d(e.data.data)})).catch((e=>{if(e.response){const{status:a,data:t}=e.response;400===a&&t&&t.message?(n(t.message),console.log("An error occurred",t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},staffByName:l,getAllStaffs:async(a,t)=>{g(!0),await s.A.get("".concat(e,"get-all-users?page=").concat(a,"&documentCount=").concat(t),{headers:{Authorization:"Bearer ".concat(b)}}).then((e=>{g(!1),i(e.data.data.allUsers),A(Math.ceil(e.data.data.totalUsers/t))})).catch((e=>{if(g(!1),e.response){const{status:a,data:t}=e.response;400===a&&t&&t.message?(n(t.message),console.log("An error occurred",t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},allStaffs:c,fireStaff:async t=>{await s.A.put("".concat(e,"delete-user"),{staffId:t},{headers:{Authorization:"Bearer ".concat(b)}}).then((e=>{console.log(e.data),a("/home/user")})).catch((e=>{if(e.response){const{status:a,data:t}=e.response;400===a&&t&&t.message?(n(t.message),console.log("An error occurred",t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},restoreStaff:async t=>{await s.A.put("".concat(e,"update-user-status"),{staffId:t},{headers:{Authorization:"Bearer ".concat(b)}}).then((e=>{console.log(e.data),a("/home/user")})).catch((e=>{if(e.response){const{status:a,data:t}=e.response;400===a&&t&&t.message?(n(t.message),console.log("An error occurred",t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},totalPages:u,isLoading:h,getAllCleaners:async()=>{try{const a=await s.A.get("".concat(e,"get-all-cleaner"),{headers:{Authorization:"Bearer ".concat(b)}});console.log("All cleaners",a.data.data.allCleaners),f(a.data.data.allCleaners)}catch(a){console.log(a)}},getAllInspectors:async()=>{try{const a=await s.A.get("".concat(e,"get-all-inspector"),{headers:{Authorization:"Bearer ".concat(b)}});x(a.data.data.allInspectors)}catch(a){console.log(a)}},allCleaners:m,allInspectors:p}}},18249:(e,a,t)=>{t.r(a),t.d(a,{default:()=>S});var s=t(65043),o=t(19252),r=t(96446),n=t(85865),c=t(11906),i=t(19090),l=t(73216),d=t(44196),u=t(79650),A=t(71806),h=t(84882),g=t(28076),m=t(10039),f=t(73460),p=t(70579);const x=e=>{let{allStaffs:a}=e;const[t,o]=(0,s.useState)(""),{fireStaff:r,restoreStaff:i}=(0,d.A)();(0,l.Zp)();return(0,p.jsx)(u.A,{children:(0,p.jsxs)(A.A,{children:[(0,p.jsx)(h.A,{children:(0,p.jsxs)(g.A,{children:[(0,p.jsx)(m.A,{children:"Staff Name"}),(0,p.jsx)(m.A,{children:"Email"}),(0,p.jsx)(m.A,{children:"Phone Number"}),(0,p.jsx)(m.A,{children:"Action"})]})}),(0,p.jsx)(f.A,{children:a?a.map((e=>(0,p.jsxs)(g.A,{children:[(0,p.jsx)(m.A,{children:e.username}),(0,p.jsx)(m.A,{children:e.email}),(0,p.jsx)(m.A,{children:e.phone_number}),(0,p.jsx)(m.A,{children:"INACTIVE"===e.flag?(0,p.jsx)(c.A,{variant:"contained",className:"view-btn",onClick:()=>(async e=>{await i(e),o("ACTIVE")})(e._id),children:"Restore"}):(0,p.jsx)(c.A,{variant:"contained",style:{backgroundColor:"red"},onClick:()=>(async e=>{await r(e),o("INACTIVE")})(e._id),children:"Disengage"})})]},e._id))):(0,p.jsx)(g.A,{children:(0,p.jsx)(m.A,{colSpan:4,children:(0,p.jsx)(n.A,{children:"No staff available."})})})})]})})};var b=t(79453);const S=()=>{const e=(0,l.Zp)(),{getAllStaffs:a,allStaffs:t,isLoading:u}=(0,d.A)(),[A,h]=(0,s.useState)(0),[g,m]=(0,s.useState)(10);(0,s.useEffect)((()=>{a()}),[]);const f=t.slice(A*g,A*g+g);return(0,p.jsx)(o.A,{children:u?(0,p.jsx)(b.A,{}):(0,p.jsxs)(o.A,{children:[(0,p.jsxs)(r.A,{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:5,paddingBottom:5,children:[(0,p.jsx)(n.A,{variant:"h2",children:"All Staffs"}),(0,p.jsx)(c.A,{variant:"contained",onClick:()=>{e("/dashboard/add-user")},children:"Create New Staff"})]}),(0,p.jsx)(x,{allStaffs:f}),(0,p.jsx)(i.A,{component:"div",count:t.length,rowsPerPage:g,page:A,onPageChange:(e,a)=>{h(a)},onRowsPerPageChange:e=>{m(parseInt(e.target.value,10)),h(0)},rowsPerPageOptions:[5,10,25,100]})]})})}},19252:(e,a,t)=>{t.d(a,{A:()=>v});var s=t(98587),o=t(58168),r=t(65043),n=t(58387),c=t(90410),i=t(32400),l=t(68606),d=t(52900),u=t(79644),A=t(27322),h=t(70579);const g=["className","component","disableGutters","fixed","maxWidth","classes"],m=(0,A.A)(),f=(0,u.A)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:t}=e;return[a.root,a["maxWidth".concat((0,c.A)(String(t.maxWidth)))],t.fixed&&a.fixed,t.disableGutters&&a.disableGutters]}}),p=e=>(0,d.A)({props:e,name:"MuiContainer",defaultTheme:m});var x=t(6803),b=t(34535),S=t(72876);const w=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{createStyledComponent:a=f,useThemeProps:t=p,componentName:d="MuiContainer"}=e,u=a((e=>{let{theme:a,ownerState:t}=e;return(0,o.A)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:a.spacing(2),paddingRight:a.spacing(2),[a.breakpoints.up("sm")]:{paddingLeft:a.spacing(3),paddingRight:a.spacing(3)}})}),(e=>{let{theme:a,ownerState:t}=e;return t.fixed&&Object.keys(a.breakpoints.values).reduce(((e,t)=>{const s=t,o=a.breakpoints.values[s];return 0!==o&&(e[a.breakpoints.up(s)]={maxWidth:"".concat(o).concat(a.breakpoints.unit)}),e}),{})}),(e=>{let{theme:a,ownerState:t}=e;return(0,o.A)({},"xs"===t.maxWidth&&{[a.breakpoints.up("xs")]:{maxWidth:Math.max(a.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[a.breakpoints.up(t.maxWidth)]:{maxWidth:"".concat(a.breakpoints.values[t.maxWidth]).concat(a.breakpoints.unit)}})})),A=r.forwardRef((function(e,a){const r=t(e),{className:A,component:m="div",disableGutters:f=!1,fixed:p=!1,maxWidth:x="lg"}=r,b=(0,s.A)(r,g),S=(0,o.A)({},r,{component:m,disableGutters:f,fixed:p,maxWidth:x}),w=((e,a)=>{const{classes:t,fixed:s,disableGutters:o,maxWidth:r}=e,n={root:["root",r&&"maxWidth".concat((0,c.A)(String(r))),s&&"fixed",o&&"disableGutters"]};return(0,l.A)(n,(e=>(0,i.Ay)(a,e)),t)})(S,d);return(0,h.jsx)(u,(0,o.A)({as:m,ownerState:S,className:(0,n.A)(w.root,A),ref:a},b))}));return A}({createStyledComponent:(0,b.Ay)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:t}=e;return[a.root,a["maxWidth".concat((0,x.A)(String(t.maxWidth)))],t.fixed&&a.fixed,t.disableGutters&&a.disableGutters]}}),useThemeProps:e=>(0,S.A)({props:e,name:"MuiContainer"})}),v=w},79650:(e,a,t)=>{t.d(a,{A:()=>f});var s=t(58168),o=t(98587),r=t(65043),n=t(58387),c=t(68606),i=t(72876),l=t(34535),d=t(57056),u=t(32400);function A(e){return(0,u.Ay)("MuiTableContainer",e)}(0,d.A)("MuiTableContainer",["root"]);var h=t(70579);const g=["className","component"],m=(0,l.Ay)("div",{name:"MuiTableContainer",slot:"Root",overridesResolver:(e,a)=>a.root})({width:"100%",overflowX:"auto"}),f=r.forwardRef((function(e,a){const t=(0,i.A)({props:e,name:"MuiTableContainer"}),{className:r,component:l="div"}=t,d=(0,o.A)(t,g),u=(0,s.A)({},t,{component:l}),f=(e=>{const{classes:a}=e;return(0,c.A)({root:["root"]},A,a)})(u);return(0,h.jsx)(m,(0,s.A)({ref:a,as:l,className:(0,n.A)(f.root,r),ownerState:u},d))}))},84882:(e,a,t)=>{t.d(a,{A:()=>b});var s=t(58168),o=t(98587),r=t(65043),n=t(58387),c=t(68606),i=t(21573),l=t(72876),d=t(34535),u=t(57056),A=t(32400);function h(e){return(0,A.Ay)("MuiTableHead",e)}(0,u.A)("MuiTableHead",["root"]);var g=t(70579);const m=["className","component"],f=(0,d.Ay)("thead",{name:"MuiTableHead",slot:"Root",overridesResolver:(e,a)=>a.root})({display:"table-header-group"}),p={variant:"head"},x="thead",b=r.forwardRef((function(e,a){const t=(0,l.A)({props:e,name:"MuiTableHead"}),{className:r,component:d=x}=t,u=(0,o.A)(t,m),A=(0,s.A)({},t,{component:d}),b=(e=>{const{classes:a}=e;return(0,c.A)({root:["root"]},h,a)})(A);return(0,g.jsx)(i.A.Provider,{value:p,children:(0,g.jsx)(f,(0,s.A)({as:d,className:(0,n.A)(b.root,r),ref:a,role:d===x?null:"rowgroup",ownerState:A},u))})}))},79644:(e,a,t)=>{t.d(a,{A:()=>s});const s=(0,t(30920).Ay)()}}]);
//# sourceMappingURL=8249.f0a80bc0.chunk.js.map