(this.webpackJsonpsimplex=this.webpackJsonpsimplex||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(7),c=n.n(l),u=(n(13),n(4)),o=n(1),i=n(2),s=(n(14),n(15),n(3)),m=n(5);function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){Object(m.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e){var t=e.rows,n=e.columns,a=e.handler,l=[],c=[],u=0;l[0]=r.a.createElement("tr",null,r.a.createElement("th",null),new Array(n).fill(0).map((function(e,t){return r.a.createElement("th",null,"T"+(t+1))})),r.a.createElement("th",null,"Necessity"));for(var i=0;i<t+1;i++){for(var p=0;p<n;p++)c[p]=r.a.createElement("td",null,r.a.createElement(o.Input,{onChange:function(e){var t=e.target.id,n=e.target.value;a((function(e){return f({},e,Object(m.a)({},t,n))}))},type:"number",placeholder:"0",id:String(u++)}));l[i+1]=r.a.createElement("tr",null,[r.a.createElement("th",null,"O"+(i+1))].concat(Object(s.a)(c),[r.a.createElement("td",null,r.a.createElement(o.Input,{onChange:function(e){var t=e.target.id,n=e.target.value;a((function(e){return f({},e,Object(m.a)({},t,n))}))},type:"number",id:String(u++)}))])),l[t+1]=r.a.createElement("tr",null,[r.a.createElement("th",null,"Availability")].concat(Object(s.a)(c))),c=[]}return r.a.createElement(o.Table,{isBordered:!0,isStriped:!0,isNarrow:!0},r.a.createElement("thead",null),r.a.createElement("tbody",null,l))}function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object(i.a)([]),t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Object(i.a)(),n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Object(i.a)(),a=function(e,t){var n=e.reduce((function(e,t){return e+t}),0),a=t.reduce((function(e,t){return e+t}),0);return n-a}(t,n);a<0?(t=t.push(Math.abs(a)),e=e.push(Object(i.a)(Array(n.size).fill(999999)))):a>0&&(n=n.push(a),e=Object(i.a)(e.map((function(e){return e.push(999999)}))));var r=Object(i.a)(function(e,t,n){var a=Object(i.a)();return function e(t,n,a,r){if(t.isEmpty()||t.get(0).isEmpty())return r;var l=function(e){var t=Object(i.a)(),n=Object(i.a)();e.map((function(e){var n=e.sort((function(e,t){return e-t}));t=t.push(n.get(1)-n.get(0))}));for(var a=Object(i.a)(),r=0;r<e.get(0).size;r++){a=a.clear();for(var l=0;l<e.size;l++)a=a.push(e.get(l).get(r));a=a.sort((function(e,t){return e-t})),n=n.push(a.get(1)-a.get(0))}return Object(i.a)([t,n])}(t),c=l.get(0).indexOf(Math.max.apply(Math,Object(s.a)(l.get(0).toArray()))),u=l.get(1).indexOf(Math.max.apply(Math,Object(s.a)(l.get(1).toArray()))),o=l.get(0).get(c);if(l.get(1).get(u)>o){for(var m=Object(i.a)(),p=0;p<t.size;p++)m=m.push(t.get(p).get(u));var f=m.indexOf(Math.min.apply(Math,Object(s.a)(m.toArray()))),b=m.get(f),g=n.get(f),O=a.get(f),h=Math.min(g,O);r=r.push(Object(i.a)([b,h])),a=a.set(u,O-h),n=n.set(f,g-h),O-h===0&&(t=t.map((function(e){return e.delete(u)})),a=a.delete(u)),g-h===0&&(t=t.delete(f),n=n.delete(f)),console.log("popIndex",f),console.log("penaltyIndex",u)}else{var d=t.get(c).indexOf(Math.min.apply(Math,Object(s.a)(t.get(c).toArray()))),j=Math.min.apply(Math,Object(s.a)(t.get(c).toArray())),E=n.get(c),v=a.get(d),y=Math.min(E,v);r=r.push(Object(i.a)([j,y])),a=a.set(d,v-y),n=n.set(c,E-y),v-y===0&&(t=t.map((function(e){return e.delete(d)})),a=a.delete(d)),console.log("popIndex",d),console.log("penaltyIndex",c),E-y===0&&(t=t.delete(c),n=n.delete(c))}return e(t,n,a,r)}(e,t,n,a)}(e,t,n).toArray());return 0!==a&&(r=r.delete(r.size-1)),r}function O(e){for(var t=e.result,n=e.final,a=[],l=0;l<t.length;l++)for(var c=0;c<t[l].length;c++)a.push(r.a.createElement(r.a.Fragment,null,r.a.createElement("td",null,t[l][c][0]+"\xbb","O"+(t[l][c][1]+1)+"\u2192T"+(t[l][c][2]+1))));return r.a.createElement(o.Table,{isBordered:!0,isStriped:!0,isNarrow:!0},r.a.createElement("tr",null,a," ",r.a.createElement("td",null,"=",n)))}function h(){var e=Object(a.useState)(3),t=Object(u.a)(e,2),n=t[0],l=t[1],c=Object(a.useState)(3),s=Object(u.a)(c,2),m=s[0],p=s[1],f=Object(a.useState)(),h=Object(u.a)(f,2),d=h[0],j=h[1],E=Object(a.useState)([[]]),v=Object(u.a)(E,2),y=v[0],w=v[1],C=Object(a.useState)(0),x=Object(u.a)(C,2),S=x[0],M=x[1];return r.a.createElement("div",{className:"App"},r.a.createElement(o.Columns,null,r.a.createElement(o.Column,{isSize:3},r.a.createElement(o.Title,null,"Vogel"),r.a.createElement(o.Field,null,r.a.createElement(o.Label,null,"Target"),r.a.createElement(o.Control,null,r.a.createElement(o.Input,{value:n,onChange:function(e){l(Number(e.target.value))},type:"number"}))),r.a.createElement(o.Field,null,r.a.createElement(o.Label,null,"Origin"),r.a.createElement(o.Control,null,r.a.createElement(o.Input,{value:m,onChange:function(e){p(Number(e.target.value))},type:"number"})))),r.a.createElement(o.Column,null,r.a.createElement("div",{className:"App-header"},r.a.createElement(o.Columns,null,r.a.createElement(o.Column,null,r.a.createElement(b,{handler:j,rows:m,columns:n}))),r.a.createElement(o.Columns,null,r.a.createElement(o.Column,null,r.a.createElement(o.Button,{onClick:function(){for(var e=Object(i.a)(),t=Object(i.a)(),a=Object(i.a)(),r=0,l=0;l<m;l++){for(var c=[],u=0;u<n;u++)c.push(parseInt(d[r++]));a=a.push(parseInt(d[r++])),e=e.push(Object(i.a)(c))}for(var o=0;o<n;o++)t=t.push(parseInt(d[r++]));var s=g(e,a,t),p=s.map((function(e){return e.get(0)*e.get(1)})),f=s.map((function(e){return e.get(0)}));console.log(f.toJS());var b=(p=p.filter((function(e){return e<999999}))).reduce((function(e,t){return e+t}),0);M(b),f.pop();var O=Object(i.a)(e.map((function(e,t){var n=Object(i.a)();return f.forEach((function(a,r){e.indexOf(a)>-1&&(n=n.push([p.get(r),t,e.indexOf(a)]))})),n})));w(O.toJS()),console.log(O.toJS())}},"Go"))),r.a.createElement(o.Columns,null,r.a.createElement(o.Column,null,y.length>0?r.a.createElement(O,{result:y,final:S}):null))))))}var d=function(){return r.a.createElement(h,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(d,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,n){e.exports=n(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.e15dc17a.chunk.js.map