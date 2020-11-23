(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{28:function(e,t,n){},29:function(e,t,n){},31:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(1),c=n.n(r),o=n(21),s=n.n(o),i=(n(28),n(29),n(5)),l=n.n(i),u=n(9),d=n(2),j=n(3),b=function(){return function(){var e=Object(u.a)(l.a.mark((function e(t,n){var a,r,c,o,s,i,u,d,j,b=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=b.length>2&&void 0!==b[2]?b[2]:null,r=!(b.length>3&&void 0!==b[3])||b[3],c="/api/",o=new Headers,r&&o.append("Content-Type","application/json"),s={method:n,body:null!=a&&"GET"!=n?JSON.stringify(a):null,headers:o},a instanceof FormData&&(s.body=a),i="","GET"==n&&null!=a&&(u=new URLSearchParams,Object.entries(a).forEach((function(e){u.append(e[0],e[1])})),i="?".concat(u.toString())),e.next=11,fetch("".concat(c).concat(t).concat(i),s);case 11:return d=e.sent,e.prev=12,e.next=15,d.json();case 15:j=e.sent,e.next=21;break;case 18:e.prev=18,e.t0=e.catch(12),j={ok:!1};case 21:return e.abrupt("return",j);case 22:case"end":return e.stop()}}),e,null,[[12,18]])})));return function(t,n){return e.apply(this,arguments)}}()},h=(n(31),function(e){var t=Object(r.useState)(""),n=Object(d.a)(t,2),c=n[0],o=n[1],s=Object(r.useState)(""),i=Object(d.a)(s,2),h=i[0],p=i[1],f=Object(r.useState)(""),m=Object(d.a)(f,2),O=m[0],x=m[1],v=Object(r.useState)(""),w=Object(d.a)(v,2),g=w[0],y=w[1],k=b(),C=Object(j.f)(),N=function(){var e=Object(u.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),y(""),x(""),""!=h){e.next=6;break}return y("Password can't be blank"),e.abrupt("return");case 6:if(/^(\w|\s)+$/.test(c)){e.next=9;break}return x("Room name can't contain special characters and can't be blank"),e.abrupt("return");case 9:return e.next=11,k("rooms","POST",{name:c,password:h});case 11:(n=e.sent).error?x("A room with the same name already exists, try another one"):C.push("/joinroom/".concat(n.link),n);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsx)("div",{className:"main",children:Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("h3",{children:"Welcome to Pokemon Go drafter, the definitive tool to create a draft tournament with your friends."}),Object(a.jsx)("p",{class:"explanation",children:"Choose a room name and a password, share the link and the password with friends and start drafting."}),Object(a.jsxs)("form",{onSubmit:N,children:[Object(a.jsx)("input",{placeholder:"Room Name",type:"text",value:c,onChange:function(e){o(e.target.value)}}),""!=O&&Object(a.jsx)("div",{className:"error",children:O}),Object(a.jsx)("input",{placeholder:"Room Password",type:"password",value:h,onChange:function(e){p(e.target.value)}}),""!=g&&Object(a.jsx)("div",{className:"error",children:g}),Object(a.jsx)("button",{type:"submit",children:"Create Room"})]})]})})}),p=n(15),f=Object(r.createContext)(null),m=Object(r.createContext)(null),O=function(){return Object(r.useContext)(f)},x=function(){return Object(r.useContext)(m)},v=function(e){var t=e.children,n=Object(r.useState)(null),c=Object(d.a)(n,2),o=c[0],s=c[1];return Object(a.jsx)(f.Provider,{value:o,children:Object(a.jsx)(m.Provider,{value:s,children:t})})},w=Object(r.createContext)(null),g=Object(r.createContext)(null),y=function(){return Object(r.useContext)(w)},k=function(e){var t=e.children,n=Object(r.useState)(window.io()),c=Object(d.a)(n,2),o=c[0],s=c[1],i=x();return Object(r.useEffect)((function(){o.on("updateRoom",(function(e){i(e)}))}),[i]),Object(a.jsx)(w.Provider,{value:o,children:Object(a.jsx)(g.Provider,{value:s,children:o&&t})})},C=["bug","dark","dragon","electric","fairy","fighting","fire","flying","ghost","grass","ground","ice","normal","poison","psychic","rock","steel","water"],N=new Audio("../notification.mp3"),S=function(e){var t=Object(j.h)().link,n=O(),c=(x(),Object(j.f)()),o=Object(j.g)(),s=y(),i=b(),h=Object(r.useState)(o.state),f=Object(d.a)(h,2),m=f[0],v=(f[1],Object(r.useState)("")),w=Object(d.a)(v,2),g=w[0],k=w[1],S=Object(r.useState)(6),L=Object(d.a)(S,2),_=L[0],P=L[1],A=Object(r.useState)(0),E=Object(d.a)(A,2),R=E[0],T=E[1],I=Object(r.useCallback)((function(e){var t=Math.max(e.target.value,1);W(Object(p.a)(new Array(R+t)).map((function(e){return!1}))),P(t)}),[R]),M=Object(r.useCallback)((function(e){var t=Math.max(e.target.value,0);W(Object(p.a)(new Array(_+t)).map((function(e){return!1}))),T(t)}),[_]),D=Object(r.useRef)(),G=Object(r.useState)([!1,!1,!1,!1,!1,!1]),U=Object(d.a)(G,2),J=U[0],W=U[1],B=Object(r.useState)("1500"),F=Object(d.a)(B,2),H=F[0],q=F[1],$=Object(r.useState)(null),z=Object(d.a)($,2),K=z[0],Q=z[1],V=Object(r.useCallback)((function(e){var a=n.players.find((function(e){return e.pick_order==n.choosing}));if(a.username.toLowerCase()==m.toLowerCase()){var r=e.target.dataset.id,c=e.target.dataset.name;if(window.confirm("Do you want to select ".concat(c,"?")))if(-1!=n.choosed_list.indexOf(r))alert("This pokemon was already selected.");else{var o={room_link:t,chooser:a,pick:c,pick_id:r};k(""),s.emit("pick",o)}}}),[n,s]),X=Object(r.useCallback)((function(){window.confirm("Are you sure you want to start the draft? No other person will be able to join after the draft is started.")&&s.emit("startDraft",{room_link:t,bans:J,league:H})}),[s,J,H,t]),Y=Object(r.useCallback)((function(e){var t=-1==n.choosed_list.indexOf(e.speciesId),a=g.charAt(0),r=e.speciesId.replaceAll("_"," ").toLowerCase().includes(g.toLowerCase());if("@"==a){var c=g.substr(1);r=-1==C.indexOf(c)?Object.values(e.moves).flatMap((function(e){return e})).map((function(e){return e.moveId.replaceAll("_"," ").toLowerCase()})).reduce((function(e,t){return e||t.includes(c)}),!1):Object.values(e.moves).flatMap((function(e){return e})).map((function(e){return e.type.toLowerCase()})).reduce((function(e,t){return e||t==c}),!1)}else if("-"==a){var o=g.substr(1);r=Object.values(e.matchups).flatMap((function(e){return e})).map((function(e){return e.opponent.replaceAll("_"," ").toLowerCase()})).reduce((function(e,t){return e||t.includes(o)}),!1)}return t&&r}),[g,n]),Z=Object(r.useState)(!1),ee=Object(d.a)(Z,2),te=ee[0],ne=ee[1];return Object(r.useEffect)((function(){if(null==n)c.push("/joinroom/".concat(t));else{var e,a,r,o,s,d;if(!K)(function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===n||void 0===n?void 0:n.league){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,i("rankings/".concat(n.league),"GET");case 4:t=e.sent,Q(t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()();if(null===n||void 0===n?void 0:n.started)if((null===n||void 0===n||null===(e=n.players)||void 0===e||null===(a=e.find((function(e){return e.pick_order==n.choosing})))||void 0===a||null===(r=a.username)||void 0===r?void 0:r.toLowerCase())==(null===m||void 0===m?void 0:m.toLowerCase())&&N.play(),"Notification"in window&&"granted"!==Notification.permission&&Notification.requestPermission(),"Notification"in window&&"granted"===Notification.permission)if((null===n||void 0===n||null===(o=n.players)||void 0===o||null===(s=o.find((function(e){return e.pick_order==n.choosing})))||void 0===s||null===(d=s.username)||void 0===d?void 0:d.toLowerCase())==(null===m||void 0===m?void 0:m.toLowerCase()))try{new Notification("It's your turn",{body:"Hey ".concat(m," it's your turn to pick for the draft ").concat(n.name)})}catch(j){}}}),[n]),n&&Object(a.jsx)("div",{className:"main",children:Object(a.jsxs)("div",{className:"container titled room-container","data-title":n.name,children:[Object(a.jsx)("div",{className:"container-element playerlist",children:Object(a.jsx)("ul",{children:n.players.map((function(e){return Object(a.jsxs)("li",{className:e.online?"online":"",children:[Object(a.jsx)("span",{children:e.username}),Object(a.jsx)("hr",{})]},e.username)}))})}),Object(a.jsx)("div",{className:"container-element teams",children:(null===n||void 0===n?void 0:n.started)?n.players.map((function(e){return Object(a.jsx)("div",{className:"player-team titled ".concat(n.players.find((function(e){return e.pick_order==n.choosing})).username==e.username?"choosing":""),"data-title":e.username,children:e.team.map((function(e,t){return Object(a.jsx)("div",{className:"pick ".concat(n.ban_rounds[t]?"ban":""),style:{backgroundImage:"url(https://rankingsbot.com/imgs2/".concat(e.pick_id.replace("_","-").replace("alolan","alola"),".png)")}})}))})})):Object(a.jsx)("h2",{children:"Everyone's team will be shown here as soon as the draft starts!"})}),Object(a.jsx)("div",{className:"container-element commands",children:(null===n||void 0===n?void 0:n.started)?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"chooser ".concat(n.players.find((function(e){return e.pick_order==n.choosing})).username.toLowerCase()==m.toLowerCase()?"your-turn":""),children:["Chooser: ",n&&n.players.find((function(e){return e.pick_order==n.choosing})).username]}),n.ban_rounds[Math.floor(n.choosed_list.length/n.players.length)]&&Object(a.jsxs)("div",{className:"warning",children:[Object(a.jsx)("i",{className:"material-icons",children:"warning"})," banning round."]}),Object(a.jsx)("div",{}),Object(a.jsxs)("div",{style:{position:"relative"},children:[Object(a.jsx)("input",{className:"searchBox",placeholder:"Search...",type:"text",value:g,onChange:function(e){k(e.target.value)}}),Object(a.jsx)("i",{className:"material-icons info",onClick:function(){ne((function(e){return!e}))},children:"info"}),Object(a.jsx)("div",{className:"info-popup ".concat(te?"":"closed"),children:Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:"Search [pokemon] to find by name"}),Object(a.jsx)("li",{children:"Search @[move] to search by move"}),Object(a.jsx)("li",{children:"Search @[type] to search by move type"}),Object(a.jsx)("li",{children:"Search -[pokemon] to find a pokemon counter"})]})})]}),Object(a.jsx)("div",{className:"picks",children:K?K.map((function(e){return Object(a.jsx)("div",{className:"pick ".concat(Y(e)?"":"hidden"," ").concat(n.players.find((function(e){return e.pick_order==n.choosing})).username.toLowerCase()!=m.toLowerCase()?"disabled":""),style:{backgroundImage:"url(https://rankingsbot.com/imgs2/".concat(e.speciesId.replaceAll("_","-").replace("alolan","alola"),".png)")},"data-id":e.speciesId,"data-name":e.speciesName,onClick:V})})):Object(a.jsx)("div",{children:"Loading..."})})]}):Object(a.jsx)("div",{children:n.players.find((function(e){return e.username.toLowerCase()==m.toLowerCase()})).host?Object(a.jsxs)("div",{className:"options",children:[Object(a.jsx)("label",{children:"Rounds:"}),Object(a.jsx)("input",{type:"number",min:"1",value:_,onChange:I}),Object(a.jsx)("label",{children:"Ban:"}),Object(a.jsx)("input",{type:"number",min:"0",value:R,onChange:M}),R>0&&Object(a.jsxs)("div",{style:{width:"100%"},children:["Rounds to ban:",Object(a.jsx)("div",{ref:D,className:"bans",onClick:function(e){W(Object(p.a)(D.current.querySelectorAll("input")).map((function(e){return e.checked})))},children:J.map((function(e,t){return Object(a.jsxs)("div",{style:{width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-evenly",alignItems:"center"},children:[Object(a.jsx)("span",{children:t+1}),Object(a.jsx)("input",{disabled:J.filter(Boolean).length==R&&!e,checked:e,type:"checkbox"})]})}))})]}),Object(a.jsx)("label",{children:"League:"}),Object(a.jsxs)("select",{value:H,onChange:function(e){q(e.target.value)},children:[Object(a.jsx)("option",{value:"1500",children:"Great League"}),Object(a.jsx)("option",{value:"2500",children:"Ultra League"}),Object(a.jsx)("option",{value:"10000",children:"Master League"})]})," ",Object(a.jsx)("br",{}),Object(a.jsx)("button",{className:"lighter",onClick:X,children:"Start Draft"})]}):Object(a.jsxs)(a.Fragment,{children:["The host ",Object(a.jsx)("span",{style:{fontWeight:"bold"},children:n.players.find((function(e){return e.host})).username})," hasn't started the draft yet."]})})})]})})},L=function(e){var t=Object(j.h)().link,n=Object(r.useRef)(),c=Object(j.g)(),o=Object(r.useState)(null),s=Object(d.a)(o,2),i=s[0],h=s[1],p=b(),f=y(),m=Object(r.useState)(""),x=Object(d.a)(m,2),v=x[0],w=x[1],g=Object(r.useState)(""),k=Object(d.a)(g,2),C=k[0],N=k[1],S=Object(r.useState)(""),L=Object(d.a)(S,2),_=L[0],P=L[1],A=Object(r.useState)(""),E=Object(d.a)(A,2),R=E[0],T=E[1],I=Object(r.useState)(""),M=Object(d.a)(I,2),D=M[0],G=M[1],U=Object(r.useState)(""),J=Object(d.a)(U,2),W=J[0],B=J[1],F=Object(j.f)(),H=O(),q=function(){var e=Object(u.a)(l.a.mark((function e(t){var n,a,r,c,o,s,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new TextEncoder,a=n.encode(t),e.next=4,crypto.subtle.digest("SHA-256",a);case 4:for(r=e.sent,c="",o=new Uint8Array(r),s=o.byteLength,i=0;i<s;i++)c+=String.fromCharCode(o[i]);return e.abrupt("return",btoa(c));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.clipboard.writeText("".concat(window.location.href));case 2:n.current.classList.add("copied");case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),z=function(){var e=Object(u.a)(l.a.mark((function e(n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),G(""),T(""),B(""),e.next=6,q(_);case 6:if(e.t0=e.sent,e.t1=i.password,e.t0==e.t1){e.next=11;break}return B("Wrong room Password"),e.abrupt("return");case 11:if(/^\w+$/.test(v)){e.next=14;break}return T("Username can't contain spaces or special characters and can't be blank"),e.abrupt("return");case 14:if(""!=C){e.next=17;break}return G("Password can't be blank"),e.abrupt("return");case 17:f.emit("joinRoom",{username:v,password:C,room:t});case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){var e=function(){var e=Object(u.a)(l.a.mark((function e(){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p("rooms/".concat(t),"GET");case 2:n=e.sent,h(n);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();c.state?h(c.state):e(),f.on("error",(function(e){"Wrong password"==e?G("Wrong password"):B(e)}))}),[]),Object(r.useEffect)((function(){null!=H&&F.push("/room/".concat(H.link),v)}),[H]),i&&Object(a.jsx)("div",{className:"main",children:Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("h3",{children:!1!==i.ok?"Joining room ".concat(i.name):"No room with name ".concat(t)}),!(!1===i.ok)&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("p",{className:"explanation",children:"Choose your Username and Password, you'll need them to come back later!"}),Object(a.jsxs)("form",{onSubmit:z,children:[Object(a.jsx)("input",{placeholder:"Username",type:"text",value:v,onChange:function(e){w(e.target.value)}}),""!=R&&Object(a.jsx)("div",{className:"error",children:R}),Object(a.jsx)("input",{placeholder:"Password",type:"password",value:C,onChange:function(e){N(e.target.value)}}),""!=D&&Object(a.jsx)("div",{className:"error",children:D}),Object(a.jsxs)("p",{className:"explanation",children:["Share the following link and the room password with your friends to let them join the draft!",Object(a.jsxs)("code",{class:"share-link",onClick:$,children:[Object(a.jsx)("span",{className:"link",children:window.location.href}),Object(a.jsx)("i",{ref:n,class:"material-icons right",children:"content_copy"})]})]}),Object(a.jsx)("input",{placeholder:"Room Password",type:"password",value:_,onChange:function(e){P(e.target.value)}}),""!=W&&Object(a.jsx)("div",{className:"error",children:W}),Object(a.jsx)("button",{type:"submit",children:"Join"})]})]})]})})},_=n(11);var P=function(){return Object(a.jsx)(_.a,{children:Object(a.jsxs)(j.c,{children:[Object(a.jsx)(j.a,{path:"/",exact:!0,component:h}),Object(a.jsx)(j.a,{path:"/room/:link",exact:!0,component:S}),Object(a.jsx)(j.a,{path:"/joinroom/:link",exact:!0,component:L}),Object(a.jsx)(j.a,{path:"/test",exact:!0,children:Object(a.jsx)("div",{children:"Test"})})]})})};s.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(v,{children:Object(a.jsx)(k,{children:Object(a.jsx)(P,{})})})}),document.getElementById("root"))}},[[37,1,2]]]);
//# sourceMappingURL=main.1f6dd681.chunk.js.map