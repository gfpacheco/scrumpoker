(this.webpackJsonpscrumpoker=this.webpackJsonpscrumpoker||[]).push([[0],{16:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n(1),r=n.n(a),o=n(8),s=n.n(o),u=n(2),i=n(7),b=n.n(i),j=n(3),p=n(9),O=n(5),l=n(4),f=n.n(l);var m=function(t){var e=t.className,n=t.name,r=Object(O.a)(t,["className","name"]),o=Object(a.useState)(0),s=Object(u.a)(o,2),i=s[0],l=s[1],m=Object(a.useState)(),d=Object(u.a)(m,2),h=d[0],v=d[1];function S(){return(S=Object(p.a)(b.a.mark((function t(e){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat("http://localhost:3001","/estimation"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:i,value:e})});case 2:v(e);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(a.useEffect)((function(){var t=new EventSource("".concat("http://localhost:3001","/participant?name=").concat(encodeURIComponent(n)));return t.onmessage=function(t){l(JSON.parse(t.data)),v()},function(){return t.close()}}),[n]),Object(c.jsxs)("div",Object(j.a)(Object(j.a)({className:f()(e)},r),{},{children:[JSON.stringify(h),[0,1,2,3,5,8].map((function(t){return Object(c.jsx)("button",{type:"button",style:t===h?{background:"green"}:void 0,onClick:function(){return function(t){return S.apply(this,arguments)}(t)},disabled:void 0!==h,children:t},t)}))]}))};var d=function(t){var e=t.className,n=t.onSubmitName,r=Object(O.a)(t,["className","onSubmitName"]),o=Object(a.useState)([]),s=Object(u.a)(o,2),i=s[0],b=s[1],p=Object(a.useRef)();return Object(a.useEffect)((function(){var t=new EventSource("".concat("http://localhost:3001","/spectator"));return t.onmessage=function(t){b(JSON.parse(t.data))},function(){return t.close()}}),[]),Object(c.jsxs)("div",Object(j.a)(Object(j.a)({className:f()(e)},r),{},{children:[Object(c.jsxs)("form",{onSubmit:function(t){t.preventDefault(),n(p.current.value)},children:[Object(c.jsx)("input",{ref:p,name:"name",type:"text"}),Object(c.jsx)("button",{type:"submit",children:"participate"})]}),JSON.stringify(i),Object(c.jsx)("button",{type:"button",onClick:function(){fetch("".concat("http://localhost:3001","/reset"),{method:"POST"})},children:"reset"})]}))};var h=function(){var t=Object(a.useState)(""),e=Object(u.a)(t,2),n=e[0],r=e[1];return n?Object(c.jsx)(m,{name:n}):Object(c.jsx)(d,{onSubmitName:r})};n(16);s.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(h,{})}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.60f028c3.chunk.js.map