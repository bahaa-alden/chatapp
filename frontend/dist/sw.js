if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,c)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let a={};const o=e=>n(e,s),f={module:{uri:s},exports:a,require:o};i[s]=Promise.all(r.map((e=>f[e]||o(e)))).then((e=>(c(...e),a)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"0733a278ff6b19ccd455599e08a7328a"},{url:"assets/index-5c811690.js",revision:null},{url:"assets/index-74e60aeb.css",revision:null},{url:"favicon.ico",revision:"9bf7cbefc2a4965a715aaa5133559932"},{url:"index.html",revision:"aaf6f7a0e1b32042547eb5950ae54fbb"},{url:"mask-icon.svg",revision:"3bc7430c9eb10da5baf612fb46b951a3"},{url:"pwa-192x192.png",revision:"1d9346cf356537ef3a8f41e5aef76a30"},{url:"pwa-512x512.png",revision:"9b9d25e7a707c8c13371755c6d2c171b"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"9bf7cbefc2a4965a715aaa5133559932"},{url:"apple-touch-icon.png",revision:"0733a278ff6b19ccd455599e08a7328a"},{url:"pwa-192x192.png",revision:"1d9346cf356537ef3a8f41e5aef76a30"},{url:"pwa-512x512.png",revision:"9b9d25e7a707c8c13371755c6d2c171b"},{url:"manifest.webmanifest",revision:"d0c17733640c822520bf93f4bb8f9953"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
