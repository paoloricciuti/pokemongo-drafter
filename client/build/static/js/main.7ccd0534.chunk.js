(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{25:function(e,t,n){},26:function(e,t,n){},28:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(0),c=n.n(r),o=n(17),s=n.n(o),i=(n(25),n(26),n(8)),u=n.n(i),l=n(10),d=n(15),j=function(){return function(){var e=Object(l.a)(u.a.mark((function e(t,n){var a,r,c,o,s,i,l,d,j,p=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=p.length>2&&void 0!==p[2]?p[2]:null,r=!(p.length>3&&void 0!==p[3])||p[3],c="/api/",o=new Headers,r&&o.append("Content-Type","application/json"),s={method:n,body:null!=a&&"GET"!=n?JSON.stringify(a):null,headers:o},a instanceof FormData&&(s.body=a),i="","GET"==n&&null!=a&&(l=new URLSearchParams,Object.entries(a).forEach((function(e){l.append(e[0],e[1])})),i="?".concat(l.toString())),e.next=11,fetch("".concat(c).concat(t).concat(i),s);case 11:return d=e.sent,e.prev=12,e.next=15,d.json();case 15:j=e.sent,e.next=21;break;case 18:e.prev=18,e.t0=e.catch(12),j={ok:!1};case 21:return e.abrupt("return",j);case 22:case"end":return e.stop()}}),e,null,[[12,18]])})));return function(t,n){return e.apply(this,arguments)}}()},p=(n(28),function(e){var t=Object(r.useState)(""),n=Object(d.a)(t,2),c=n[0],o=n[1],s=Object(r.useState)(""),i=Object(d.a)(s,2),p=i[0],h=i[1],b=j(),f=function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,b("rooms","POST",{name:c,password:p});case 3:e.sent.error?alert("Stanza duplicata"):alert("Stanza creata!");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsx)("div",{className:"main",children:Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("h2",{children:"Welcome to Pokemon Go drafter, the definitive tool to create a draft tournament with your friends."}),Object(a.jsxs)("form",{onSubmit:f,children:[Object(a.jsx)("input",{placeholder:"Room Name",type:"text",value:c,onChange:function(e){o(e.target.value)}}),Object(a.jsx)("input",{placeholder:"Password",type:"password",value:p,onChange:function(e){h(e.target.value)}}),Object(a.jsx)("button",{type:"submit",children:"Create Room"})]})]})})}),h=n(18),b=n(1);var f=function(){return Object(a.jsx)(h.a,{children:Object(a.jsxs)(b.c,{children:[Object(a.jsx)(b.a,{path:"/",exact:!0,component:p}),Object(a.jsx)(b.a,{path:"/rooms",exact:!0,children:Object(a.jsx)("div",{children:"Rooms"})}),Object(a.jsx)(b.a,{path:"/test",exact:!0,children:Object(a.jsx)("div",{children:"Test"})})]})})};s.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(f,{})}),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.7ccd0534.chunk.js.map