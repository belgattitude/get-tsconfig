import c from"path";const m=/^\.{1,2}\//,g=/\*/g,u=(t,n)=>{const r=t.match(g);if(r&&r.length>1)throw new Error(n)};function P(t){if(t.includes("*")){const[n,r]=t.split("*");return{prefix:n,suffix:r}}return t}const d=({prefix:t,suffix:n},r)=>r.startsWith(t)&&r.endsWith(n);function v(t,n,r){return Object.entries(t).map(([a,i])=>(u(a,`Pattern '${a}' can have at most one '*' character.`),{pattern:P(a),substitutions:i.map(s=>{if(u(s,`Substitution '${s}' in pattern '${a}' can have at most one '*' character.`),!s.startsWith("./")&&!n)throw new Error("Non-relative paths are not allowed when 'baseUrl' is not set. Did you forget a leading './'?");return c.join(r,s)})}))}function x(t){var n;if(!((n=t.config.compilerOptions)!=null&&n.paths))return null;const{baseUrl:r,paths:a}=t.config.compilerOptions,i=c.resolve(c.dirname(t.path),r||"."),s=v(a,r,i);return function(o){if(m.test(o))return[];const l=[];for(const e of s){if(e.pattern===o)return e.substitutions;typeof e.pattern!="string"&&l.push(e)}let h,p=-1;for(const e of l)d(e.pattern,o)&&e.pattern.prefix.length>p&&(p=e.pattern.prefix.length,h=e);if(!h)return[];const f=o.slice(h.pattern.prefix.length,o.length-h.pattern.suffix.length);return h.substitutions.map(e=>e.replace("*",f))}}export{x as createPathsMatcher};
