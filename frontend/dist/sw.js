if(!self.define){let e,i={};const n=(n,a)=>(n=new URL(n+".js",a).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,r)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let c={};const o=e=>n(e,s),d={module:{uri:s},exports:c,require:o};i[s]=Promise.all(a.map((e=>d[e]||o(e)))).then((e=>(r(...e),c)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"b1037e2d96e9f9756e31a463c856af85"},{url:"assets/index-836c0c59.js",revision:null},{url:"assets/index-b4b02c73.css",revision:null},{url:"favicon-16x16.png",revision:"aa5968f12f5337dc7cb994bc37e9e689"},{url:"favicon-32x32.png",revision:"701a1ab610a27b542f4f417f694ab813"},{url:"favicon.ico",revision:"11ea4b54abd5f4af2a08a946d806f3ff"},{url:"index.html",revision:"e8ddadea7fb036bffdd2ee03222d0e8e"},{url:"mask-icon.svg",revision:"a4a9888e85a90ceb3313586eef822197"},{url:"pattern-12.svg",revision:"a238def434dfb330d046c046ee978ebd"},{url:"pwa-192x192.png",revision:"8bd7690e7d29e3caea6cc5576e51342a"},{url:"pwa-512x512.png",revision:"0aaede1dca978682e7013bc1ae3c5bed"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"11ea4b54abd5f4af2a08a946d806f3ff"},{url:"apple-touch-icon.png",revision:"b1037e2d96e9f9756e31a463c856af85"},{url:"pwa-192x192.png",revision:"8bd7690e7d29e3caea6cc5576e51342a"},{url:"pwa-512x512.png",revision:"0aaede1dca978682e7013bc1ae3c5bed"},{url:"manifest.webmanifest",revision:"2829fcffb64367dce449824d6155a33b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
