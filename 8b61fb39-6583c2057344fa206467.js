(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[714],{6561:function(i,e,t){"use strict";t.d(e,{a:function(){return Z}});var n=t(9756),a=t(5007),s=t(4922),r=t(2905),o=t(7087),m=t(2390),l=["heading","links","buttons","icons","image","video","theme","width","isCentered"];var d={2:0,3:0,4:0},c=["margin-left: 0;","margin-right: 0;"],p=function(i){var e=i.icons,t=i.isCentered;return e?(0,a.cloneElement)(e,{css:(0,s.iv)("list-style:none;padding:0;margin-bottom:var(--spectrum-global-dimension-size-400)!important;display:flex;justify-content:",t?"center":"flex-start",";& li{display:flex;border-right:1px solid var(--spectrum-global-color-gray-300);height:var(--spectrum-global-dimension-size-600);margin-right:var(--spectrum-global-dimension-size-150);}& li:last-of-type{padding-right:0;border-right:none;}.gatsby-resp-image-wrapper{position:relative;width:var(--spectrum-global-dimension-size-800)!important;}.gatsby-resp-image-image{position:absolute;top:0;left:0;height:100%;object-fit:contain;}","")}):null},g=function(i){var e=i.texts;return Object.keys(e).filter((function(i){return i.startsWith("text")})).map((function(i){return e[i]}))},u=function(i){var e=i.links,t=i.isCentered;return e?(0,a.cloneElement)(e,{css:(0,s.iv)("list-style:none;padding:0;display:flex;justify-content:",t?"center":"flex-start",";margin-top:",t?"var(--spectrum-global-dimension-size-200) !important;":"var(--spectrum-global-dimension-size-600) !important;",";& li{display:flex;align-items:center;height:var(--spectrum-global-dimension-size-400);}& li a{white-space:nowrap;margin-right:var(--spectrum-global-dimension-size-600);}& li:last-of-type a{margin-right:0;}.gatsby-resp-image-wrapper{max-width:none!important;width:100%!important;height:100%!important;}.gatsby-resp-image-wrapper{width:var(--spectrum-global-dimension-size-400)!important;margin-left:0!important;margin-right:var(--spectrum-global-dimension-size-150)!important;}.gatsby-resp-image-image{object-fit:contain;}@media screen and (max-width: ",m.LU,"){flex-direction:column;align-items:",t?"center":"left",";li{margin-top:var(--spectrum-global-dimension-size-100);}li a{margin-right:0;}}","")}):null},h=function(i){var e=i.video,t=null;if(e){var n=(0,m.QK)(e),a=new URL(n.props.href);if(a.hostname.startsWith("youtube.com")||a.hostname.startsWith("www.youtube.com"))t=new URLSearchParams(a.search).get("v");else a.hostname.startsWith("youtu.be")&&(t=a.pathname.slice(1))}return t?(0,s.tZ)("div",{css:(0,s.iv)("&{display:inline;width:",(0,m.MY)(6),";box-sizing:border-box;padding:var(--spectrum-global-dimension-size-200);@media screen and (max-width: ",m.LU,"){display:block;width:100%;}}","")},(0,s.tZ)(o._F,{youTubeId:t})):null},b={name:"1p8rch3",styles:"margin-top:var(--spectrum-global-dimension-size-200)"},v={name:"1idn6nd",styles:"margin-top:0!important;margin-bottom:var(--spectrum-global-dimension-size-200)!important;&+p{margin-top:0!important;}"},f={name:"k0oqwy",styles:"width:100%;background:var(--spectrum-global-color-gray-100)"},w={name:"1kivh4z",styles:"margin-top:var(--spectrum-global-dimension-size-400)"},y={name:"1fdqnat",styles:"margin-top:var(--spectrum-global-dimension-size-150);margin-bottom:var(--spectrum-global-dimension-size-150);justify-content:center"},x={name:"1ykcbnq",styles:"margin-bottom:var(--spectrum-global-dimension-size-200)!important;&~p{margin-top:0;margin-bottom:0!important;}"},z={name:"1vixyln",styles:"height:var(--spectrum-global-dimension-size-1000);margin-top:0;margin-bottom:var(--spectrum-global-dimension-size-300);.gatsby-resp-image-wrapper{position:relative;max-width:none!important;width:100%!important;height:100%!important;}.gatsby-resp-image-image{position:absolute;top:0;left:0;height:100%;object-fit:contain;}"},Z=function(i){var e=i.heading,t=i.links,o=i.buttons,Z=i.icons,k=i.image,j=i.video,C=i.theme,L=void 0===C?"lightest":C,U=i.width,_=void 0===U?"100%":U,F=i.isCentered,W=void 0!==F&&F,E=(0,n.Z)(i,l),H=100/parseFloat(_);if("33%"===_&&(_=(100/3).toFixed(2)+"%",H=3),(0,a.useEffect)((function(){return function(){void 0!==d[H]&&d[H]--}})),W){var M="",N="";return void 0!==d[H]&&d[H]++,1===H?M="max-width: "+(0,m.MY)(6)+";":H>3?M="max-width: var(--spectrum-global-dimension-size-3600);":(M="max-width: var(--spectrum-global-dimension-size-4600);",N=c[d[H]%H]),(0,s.tZ)(a.default.Fragment,null,(0,s.tZ)("section",{className:"spectrum--"+L,css:(0,s.iv)("display:table-cell;width:",_.replace("%","vw"),";background:var(--spectrum-global-color-gray-100);padding:var(--spectrum-global-dimension-size-1000) 0;@media screen and (max-width: ",m.LU,"){display:block;width:100%;}","")},(0,s.tZ)("div",{css:(0,s.iv)(M," padding:0 var(--spectrum-global-dimension-size-400);margin:auto;",N,"@media screen and (max-width: ",m.LU,"){max-width:none;margin:auto;}","")},(0,s.tZ)(p,{icons:Z,isCentered:W}),k&&(0,a.cloneElement)(k,{css:z}),e&&(0,s.tZ)("h3",{className:"spectrum-Heading spectrum-Heading--sizeM",css:x},e.props.children),(0,s.tZ)(g,{texts:E}),(0,s.tZ)(r.F5,{buttons:o,css:y}),(0,s.tZ)(u,{links:t,isCentered:W}),j&&(0,s.tZ)("div",{css:w},(0,s.tZ)(h,{video:j})))),void 0!==d[H]&&d[H]%H==0?(0,s.tZ)("div",{"aria-hidden":"true"}):null)}var q=E.slots.endsWith("image")||E.slots.endsWith("video");return(0,s.tZ)("section",{className:"spectrum--"+L,css:f},(0,s.tZ)("div",{css:(0,s.iv)("width:",m.Av,";box-sizing:border-box;margin:auto;padding:var(--spectrum-global-dimension-size-1000) 0;@media screen and (max-width: ",m.Av,"){width:100%;&>div{flex-direction:column!important;}}","")},(0,s.tZ)("div",{css:(0,s.iv)("display:flex;align-items:center;flex-direction:",q?"row-reverse":"row",";@media screen and (max-width: ",m.LU,"){flex-direction:column;}","")},k&&(0,a.cloneElement)(k,{css:(0,s.iv)("display:flex;align-items:center;justify-content:center;width:50%;height:calc(var(--spectrum-global-dimension-size-4600) - var(--spectrum-global-dimension-size-225));box-sizing:border-box;padding:var(--spectrum-global-dimension-size-200);margin-top:0;.gatsby-resp-image-wrapper{max-width:none!important;width:100%!important;height:100%!important;}.gatsby-resp-image-image{object-fit:contain;}@media screen and (max-width: ",m.LU,"){height:auto;width:100%;}","")}),(0,s.tZ)(h,{video:j}),(0,s.tZ)("div",{css:(0,s.iv)("width:50%;display:flex;flex-direction:column;justify-content:center;text-align:left;box-sizing:border-box;padding:0 var(--spectrum-global-dimension-size-400);@media screen and (max-width: ",m.LU,"){width:100%;margin:var(--spectrum-global-dimension-size-400) 0;}","")},(0,s.tZ)(p,{icons:Z,isCentered:W}),e&&(0,s.tZ)("h3",{className:"spectrum-Heading spectrum-Heading--sizeM",css:v},e.props.children),(0,s.tZ)(g,{texts:E}),(0,s.tZ)(r.F5,{buttons:o,css:b}),(0,s.tZ)(u,{links:t,isCentered:W})))))}}}]);
//# sourceMappingURL=8b61fb39-6583c2057344fa206467.js.map