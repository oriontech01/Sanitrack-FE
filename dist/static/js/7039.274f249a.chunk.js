(self.webpackChunksanitrack_web=self.webpackChunksanitrack_web||[]).push([[7039],{61697:(e,s,l)=>{var a={"./ar.json":24122,"./be.json":37212,"./cs.json":63439,"./de.json":53090,"./en.json":96714,"./es.json":10009,"./fa.json":36132,"./fi.json":24076,"./fr.json":58369,"./hi.json":67930,"./it.json":39756,"./ja.json":79912,"./kr.json":14692,"./nl.json":5675,"./pl.json":28521,"./pt.json":82449,"./ru.json":74908,"./sa.json":21033,"./tr.json":90111,"./uk.json":36689,"./vi.json":88540,"./zh.json":82371};function n(e){var s=r(e);return l(s)}function r(e){if(!l.o(a,e)){var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}return a[e]}n.keys=function(){return Object.keys(a)},n.resolve=r,e.exports=n,n.id=61697},45663:(e,s,l)=>{"use strict";l.r(s),l.d(s,{default:()=>o});var a=l(65043),n=l(70579);const r=e=>{let{data:s,setChat:l}=e;return(0,n.jsx)("div",{className:"bg-white h-[550px] shadow-lg border-r-2",children:(0,n.jsxs)("div",{className:"pt-10 pl-2",children:[(0,n.jsx)("header",{className:"border-b border-gray-300 pb-3 ",children:(0,n.jsx)("h1",{className:"text-center text-2xl font-semibold text-gray-600",children:"Chats"})}),(0,n.jsx)("ul",{id:"messages",className:"flex flex-col space-y-4 py-3 overflow-y-auto h-[550px]   scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",children:s.map((e=>{var s;return(0,n.jsx)("li",{onClick:()=>l(e),className:"py-3 sm:py-4 shadow-sm cursor-pointer px-2 hover:bg-gray-100",children:(0,n.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,n.jsx)("div",{className:"w-12 h-12 bg-blue-700 flex justify-center items-center rounded-full",children:(0,n.jsx)("p",{className:"text-[#fff] text-lg",children:null===e||void 0===e||null===(s=e.userName)||void 0===s?void 0:s.charAt(0)})}),(0,n.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,n.jsx)("p",{className:"text-lg font-semibold text-gray-900 truncate ",children:null===e||void 0===e?void 0:e.userName}),(0,n.jsx)("p",{className:"text-sm font-semiboldf text-black truncate capitalize dark:text-gray-400",children:null===e||void 0===e?void 0:e.role})]})]})},null===e||void 0===e?void 0:e.name)}))})]})})};var t=l(85254);l(86494);const i=e=>{var s,l,r,i,o;let{chats:c}=e;console.log("===================================="),console.log(c),console.log("====================================");const[d,u]=(0,a.useState)("");return(0,a.useEffect)((()=>{var e,s;console.log("yellll"),null===c||void 0===c||null===(e=c.chat)||void 0===e||null===(s=e.sentMessages)||void 0===s||s.map((e=>console.log("key",e)))}),[c]),(0,n.jsx)("div",{children:(0,n.jsxs)("div",{className:"flex-1 p:2 sm:p-6 justify-between flex flex-col h-[550px]",children:[(0,n.jsx)("div",{className:"flex sm:items-center justify-between py-3 border-b-2 border-gray-200",children:(0,n.jsxs)("div",{className:"relative flex items-center space-x-4",children:[(0,n.jsx)("div",{className:"w-12 h-12 bg-blue-700 flex justify-center items-center rounded-full",children:(0,n.jsx)("p",{className:"text-[#fff] text-lg",children:null===c||void 0===c||null===(s=c.userName)||void 0===s?void 0:s.charAt(0)})}),(0,n.jsxs)("div",{className:"flex flex-col leading-tight",children:[(0,n.jsx)("div",{className:"text-2xl mt-1 flex ",children:(0,n.jsx)("span",{className:"text-gray-700 mr-3",children:null===c||void 0===c?void 0:c.userName})}),(0,n.jsxs)("span",{className:"text-lg text-gray-400 capitalize",children:["-",null===c||void 0===c?void 0:c.role]})]})]})}),(0,n.jsx)("div",{id:"messages",className:"flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",children:(0,n.jsxs)(n.Fragment,{children:[null===c||void 0===c||null===(l=c.chat)||void 0===l||null===(r=l.sentMessages)||void 0===r?void 0:r.map((e=>{var s,l;return(0,n.jsxs)("div",{className:"chat-message",children:[(null===c||void 0===c||null===(s=c.chat)||void 0===s?void 0:s.sentMessages)&&(0,n.jsxs)("div",{className:"flex items-end",children:[(0,n.jsx)("div",{className:"flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start",children:(0,n.jsx)("div",{children:(0,n.jsx)("span",{className:"px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600",children:e})})}),(0,n.jsx)("div",{className:"w-7 h-7 bg-gray-300 flex justify-center items-center rounded-full",children:(0,n.jsx)("p",{className:"text-[#fff] text-lg",children:null===c||void 0===c||null===(l=c.userName)||void 0===l?void 0:l.charAt(0)})})]})," "]},e)})),null===c||void 0===c||null===(i=c.chat)||void 0===i||null===(o=i.receivedMessages)||void 0===o?void 0:o.map((e=>{var s,l;return(null===c||void 0===c||null===(s=c.chat)||void 0===s?void 0:s.receivedMessages)&&(0,n.jsxs)("div",{className:"flex items-end justify-end",children:[(0,n.jsx)("div",{className:"flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end",children:(0,n.jsx)("div",{children:(0,n.jsx)("span",{className:"px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ",children:e})})}),(0,n.jsx)("div",{className:"w-7 h-7 bg-blue-700 flex justify-center items-center rounded-full",children:(0,n.jsx)("p",{className:"text-[#fff] text-lg",children:null===c||void 0===c||null===(l=c.userName)||void 0===l?void 0:l.charAt(0)})})]},e)}))]})}),(0,n.jsx)("div",{className:"border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0",children:(0,n.jsxs)("div",{className:"  gap-2 space-x-4 flex",children:[(0,n.jsx)(t.A,{value:d,onChange:u,cleanOnEnter:!0,onEnter:function(e){console.log("enter",e)},placeholder:"Type a message",className:"w-72"}),(0,n.jsx)("div",{className:" right-0 items-center inset-y-0 hidden sm:flex ",children:(0,n.jsxs)("button",{type:"button",className:"inline-flex items-center justify-center rounded-lg px-4 py-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none",children:[(0,n.jsx)("span",{className:"font-bold",children:"Send"}),(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:"h-6 w-6 ml-2 transform rotate-90",children:(0,n.jsx)("path",{d:"M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"})})]})})]})})]})})},o=()=>{const[e,s]=(0,a.useState)([]),[l,t]=(0,a.useState)(""),[o,c]=(0,a.useState)(!0);(0,a.useRef)(null);let d=[{id:1,userName:"General ",role:"group",chat:{id:1,sentMessages:["Hello there!","How are you doing?"],receivedMessages:["Hi!","I'm good, thanks."]}},{id:2,userName:"Richard Achonye",role:"user",chat:{id:2,sentMessages:["Hey!","What's up?"],receivedMessages:["Not much.","Just chilling."]}},{id:3,userName:"Trent Arnold",role:"user",chat:{id:3,sentMessages:["Hi everyone!","How's your day?"],receivedMessages:["Hello!","It's going well, thanks."]}},{id:4,userName:"James Blake",role:"user",chat:{id:4,sentMessages:["Good morning!","What's on the agenda today?"],receivedMessages:["Morning!","Just work as usual."]}}];const[u,x]=(0,a.useState)(d[0]);return(0,n.jsx)("main",{className:" bg-[#fff] h-screen",children:(0,n.jsxs)("section",{className:"flex justify-center gap-4 lg:grid-flow-row h-[550px]",children:[(0,n.jsx)("div",{className:"lg:w-3/10 md:w-1/3 m-5 p-5 bg-white h-[550px] ",children:(0,n.jsx)(r,{data:d,setChat:x})}),(0,n.jsx)("div",{className:"lg:w-7/10 md:w-2/3 p-5 text-center bg-white m-5",children:(0,n.jsx)(i,{chats:u})})]})})}}}]);
//# sourceMappingURL=7039.274f249a.chunk.js.map