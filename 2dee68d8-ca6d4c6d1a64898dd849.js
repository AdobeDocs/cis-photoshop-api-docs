"use strict";(self.webpackChunkcis_photoshop_api_docs=self.webpackChunkcis_photoshop_api_docs||[]).push([[206],{91515:function(e,t,n){var i=n(42982),r=n(4942),l=(n(38559),n(15007)),o=n(1597),a=n(64983),s=n(95223),d=n(26777),u=n(158),v=n(42075),p=n(23576),c=n(69679),h=n(56013),m=n(24149),f=n(48261),g=n(31160),b=n(21183),y=n(45553),x=n(47029),Z=n(60325),w=n(1931),P=n(2812);function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var C=function(e){for(var t=e.childrenArray,n=e.query,i=e.hasSideNav,r=[],o=null,a=null,s=function(){var e=t[0],s=0;Object.keys(P.a).forEach((function(d){var v;if((null==e||null===(v=e.props)||void 0===v?void 0:v.mdxType)===d){s++;var p=[];if(e.props.slots||e.props.repeat)for(var c=Math.max(parseInt(e.props.repeat)||1,1),h=function(n){p=p.concat((e.props.slots||"element").split(",").map((function(e,i){return[""+e.trim()+(1===c?"":n),t[p.length+i+1]]})))},m=0;m<c;m++)h(m);if(p.length){s+=p.length;var f=Object.fromEntries(p);"Variant"===e.props.mdxType&&(f.query=n),"Hero"===e.props.mdxType&&i&&(f.width="calc("+u.Av+" - "+u.dP+");");var g=(0,l.cloneElement)(e,j({},f));"Hero"===e.props.mdxType?o=o||g:"Resources"===e.props.mdxType?a=a||g:r.push(g)}else r.push(e)}})),0===s&&(s++,r.push(e)),t=t.splice(s)};t.length;)s();return{filteredChildren:r,heroChild:o,resourcesChild:a}},q={name:"13fp5r9",styles:"display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;margin-bottom:var(--spectrum-global-dimension-size-200)"},A={name:"4zleql",styles:"display:block"},D={name:"1ggp1wf",styles:"margin-right:var(--spectrum-global-dimension-size-400)"},k={name:"zjik7",styles:"display:flex"},z={name:"7wiue4",styles:"align-items:center;justify-content:center;display:flex;flex-direction:column"};t.Z=function(e){var t,n=e.children,r=e.pageContext,O=e.query,S=(0,l.useContext)(d.Z),M=S.hasSideNav,N=S.siteMetadata,_=S.location,E=S.allSitePage,T=S.allMdx,L=S.allGithub,B=S.allGithubContributors,X=void 0===r,G=l.Children.toArray(n);if(X||"none"===(null==r||null===(t=r.frontmatter)||void 0===t?void 0:t.layout)){var H=C({childrenArray:(0,Z.L)(G),query:O,hasSideNav:M}).filteredChildren;return X?(0,s.tZ)(a.MDXProvider,null,H):(0,s.tZ)(a.MDXProvider,{components:j(j({},w.t),P.a)},H,(0,s.tZ)(v.$,{hasSideNav:M}))}var Y,J,K,R,$,I,V,F,Q,U,W,ee,te,ne,ie,re,le,oe,ae,se=(0,u.kR)(null==_?void 0:_.pathname,null==N?void 0:N.subPages),de=(0,u.P4)(null==_?void 0:_.pathname,null==N?void 0:N.subPages),ue=(0,u.sl)(null==_?void 0:_.pathname,null==N?void 0:N.subPages),ve=ue.nextPage,pe=ue.previousPage,ce=null==r||null===(Y=r.frontmatter)||void 0===Y?void 0:Y.contributor_name,he=null==r||null===(J=r.frontmatter)||void 0===J?void 0:J.contributor_link,me=null==r||null===(K=r.frontmatter)||void 0===K?void 0:K.edition,fe=null==E?void 0:E.nodes.find((function(e){var t=e.path;return(0,o.dq)(t)===(null==_?void 0:_.pathname)})),ge=null!==(R=null==fe?void 0:fe.component)&&void 0!==R?R:"",be=null==T?void 0:T.nodes.find((function(e){return e.fileAbsolutePath===ge})),ye=null!==($=null==be?void 0:be.tableOfContents)&&void 0!==$?$:{},xe=null==L?void 0:L.nodes[0],Ze=xe.repository,we=xe.default_branch,Pe=xe.root,Oe=null==B?void 0:B.nodes.find((function(e){return e.path===ge})),je=null!==(I=null==Oe?void 0:Oe.contributors)&&void 0!==I?I:[],Ce=ge.replace(/.*\/src\/pages\//g,""),qe=void 0!==(null==r||null===(V=r.frontmatter)||void 0===V?void 0:V.hideBreadcrumbNav)&&r.frontmatter.hideBreadcrumbNav;if("boolean"!=typeof qe)throw new Error("hideBreadcrumbNav is not a boolean. Correct use hideBreadcrumbNav: true");var Ae=N.home,De=(0,u.A6)(_.pathname),ke=(0,u.Gh)(null==N?void 0:N.pages),ze=(0,u.Yx)(De,ke),Se=(0,u.xH)(De,ze),Me=(0,u.Lh)(null==_?void 0:_.pathname,null==N?void 0:N.subPages),Ne=[];if(Me.length)for(var _e=Me[Me.length-1].level+1,Ee=function(e){var t=Me.filter((function(t){return t.level===e}));t.length&&Ne.push(t.pop())},Te=0;Te<_e;Te++)Ee(Te);var Le=!1;null!=r&&null!==(F=r.frontmatter)&&void 0!==F&&F.jsDoc&&(Le=!0,G=(0,Z.L)(G));var Be=C({childrenArray:G,hasSideNav:M}),Xe=Be.filteredChildren,Ge=Be.heroChild,He=Be.resourcesChild,Ye=null===Ge,Je=null!==Ge&&(!Ge.props.variant||"default"===Ge.props.variant),Ke=null!==Ge&&Ge.props.variant&&"default"!==Ge.props.variant,Re=null==ye||null===(Q=ye.items)||void 0===Q||null===(U=Q[0])||void 0===U?void 0:U.items,$e=!Ge&&(M||Le)&&Re&&(Re.length>1||1===Re.length&&(null===(W=Re[0])||void 0===W||null===(ee=W.items)||void 0===ee?void 0:ee.length)>1||(null===(te=Re[0])||void 0===te?void 0:te.title)),Ie=(null==se?void 0:se.pathname)===(null==de||null===(ne=de[0])||void 0===ne?void 0:ne.pathname),Ve=[];return $e&&Ve.push((0,u.MY)(2)+" - var(--spectrum-global-dimension-size-400)"),M&&Ve.push(u.dP),(0,s.tZ)(a.MDXProvider,{components:j(j({},w.t),P.a)},(0,s.tZ)("main",{css:z},Ge&&Ge,(0,s.tZ)("div",{css:(0,s.iv)(Ke?"width: var(--spectrum-global-dimension-static-grid-fluid-width);":"\n                max-width: "+u.Av+";\n                margin: 0 var(--spectrum-global-dimension-size-800);\n                "," ",Je&&"\n                h2:first-of-type {\n                  margin-top: 0 !important;\n                }\n              ","@media screen and (max-width: ",u.Av,"){max-width:none;margin:0 var(--spectrum-global-dimension-size-400);}")},(0,s.tZ)("div",{css:k},(0,s.tZ)("div",{css:(0,s.iv)("width:",Ke?"\n                      var(--spectrum-global-dimension-static-grid-fluid-width);\n                      text-align: center;\n                      ":(0,u.MY)(12,Ve),";@media screen and (max-width: ",u.Av,"){width:100%;}")},Ye&&(0,s.tZ)("div",{css:(0,s.iv)("display:flex;margin-top:var(--spectrum-global-dimension-size-500);margin-bottom:var(--spectrum-global-dimension-size-500);@media screen and (max-width: ",u.Av,"){flex-direction:column;}")},!qe&&ze&&(0,s.tZ)("div",{css:D},!0!==(null==Ae?void 0:Ae.hidden)&&null!=Ae&&Ae.title&&null!=Ae&&Ae.href?(0,s.tZ)(m.O,{pages:[u.JK,Ae,j(j({},ze),{},{href:(0,o.dq)(ze.href)}),Se&&j(j({},Se),{},{href:(0,o.dq)(Se.href)})].concat((0,i.Z)(Ne.map((function(e){return j(j({},e),{},{href:(0,o.dq)((0,u.Mi)(e.href))})}))))}):(0,s.tZ)(m.O,{pages:[u.JK,(null==N||null===(ie=N.pages)||void 0===ie?void 0:ie.length)>1?j(j({},null==N||null===(re=N.pages)||void 0===re?void 0:re[0]),{},{href:(0,o.dq)(null==N||null===(le=N.pages)||void 0===le||null===(oe=le[0])||void 0===oe?void 0:oe.href)}):null,j(j({},ze),{},{href:(0,o.dq)(ze.href)}),Se&&j(j({},Se),{},{href:(0,o.dq)(Se.href)})].concat((0,i.Z)(Ne.map((function(e){return e.title===(null==ze?void 0:ze.title)&&e.href===(null==ze?void 0:ze.href)?null:j(j({},e),{},{href:(0,o.dq)((0,u.Mi)(e.href))})}))))})),(0,s.tZ)("div",{css:(0,s.iv)("margin-left:auto;display:flex;align-items:center;@media screen and (max-width: ",u.Av,"){margin-left:0;margin-top:var(--spectrum-global-dimension-size-200);}")},(0,s.tZ)(h.X,{repository:Ze,branch:we,root:Pe,pagePath:Ce}))),(0,s.tZ)("div",{css:A},me&&(0,s.tZ)(g.c,{name:me}),he&&(0,s.tZ)(f.x,{name:ce,link:he})),Xe,Ye&&Ie&&(0,s.tZ)(y.x,{pages:de}),Ye&&(0,s.tZ)(x.m,{nextPage:ve,previousPage:pe}),!Ke&&(0,s.tZ)("div",{css:q},(0,s.tZ)("div",null,(0,s.tZ)(p.T,{repository:Ze,branch:we,root:Pe,pagePath:Ce,contributors:je,externalContributors:null==r||null===(ae=r.frontmatter)||void 0===ae?void 0:ae.contributors,date:je[0]?new Date(je[0].date).toLocaleDateString():(new Date).toLocaleDateString()})),(0,s.tZ)("div",{css:(0,s.iv)("@media screen and (max-width: ",u.Av,"){margin-top:var(--spectrum-global-dimension-size-200);}")},(0,s.tZ)(c.x,null)))),$e&&(0,s.tZ)(b.m,{tableOfContents:ye}),He&&He)),(0,s.tZ)(v.$,{hasSideNav:M})))}}}]);
//# sourceMappingURL=2dee68d8-ca6d4c6d1a64898dd849.js.map