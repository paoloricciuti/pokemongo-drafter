(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{25:function(e,t,n){},26:function(e,t,n){},28:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n(0),c=n.n(r),s=n(18),o=n.n(s),i=(n(25),n(26),n(5)),u=n.n(i),l=n(9),d=n(3),j=n(2),b=function(){return function(){var e=Object(l.a)(u.a.mark((function e(t,n){var a,r,c,s,o,i,l,d,j,b=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=b.length>2&&void 0!==b[2]?b[2]:null,r=!(b.length>3&&void 0!==b[3])||b[3],c="/api/",s=new Headers,r&&s.append("Content-Type","application/json"),o={method:n,body:null!=a&&"GET"!=n?JSON.stringify(a):null,headers:s},a instanceof FormData&&(o.body=a),i="","GET"==n&&null!=a&&(l=new URLSearchParams,Object.entries(a).forEach((function(e){l.append(e[0],e[1])})),i="?".concat(l.toString())),e.next=11,fetch("".concat(c).concat(t).concat(i),o);case 11:return d=e.sent,e.prev=12,e.next=15,d.json();case 15:j=e.sent,e.next=21;break;case 18:e.prev=18,e.t0=e.catch(12),j={ok:!1};case 21:return e.abrupt("return",j);case 22:case"end":return e.stop()}}),e,null,[[12,18]])})));return function(t,n){return e.apply(this,arguments)}}()},p=(n(28),function(e){var t=Object(r.useState)(""),n=Object(d.a)(t,2),c=n[0],s=n[1],o=Object(r.useState)(""),i=Object(d.a)(o,2),p=i[0],h=i[1],f=Object(r.useState)(""),m=Object(d.a)(f,2),O=m[0],x=m[1],v=Object(r.useState)(""),w=Object(d.a)(v,2),k=w[0],g=w[1],y=b(),C=Object(j.f)(),S=function(){var e=Object(l.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),g(""),x(""),""!=p){e.next=6;break}return g("Password can't be blank"),e.abrupt("return");case 6:if(""!=c){e.next=9;break}return x("Room name can't be blank"),e.abrupt("return");case 9:return e.next=11,y("rooms","POST",{name:c,password:p});case 11:(n=e.sent).error?x("A room with the same name already exists, try another one"):C.push("/joinroom/".concat(n.link),n);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsx)("div",{className:"main",children:Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("h3",{children:"Welcome to Pokemon Go drafter, the definitive tool to create a draft tournament with your friends."}),Object(a.jsx)("p",{class:"explanation",children:"Chose a room name and a password, share the link and the password with friends and start drafting."}),Object(a.jsxs)("form",{onSubmit:S,children:[Object(a.jsx)("input",{placeholder:"Room Name",type:"text",value:c,onChange:function(e){s(e.target.value)}}),""!=O&&Object(a.jsx)("div",{className:"error",children:O}),Object(a.jsx)("input",{placeholder:"Password",type:"password",value:p,onChange:function(e){h(e.target.value)}}),""!=k&&Object(a.jsx)("div",{className:"error",children:k}),Object(a.jsx)("button",{type:"submit",children:"Create Room"})]})]})})}),h=Object(r.createContext)(null),f=Object(r.createContext)(null),m=function(){return Object(r.useContext)(h)},O=function(){return Object(r.useContext)(f)},x=function(e){var t=e.children,n=Object(r.useState)(null),c=Object(d.a)(n,2),s=c[0],o=c[1];return Object(a.jsx)(h.Provider,{value:s,children:Object(a.jsx)(f.Provider,{value:o,children:t})})},v=Object(r.createContext)(null),w=Object(r.createContext)(null),k=function(){return Object(r.useContext)(v)},g=function(e){var t=e.children,n=Object(r.useState)(window.io()),c=Object(d.a)(n,2),s=c[0],o=c[1],i=O();return Object(r.useEffect)((function(){s.on("updateRoom",(function(e){i(e)}))}),[i]),Object(a.jsx)(v.Provider,{value:s,children:Object(a.jsx)(w.Provider,{value:o,children:s&&t})})},y=function(e){var t=Object(j.h)().link,n=m(),c=(O(),Object(j.f)()),s=Object(j.g)(),o=k(),i=b(),p=Object(r.useState)(s.state),h=Object(d.a)(p,2),f=h[0],x=(h[1],Object(r.useState)("")),v=Object(d.a)(x,2),w=v[0],g=v[1],y=Object(r.useState)(null),C=Object(d.a)(y,2),S=C[0],N=C[1],E=Object(r.useCallback)((function(e){var a=n.players.find((function(e){return e.pick_order==n.choosing}));if(a.username.toLowerCase()==f.toLowerCase()){var r=e.target.dataset.id,c=e.target.dataset.name;if(window.confirm("Do you want to select ".concat(c,"?")))if(-1!=n.choosed_list.indexOf(r))alert("This pokemon was already selected.");else{var s={room_link:t,chooser:a,pick:c,pick_id:r};g(""),o.emit("pick",s)}}}),[n,o]),P=Object(r.useCallback)((function(){window.confirm("Are you sure you want to start the draft? No other person will be able to join after the draft is started.")&&o.emit("startDraft",t)}),[o]);return Object(r.useEffect)((function(){null==n&&c.push("/joinroom/".concat(t))}),[n]),Object(r.useEffect)((function(){(function(){var e=Object(l.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i("rankings/1500","GET");case 2:t=e.sent,N(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),n&&Object(a.jsx)("div",{className:"main",children:Object(a.jsxs)("div",{className:"container titled room-container","data-title":n.name,children:[Object(a.jsx)("div",{className:"container-element playerlist",children:Object(a.jsx)("ul",{children:n.players.map((function(e){return Object(a.jsxs)("li",{className:e.online?"online":"",children:[Object(a.jsx)("span",{children:e.username}),Object(a.jsx)("hr",{})]},e.username)}))})}),Object(a.jsx)("div",{className:"container-element teams",children:(null===n||void 0===n?void 0:n.started)?n.players.map((function(e){return Object(a.jsx)("div",{className:"player-team titled","data-title":e.username,children:e.team.map((function(e){return Object(a.jsx)("div",{className:"pick",style:{backgroundImage:"url(https://rankingsbot.com/imgs2/".concat(e.pick_id.replace("_","-").replace("alolan","alola"),".png)")}})}))})})):Object(a.jsx)("h2",{children:"Everyone team will be showed here as soon as this draft will start!"})}),Object(a.jsx)("div",{className:"container-element commands",children:(null===n||void 0===n?void 0:n.started)?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{children:["Chooser: ",n&&n.players.find((function(e){return e.pick_order==n.choosing})).username]}),Object(a.jsx)("input",{className:"searchBox",placeholder:"Search...",type:"text",value:w,onChange:function(e){g(e.target.value)}}),Object(a.jsx)("div",{className:"picks",children:S?S.map((function(e){return Object(a.jsx)("div",{className:"pick ".concat(-1==n.choosed_list.indexOf(e.speciesId)&&-1!=e.speciesId.toLowerCase().indexOf(w.toLowerCase())?"":"hidden"," ").concat(n.players.find((function(e){return e.pick_order==n.choosing})).username.toLowerCase()!=f.toLowerCase()?"disabled":""),style:{backgroundImage:"url(https://rankingsbot.com/imgs2/".concat(e.speciesId.replace("_","-").replace("alolan","alola"),".png)")},"data-id":e.speciesId,"data-name":e.speciesName,onClick:E})})):Object(a.jsx)("div",{children:"Loading..."})})]}):Object(a.jsx)("div",{children:Object(a.jsx)("button",{class:"lighter",onClick:P,children:"Start Draft"})})})]})})},C=function(e){var t=Object(j.h)().link,n=Object(r.useRef)(),c=Object(j.g)(),s=Object(r.useState)(null),o=Object(d.a)(s,2),i=o[0],p=o[1],h=b(),f=k(),O=Object(r.useState)(""),x=Object(d.a)(O,2),v=x[0],w=x[1],g=Object(r.useState)(""),y=Object(d.a)(g,2),C=y[0],S=y[1],N=Object(r.useState)(""),E=Object(d.a)(N,2),P=E[0],_=E[1],L=Object(r.useState)(""),T=Object(d.a)(L,2),R=T[0],I=T[1],D=Object(r.useState)(""),G=Object(d.a)(D,2),J=G[0],A=G[1],U=Object(r.useState)(""),W=Object(d.a)(U,2),F=W[0],B=W[1],H=Object(j.f)(),M=m(),$=function(){var e=Object(l.a)(u.a.mark((function e(t){var n,a,r,c,s,o,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new TextEncoder,a=n.encode(t),e.next=4,crypto.subtle.digest("SHA-256",a);case 4:for(r=e.sent,c="",s=new Uint8Array(r),o=s.byteLength,i=0;i<o;i++)c+=String.fromCharCode(s[i]);return e.abrupt("return",btoa(c));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=function(){var e=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.clipboard.writeText("https://pokemongo-drafter.herokuapp.com/joinroom/".concat(t));case 2:n.current.classList.add("copied");case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),z=function(){var e=Object(l.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),A(""),I(""),B(""),e.next=6,$(P);case 6:if(e.t0=e.sent,e.t1=i.password,e.t0==e.t1){e.next=11;break}return B("Wrong room Password"),e.abrupt("return");case 11:if(/^\w+$/.test(v)){e.next=14;break}return I("Username can't contain spaces or special characters and can't be blank"),e.abrupt("return");case 14:if(""!=C){e.next=17;break}return A("Password can't be blank"),e.abrupt("return");case 17:f.emit("joinRoom",{username:v,password:C,room:t});case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){var e=function(){var e=Object(l.a)(u.a.mark((function e(){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h("rooms/".concat(t),"GET");case 2:n=e.sent,p(n);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();c.state?p(c.state):e(),f.on("error",(function(e){"Wrong password"==e?A("Wrong password"):B(e)}))}),[]),Object(r.useEffect)((function(){null!=M&&H.push("/room/".concat(M.link),v)}),[M]),i&&Object(a.jsx)("div",{className:"main",children:Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("h3",{children:!1!==i.ok?"Joining room ".concat(i.name):"No room with name ".concat(t)}),!(!1===i.ok)&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("p",{className:"explanation",children:["Chose your username and password, you can use them to come back later.",Object(a.jsx)("br",{}),"Share the following link with your friends together with the password to let them join the draft.",Object(a.jsxs)("code",{class:"share-link",onClick:q,children:[Object(a.jsxs)("span",{className:"link",children:["https://pokemongo-drafter.herokuapp.com/joinroom/",t]}),Object(a.jsx)("i",{ref:n,class:"material-icons right",children:"content_copy"})]})]}),Object(a.jsxs)("form",{onSubmit:z,children:[Object(a.jsx)("input",{placeholder:"Username",type:"text",value:v,onChange:function(e){w(e.target.value)}}),""!=R&&Object(a.jsx)("div",{className:"error",children:R}),Object(a.jsx)("input",{placeholder:"Password",type:"password",value:C,onChange:function(e){S(e.target.value)}}),""!=J&&Object(a.jsx)("div",{className:"error",children:J}),Object(a.jsx)("input",{placeholder:"Room Password",type:"password",value:P,onChange:function(e){_(e.target.value)}}),""!=F&&Object(a.jsx)("div",{className:"error",children:F}),Object(a.jsx)("button",{type:"submit",children:"Join"})]})]})]})})},S=n(11);var N=function(){return Object(a.jsx)(S.a,{children:Object(a.jsxs)(j.c,{children:[Object(a.jsx)(j.a,{path:"/",exact:!0,component:p}),Object(a.jsx)(j.a,{path:"/room/:link",exact:!0,component:y}),Object(a.jsx)(j.a,{path:"/joinroom/:link",exact:!0,component:C}),Object(a.jsx)(j.a,{path:"/test",exact:!0,children:Object(a.jsx)("div",{children:"Test"})})]})})};o.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(x,{children:Object(a.jsx)(g,{children:Object(a.jsx)(N,{})})})}),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.03cfd9ec.chunk.js.map