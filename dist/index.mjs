import p from"path";import{sys as s,findConfigFile as m,readConfigFile as l,parseJsonConfigFileContent as c}from"typescript";import d from"aggregate-error";var r=new Map;function C(e=process.cwd()){var f;let o=r.get(e);if(o)return o;let i=e.endsWith(".json")?e:m(e,s.fileExists,"tsconfig.json");if(!i)throw new Error("Could not find a tsconfig.json file.");if(o=r.get(i),o)return o;let t=l(i,s.readFile);if((f=t.error)==null?void 0:f.messageText)throw new Error(t.error.messageText.toString());let n=c(t.config,s,p.dirname(i));if(n.errors.length>0)throw new d(n.errors.map(g=>g.messageText));return o={compilerOptions:n.options},r.set(e,o),i!==e&&r.set(i,o),o}var y=C;export{y as default};
