"use strict";(self.webpackChunkcis_photoshop_api_docs=self.webpackChunkcis_photoshop_api_docs||[]).push([[8],{96008:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var o,r,c,i,s,a=t(15007),l=t(1597),d=t(95223);!function(e){e.Call="call",e.Reply="reply",e.Syn="syn",e.SynAck="synAck",e.Ack="ack"}(o||(o={})),function(e){e.Fulfilled="fulfilled",e.Rejected="rejected"}(r||(r={})),function(e){e.ConnectionDestroyed="ConnectionDestroyed",e.ConnectionTimeout="ConnectionTimeout",e.NoIframeSrc="NoIframeSrc"}(c||(c={})),function(e){e.DataCloneError="DataCloneError"}(i||(i={})),function(e){e.Message="message"}(s||(s={}));const u={"http:":"80","https:":"443"},g=/^(https?:)?\/\/([^/:]+)?(:(\d+))?/,m=["file:","data:"];const h=e=>{let{name:n,message:t,stack:o}=e;return{name:n,message:t,stack:o}};let f=0;var p=()=>++f;const v=e=>e?e.split("."):[],w=(e,n,t)=>{const o=v(n);return o.reduce(((e,n,r)=>(void 0===e[n]&&(e[n]={}),r===o.length-1&&(e[n]=t),e[n])),e),e},y=(e,n)=>{const t={};return Object.keys(e).forEach((o=>{const r=e[o],c=((e,n)=>{const t=v(n||"");return t.push(e),(e=>e.join("."))(t)})(o,n);"object"==typeof r&&Object.assign(t,y(r,c)),"function"==typeof r&&(t[c]=r)})),t};var S=(e,n,t,i,a)=>{const{localName:l,local:d,remote:u,originForSending:g,originForReceiving:m}=n;let h=!1;a("".concat(l,": Connecting call sender"));const f=e=>function(){for(var n=arguments.length,t=new Array(n),f=0;f<n;f++)t[f]=arguments[f];let v;a("".concat(l,": Sending ").concat(e,"() call"));try{u.closed&&(v=!0)}catch(w){v=!0}if(v&&i(),h){const n=new Error("Unable to send ".concat(e,"() call due ")+"to destroyed connection");throw n.code=c.ConnectionDestroyed,n}return new Promise(((n,c)=>{const i=p(),h=t=>{if(t.source!==u||t.data.penpal!==o.Reply||t.data.id!==i)return;if("*"!==m&&t.origin!==m)return void a("".concat(l," received message from origin ").concat(t.origin," which did not match expected origin ").concat(m));const g=t.data;a("".concat(l,": Received ").concat(e,"() reply")),d.removeEventListener(s.Message,h);let f=g.returnValue;g.returnValueIsError&&(f=(e=>{const n=new Error;return Object.keys(e).forEach((t=>n[t]=e[t])),n})(f)),(g.resolution===r.Fulfilled?n:c)(f)};d.addEventListener(s.Message,h);const f={penpal:o.Call,id:i,methodName:e,args:t};u.postMessage(f,g)}))},v=t.reduce(((e,n)=>(e[n]=f(n),e)),{});return Object.assign(e,(e=>{const n={};for(const t in e)w(n,t,e[t]);return n})(v)),()=>{h=!0}},E=(e,n,t,c,a)=>{const{destroy:l,onDestroy:d}=c;let u,g;const m={};return c=>{if("*"!==n&&c.origin!==n)return void a("Parent: Handshake - Received ACK message from origin ".concat(c.origin," which did not match expected origin ").concat(n));a("Parent: Handshake - Received ACK");const f={localName:"Parent",local:window,remote:c.source,originForSending:t,originForReceiving:n};u&&u(),u=((e,n,t)=>{const{localName:c,local:a,remote:l,originForSending:d,originForReceiving:u}=e;let g=!1;const m=e=>{if(e.source!==l||e.data.penpal!==o.Call)return;if("*"!==u&&e.origin!==u)return void t("".concat(c," received message from origin ").concat(e.origin," which did not match expected origin ").concat(u));const s=e.data,{methodName:a,args:m,id:f}=s;t("".concat(c,": Received ").concat(a,"() call"));const p=e=>n=>{if(t("".concat(c,": Sending ").concat(a,"() reply")),g)return void t("".concat(c,": Unable to send ").concat(a,"() reply due to destroyed connection"));const s={penpal:o.Reply,id:f,resolution:e,returnValue:n};e===r.Rejected&&n instanceof Error&&(s.returnValue=h(n),s.returnValueIsError=!0);try{l.postMessage(s,d)}catch(u){if(u.name===i.DataCloneError){const e={penpal:o.Reply,id:f,resolution:r.Rejected,returnValue:h(u),returnValueIsError:!0};l.postMessage(e,d)}throw u}};new Promise((e=>e(n[a].apply(n,m)))).then(p(r.Fulfilled),p(r.Rejected))};return a.addEventListener(s.Message,m),()=>{g=!0,a.removeEventListener(s.Message,m)}})(f,e,a),d(u),g&&g.forEach((e=>{delete m[e]})),g=c.data.methodNames;const p=S(m,f,g,l,a);return d(p),m}};var k=e=>{let{iframe:n,methods:t={},childOrigin:r,timeout:i,debug:a=!1}=e;const l=(e=>function(){if(e){for(var n=arguments.length,t=new Array(n),o=0;o<n;o++)t[o]=arguments[o];console.log("[Penpal]",...t)}})(a),d=((e,n)=>{const t=[];let o=!1;return{destroy(r){o||(o=!0,n("".concat(e,": Destroying connection")),t.forEach((e=>{e(r)})))},onDestroy(e){o?e():t.push(e)}}})("Parent",l),{onDestroy:h,destroy:f}=d;r||((e=>{if(!e.src&&!e.srcdoc){const e=new Error("Iframe must have src or srcdoc property defined.");throw e.code=c.NoIframeSrc,e}})(n),r=(e=>{if(e&&m.find((n=>e.startsWith(n))))return"null";const n=document.location,t=g.exec(e);let o,r,c;t?(o=t[1]?t[1]:n.protocol,r=t[2],c=t[4]):(o=n.protocol,r=n.hostname,c=n.port);const i=c&&c!==u[o]?":".concat(c):"";return"".concat(o,"//").concat(r).concat(i)})(n.src));const p="null"===r?"*":r,v=y(t),w=((e,n,t,r)=>c=>{if(!c.source)return;if("*"!==t&&c.origin!==t)return void e("Parent: Handshake - Received SYN message from origin ".concat(c.origin," which did not match expected origin ").concat(t));e("Parent: Handshake - Received SYN, responding with SYN-ACK");const i={penpal:o.SynAck,methodNames:Object.keys(n)};c.source.postMessage(i,r)})(l,v,r,p),S=E(v,r,p,d,l),k=new Promise(((e,t)=>{const r=((e,n)=>{let t;return void 0!==e&&(t=window.setTimeout((()=>{const t=new Error("Connection timed out after ".concat(e,"ms"));t.code=c.ConnectionTimeout,n(t)}),e)),()=>{clearTimeout(t)}})(i,f),a=t=>{if(t.source===n.contentWindow&&t.data)if(t.data.penpal!==o.Syn)if(t.data.penpal!==o.Ack);else{const n=S(t);n&&(r(),e(n))}else w(t)};window.addEventListener(s.Message,a),l("Parent: Awaiting handshake"),((e,n)=>{const{destroy:t,onDestroy:o}=n,r=setInterval((()=>{e.isConnected||(clearInterval(r),t())}),6e4);o((()=>{clearInterval(r)}))})(n,d),h((e=>{window.removeEventListener(s.Message,a),e&&t(e)}))}));return{promise:k,destroy(){f()}}};var I=t(42075),C=t(26777),R=t(158);var b=e=>{let{src:n,height:t="calc(100vh - var(--spectrum-global-dimension-size-800))",location:o}=e;const r=(0,a.useRef)(null),{ims:c,isLoadingIms:i}=(0,a.useContext)(C.Z);let s;const{0:u,1:g}=(0,a.useState)(null),{0:m,1:h}=(0,a.useState)(!1);(0,a.useEffect)((()=>{u&&(0===r.current.clientHeight?u.onHide():u.onShow())}),[o.pathname]),(0,a.useEffect)((()=>{if(h(!1),null!=r&&!i){s=window.adobeIMS;const e=p();return()=>{e.destroy()}}}),[r,i]);const f=(0,R.Bm)(n)?n:(0,l.dq)(n),p=()=>{const e=k({iframe:r.current,childOrigin:(0,R.Bm)(n)?new URL(n).origin:window.origin,methods:{scrollTop(e){var n;void 0===e&&(e=0),null!==(n=document)&&void 0!==n&&n.scrollingElement&&(document.scrollingElement.scrollTop=e)},getURL(){var e,n;return null===(e=window)||void 0===e||null===(n=e.location)||void 0===n?void 0:n.href},setURL(e){var n;null!==(n=window)&&void 0!==n&&n.location&&(window.location=e)},setHeight(e){r.current.style.height=e},getIMSAccessToken(){var e;return null!==(e=s)&&void 0!==e&&e.isSignedInUser()?s.getAccessToken():null},getIMSProfile(){var e;return null!==(e=s)&&void 0!==e&&e.isSignedInUser()?s.getProfile():null},signIn(){s&&!s.isSignedInUser()&&s.signIn()},signOut(){s&&s.isSignedInUser()&&s.signOut()},getIMSClientId(){return s?s.adobeIdData.client_id:null}}});return e.promise.then((e=>{0===r.current.clientHeight?e.onHide():e.onShow(),g(e)})),h(!0),e};return(0,d.tZ)(a.default.Fragment,null,(0,d.tZ)("iframe",{title:"Main content",ref:r,src:m?f:"",css:(0,d.iv)("display:block;height:",t,";width:100%;border:none;","")}),(0,d.tZ)(I.$,null))}}}]);
//# sourceMappingURL=8-272c41c226a81c2c8453.js.map