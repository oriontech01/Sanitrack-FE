"use strict";(self.webpackChunksanitrack_web=self.webpackChunksanitrack_web||[]).push([[4432],{27171:(e,s,r)=>{r.d(s,{A:()=>t});var o=r(77154),a=r(65043),n=r(73216);const t=()=>{const e=(0,n.Zp)(),s="http://52.55.254.57:5000/api/",r=localStorage.getItem("auth-token"),[t,i]=(0,a.useState)([]),[c,l]=(0,a.useState)([]),[d,h]=(0,a.useState)();return{getPermissionByRole:async e=>{await o.A.get("".concat(s,"permissions/role-id?roleId=").concat(e),{headers:{Authorization:"Bearer ".concat(r)}}).then((e=>{null==e.data.data?i(e.data.message):i(e.data.data.permissions)})).catch((e=>{if(e.response){const{status:s,data:r}=e.response;400===s&&r&&r.message?(h(r.message),console.log("An error occured",r.message)):403===s&&r&&r.message?(console.log("An error with status 403 occured",r.message),h(r.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},rolePermissions:t,getPermissions:async()=>{await o.A.get("".concat(s,"permissions"),{headers:{Authorization:"Bearer ".concat(r)}}).then((e=>{l(e.data.data.allPermissions)})).catch((e=>{if(e.response){const{status:s,data:r}=e.response;400===s&&r&&r.message?(h(r.message),console.log("An error occured",r.message)):403===s&&r&&r.message?(console.log("An error with status 403 occured",r.message),h(r.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},allPermissions:c,addPermission:async a=>{await o.A.post("".concat(s,"permissions/add"),{permission_name:a},{headers:{Authorization:"Bearer ".concat(r)}}).then((s=>{e("/dashboard/permissions")})).catch((e=>{if(e.response){const{status:s,data:r}=e.response;400===s&&r&&r.message?h(r.message):403===s&&r&&r.message?(console.log("An error with status 403 occured",r.message),h(r.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},errorResponse:d,assignPermission:async a=>{await o.A.post("".concat(s,"permissions/assign"),a,{headers:{Authorization:"Bearer ".concat(r)}}).then((s=>{e("/dashboard/permissions")})).catch((s=>{if(s.response){const{status:r,data:o}=s.response;400===r&&o&&o.message?(h(o.message),e("/dashboard/roles")):403===r&&o&&o.message?e("/"):console.log("Axios error:",s)}else console.log("Network error:",s.message)}))},revokePermission:async a=>{await o.A.post("".concat(s,"permissions/delete"),a,{headers:{Authorization:"Bearer ".concat(r)}}).then((s=>{e("/dashboard/roles")})).catch((s=>{if(s.response){const{status:r,data:o}=s.response;400===r&&o&&o.message?(h(o.message),e("/dashboard/roles")):403===r&&o&&o.message?e("/"):console.log("Axios error:",s)}else console.log("Network error:",s.message)}))}}}},99356:(e,s,r)=>{r.d(s,{A:()=>k});var o=r(65043),a=r(96446),n=r(51962),t=r(85865),i=r(79650),c=r(71806),l=r(73460),d=r(28076),h=r(10039),g=r(19090),m=r(11906),u=r(79644),A=r(27171);var p=r(70579);const v=(0,u.A)("div")((e=>{let{theme:s}=e;return{marginBottom:s.spacing(2)}})),k=e=>{let{permissions:s,showCheckBox:r,showButton:u,roleId:k,showRevoke:x}=e;const[f,w]=(0,o.useState)([]),{assignPermission:y,revokePermission:S}=(0,A.A)(),[j,P]=(0,o.useState)(0),[b,C]=(0,o.useState)(2),R=function(e,s){const r=[];for(let o=0;o<e.length;o+=s)r.push(e.slice(o,o+s));return r}(s,5),B=R.slice(j*b,j*b+b);return(0,p.jsxs)(a.A,{children:[r&&(0,p.jsxs)(v,{children:[(0,p.jsx)(n.A,{checked:f.length===s.length,onChange:()=>{f.length===s.length?w([]):w(s.map((e=>e._id)))}}),(0,p.jsx)(t.A,{variant:"body1",children:"Check All"})]}),(0,p.jsx)(i.A,{children:(0,p.jsx)(c.A,{children:(0,p.jsx)(a.A,{padding:2,display:"grid",gap:2,alignContent:"center",justifyContent:"center",gridTemplateColumns:"repeat(".concat(b,", 1fr)"),children:B.map(((e,s)=>(0,p.jsxs)(l.A,{children:[(0,p.jsx)(d.A,{children:(0,p.jsx)(h.A,{colSpan:r?2:1,children:(0,p.jsxs)(t.A,{variant:"h6",children:["Group ",j*b+s+1]})})}),e.map(((e,s)=>(0,p.jsx)(d.A,{children:r?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(h.A,{children:(0,p.jsx)(n.A,{checked:f.includes(e._id),onChange:()=>{return s=e._id,void w((e=>e.includes(s)?e.filter((e=>e!==s)):[...e,s]));var s}})}),(0,p.jsx)(h.A,{children:e.permission_name})]}):(0,p.jsx)(h.A,{children:e.permission_name})},s)))]},s)))})})}),(0,p.jsx)(g.A,{component:"div",count:R.length,rowsPerPage:b,page:j,onPageChange:(e,s)=>{P(s)},onRowsPerPageChange:e=>{C(parseInt(e.target.value,10)),P(0)},rowsPerPageOptions:[1,2,3,5]}),u&&(0,p.jsx)(m.A,{variant:"contained",color:"primary",onClick:async e=>{e.preventDefault(),await y({})},disabled:"Select Role"===k||f.length<1,style:{marginTop:12},children:"Assign"}),x&&(0,p.jsx)(m.A,{variant:"contained",color:"secondary",onClick:async e=>{e.preventDefault(),await S({})},disabled:"Select Role"===k||f.length<1,style:{marginTop:12},children:"Revoke Permission"})]})}},14432:(e,s,r)=>{r.r(s),r.d(s,{default:()=>d});var o=r(73216),a=r(27171),n=r(65043),t=r(99356),i=r(85865),c=r(81637),l=r(70579);const d=()=>{const{id:e}=(0,o.g)(),s=e;console.log("USE PARAMS",(0,o.g)());const{getPermissionByRole:r,rolePermissions:d}=(0,a.A)();return(0,n.useEffect)((()=>{(async()=>{await r(s)})()}),[]),(0,l.jsxs)("div",{children:[(0,l.jsx)(i.A,{variant:"h2",children:"Role Permissions"}),null!==d?(0,l.jsx)("div",{children:"string"===typeof d?(0,l.jsx)(i.A,{variant:"body1",children:d}):(0,l.jsx)(t.A,{permissions:d,showButton:!1,showRevoke:!0,showCheckBox:!0,roleId:s})}):(0,l.jsx)(c.A,{})]})}},81637:(e,s,r)=>{r.d(s,{A:()=>M});var o=r(57528),a=r(98587),n=r(58168),t=r(65043),i=r(58387),c=r(68606),l=r(83290),d=r(6803),h=r(72876),g=r(34535),m=r(57056),u=r(32400);function A(e){return(0,u.Ay)("MuiCircularProgress",e)}(0,m.A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var p,v,k,x,f=r(70579);const w=["className","color","disableShrink","size","style","thickness","value","variant"];let y,S,j,P;const b=44,C=(0,l.i7)(y||(y=p||(p=(0,o.A)(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"])))),R=(0,l.i7)(S||(S=v||(v=(0,o.A)(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"])))),B=(0,g.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,s)=>{const{ownerState:r}=e;return[s.root,s[r.variant],s["color".concat((0,d.A)(r.color))]]}})((e=>{let{ownerState:s,theme:r}=e;return(0,n.A)({display:"inline-block"},"determinate"===s.variant&&{transition:r.transitions.create("transform")},"inherit"!==s.color&&{color:(r.vars||r).palette[s.color].main})}),(e=>{let{ownerState:s}=e;return"indeterminate"===s.variant&&(0,l.AH)(j||(j=k||(k=(0,o.A)(["\n      animation: "," 1.4s linear infinite;\n    "]))),C)})),D=(0,g.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,s)=>s.svg})({display:"block"}),N=(0,g.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,s)=>{const{ownerState:r}=e;return[s.circle,s["circle".concat((0,d.A)(r.variant))],r.disableShrink&&s.circleDisableShrink]}})((e=>{let{ownerState:s,theme:r}=e;return(0,n.A)({stroke:"currentColor"},"determinate"===s.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===s.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(e=>{let{ownerState:s}=e;return"indeterminate"===s.variant&&!s.disableShrink&&(0,l.AH)(P||(P=x||(x=(0,o.A)(["\n      animation: "," 1.4s ease-in-out infinite;\n    "]))),R)})),M=t.forwardRef((function(e,s){const r=(0,h.A)({props:e,name:"MuiCircularProgress"}),{className:o,color:t="primary",disableShrink:l=!1,size:g=40,style:m,thickness:u=3.6,value:p=0,variant:v="indeterminate"}=r,k=(0,a.A)(r,w),x=(0,n.A)({},r,{color:t,disableShrink:l,size:g,thickness:u,value:p,variant:v}),y=(e=>{const{classes:s,variant:r,color:o,disableShrink:a}=e,n={root:["root",r,"color".concat((0,d.A)(o))],svg:["svg"],circle:["circle","circle".concat((0,d.A)(r)),a&&"circleDisableShrink"]};return(0,c.A)(n,A,s)})(x),S={},j={},P={};if("determinate"===v){const e=2*Math.PI*((b-u)/2);S.strokeDasharray=e.toFixed(3),P["aria-valuenow"]=Math.round(p),S.strokeDashoffset="".concat(((100-p)/100*e).toFixed(3),"px"),j.transform="rotate(-90deg)"}return(0,f.jsx)(B,(0,n.A)({className:(0,i.A)(y.root,o),style:(0,n.A)({width:g,height:g},j,m),ownerState:x,ref:s,role:"progressbar"},P,k,{children:(0,f.jsx)(D,{className:y.svg,ownerState:x,viewBox:"".concat(22," ").concat(22," ").concat(b," ").concat(b),children:(0,f.jsx)(N,{className:y.circle,style:S,ownerState:x,cx:b,cy:b,r:(b-u)/2,fill:"none",strokeWidth:u})})}))}))}}]);
//# sourceMappingURL=4432.14a87798.chunk.js.map