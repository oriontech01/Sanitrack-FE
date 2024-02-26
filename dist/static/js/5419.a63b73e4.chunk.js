"use strict";(self.webpackChunksanitrack_web=self.webpackChunksanitrack_web||[]).push([[5419],{44196:(e,a,t)=>{t.d(a,{A:()=>n});var s=t(77154),o=t(65043),r=t(73216);const n=()=>{const e="http://52.55.254.57:5000/api/",a=(0,r.Zp)(),[t,n]=(0,o.useState)(),[c,l]=(0,o.useState)([]),[i,d]=(0,o.useState)([]),[g,h]=(0,o.useState)(1),[u,m]=(0,o.useState)(!1),[y,A]=(0,o.useState)([]),[p,f]=(0,o.useState)([]),x=localStorage.getItem("auth-token");return{addStaff:async t=>{await s.A.post("".concat(e,"create-user"),t,{headers:{Authorization:"Bearer ".concat(x)}}).then((e=>{n("Staff Added."),console.log("Here is staff added response",e.json()),a("/home/user")})).catch((e=>{if(e.response){const{status:a,data:t}=e.response;400===a&&t&&t.message?(n(t.message),console.log("An error occured",t.message)):(console.log("Axios error:",t.err.details[0].message),alert(t.err.details[0].message))}else console.log("Network error:",e.message)}))},responseMessage:t,getStaffById:async a=>{try{const t=await s.A.get("".concat(e,"get-user?userId=").concat(a),{headers:{Authorization:"Bearer ".concat(x)}});return t.data}catch(t){return console.error("Error fetching user details for ID ".concat(a,":"),t),null}},getStaffByUserName:async a=>{await s.A.get("".concat(e,"staff/?userName=").concat(a),{headers:{Authorization:"Bearer ".concat(x)}}).then((e=>{d(e.data.data)})).catch((e=>{if(e.response){const{status:a,data:t}=e.response;400===a&&t&&t.message?(n(t.message),console.log("An error occurred",t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},staffByName:i,getAllStaffs:async(a,t)=>{m(!0),await s.A.get("".concat(e,"get-all-users?page=").concat(a,"&documentCount=").concat(t),{headers:{Authorization:"Bearer ".concat(x)}}).then((e=>{m(!1),l(e.data.data.allUsers),h(Math.ceil(e.data.data.totalUsers/t))})).catch((e=>{if(m(!1),e.response){const{status:a,data:t}=e.response;400===a&&t&&t.message?(n(t.message),console.log("An error occurred",t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},allStaffs:c,fireStaff:async t=>{await s.A.put("".concat(e,"delete-user"),{staffId:t},{headers:{Authorization:"Bearer ".concat(x)}}).then((e=>{console.log(e.data),a("/home/user")})).catch((e=>{if(e.response){const{status:a,data:t}=e.response;400===a&&t&&t.message?(n(t.message),console.log("An error occurred",t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},restoreStaff:async t=>{await s.A.put("".concat(e,"update-user-status"),{staffId:t},{headers:{Authorization:"Bearer ".concat(x)}}).then((e=>{console.log(e.data),a("/home/user")})).catch((e=>{if(e.response){const{status:a,data:t}=e.response;400===a&&t&&t.message?(n(t.message),console.log("An error occurred",t.message)):console.log("Axios error:",e)}else console.log("Network error:",e.message)}))},totalPages:g,isLoading:u,getAllCleaners:async()=>{try{const a=await s.A.get("".concat(e,"get-all-cleaner"),{headers:{Authorization:"Bearer ".concat(x)}});console.log("All cleaners",a.data.data.allCleaners),A(a.data.data.allCleaners)}catch(a){console.log(a)}},getAllInspectors:async()=>{try{const a=await s.A.get("".concat(e,"get-all-inspector"),{headers:{Authorization:"Bearer ".concat(x)}});f(a.data.data.allInspectors)}catch(a){console.log(a)}},allCleaners:y,allInspectors:p}}},66961:(e,a,t)=>{t.d(a,{A:()=>r});var s=t(77154),o=t(65043);const r=()=>{const[e,a]=(0,o.useState)([]),[t,r]=(0,o.useState)(!1),n="http://52.55.254.57:5000/api/",c=localStorage.getItem("auth-token");return{getCleanerSummary:async()=>{r(!0);try{const e=await s.A.get("".concat(n,"/work-history/cleaner-task-summary"),{headers:{Authorization:"Bearer ".concat(c)}});a(e.data.data)}catch(e){console.error(e)}finally{r(!1)}},getCleanerHistory:async e=>{try{const a=await s.A.get("".concat(n,"work-history/cleaner?cleanerId=").concat(e),{headers:{Authorization:"Bearer ".concat(c)}});return console.log("Cleaner history",a.data.data),a.data.data}catch(a){return console.error("Error fetching cleaner history:",a),null}},getInspectorHistory:async e=>{try{return(await s.A.get("".concat(n,"work-history/inspector?inspectorId=").concat(e),{headers:{Authorization:"Bearer ".concat(c)}})).data.data}catch(a){return console.error("Error fetching inspector history:",a),null}},getRoomHistory:async e=>{try{const a=await s.A.get("".concat(n,"work-history/rooms?roomId=").concat(e),{headers:{Authorization:"Bearer ".concat(c)}});return console.log("HAS THE DATA BEEN FETCHED?",a.data.data),a.data.data}catch(a){return console.error("Error fetching room history:",a),null}},cleanerSummary:e,isLoading:t}}},46943:(e,a,t)=>{t.d(a,{A:()=>i});var s=t(65043),o=t(37625),r=t(85865),n=t(96446),c=t(11906),l=t(70579);const i=e=>{let{name:a,detailId:t,historyData:i}=e;const[d,g]=(0,s.useState)(!1);return(0,l.jsxs)("div",{className:"work-history",children:[(0,l.jsx)(o.A,{open:d,onClose:()=>g(!1),"aria-labelledby":"history-details-modal","aria-describedby":"history-details-description",style:{display:"flex",alignItems:"center",justifyContent:"center"},children:(0,l.jsx)(n.A,{sx:{backgroundColor:"white",padding:"2rem",borderRadius:"10px",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.1)",width:"70vw",maxHeight:"80vh",overflowY:"auto"},children:i&&i.length>0?i.map(((e,a)=>(0,l.jsxs)("div",{className:"assignment",style:{marginBottom:"30px",padding:"10px",backgroundColor:a%2===0?"#f3f3f3":"#e6e6e6"},children:[(0,l.jsxs)(r.A,{variant:"h5",className:"room-name",children:["Room: ",e.assigned_room.roomName]}),(0,l.jsxs)(r.A,{variant:"body1",className:"detail-id",children:["Detail ID: ",t]}),(0,l.jsxs)(r.A,{variant:"body1",className:"status",style:{color:e.isSubmitted?"#28a745":"#dc3545"},children:["Status: ",e.isSubmitted?"Submitted":"Not Submitted"]}),(0,l.jsx)(r.A,{variant:"h6",className:"tasks-heading",children:"Tasks:"}),e.tasks&&e.tasks.length>0?e.tasks.map(((e,a)=>(0,l.jsxs)(n.A,{className:"task",style:{padding:"10px",backgroundColor:e.isDone?"#d9ead3":"#f8d7da"},children:[(0,l.jsxs)(r.A,{variant:"body1",className:"task-name",style:{color:e.isDone?"#155724":"#721c24"},children:["Task Name: ",e.name]}),(0,l.jsxs)(r.A,{variant:"body1",className:"task-status",style:{color:e.isDone?"#155724":"#721c24"},children:["Task Status: ",e.isDone?"Done":"Pending"]}),"empty"!==e.image&&(0,l.jsx)("img",{src:e.image,alt:e.name,className:"task-image",style:{width:"100px",height:"100px",borderRadius:"5px",marginTop:"10px"}})]},a))):(0,l.jsx)(r.A,{variant:"body1",className:"no-tasks",children:"No tasks available."})]},a))):(0,l.jsx)(r.A,{variant:"body1",className:"no-history",children:"No history available."})})}),(0,l.jsxs)(n.A,{display:"flex",margin:5,justifyContent:"space-between",alignItems:"center",bgcolor:"#f3f3f3",padding:2,borderRadius:5,boxShadow:3,children:[(0,l.jsx)(r.A,{variant:"h3",children:a}),(0,l.jsx)(c.A,{variant:"outlined",onClick:()=>g(!0),children:"View History"})]})]})}},45419:(e,a,t)=>{t.r(a),t.d(a,{default:()=>g});var s=t(65043),o=t(96446),r=t(85865),n=t(46943),c=t(44196),l=t(66961),i=t(79453),d=t(70579);const g=()=>{const{getAllInspectors:e,allInspectors:a}=(0,c.A)(),{getInspectorHistory:t}=(0,l.A)(),[g,h]=(0,s.useState)({}),[u,m]=(0,s.useState)(!0);return(0,s.useEffect)((()=>{(async()=>{if(await e(),a.length>0){const e=a.map((e=>t(e._id))),s=await Promise.all(e),o={};a.forEach(((e,a)=>{o[e._id]=s[a]})),h(o)}m(!1)})()}),[]),(0,d.jsxs)(o.A,{children:[(0,d.jsx)(r.A,{variant:"h3",p:2,gutterBottom:!0,children:"Inspector History"}),u?(0,d.jsx)(i.A,{}):a.length>0?a.map((e=>(0,d.jsx)(n.A,{name:e.username,detailId:e._id,historyData:g[e._id]},e._id))):(0,d.jsx)(r.A,{variant:"body1",children:"No inspector history available."})]})}}}]);
//# sourceMappingURL=5419.a63b73e4.chunk.js.map