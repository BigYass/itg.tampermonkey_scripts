// ==UserScript==
// @name         Screen Proxy
// @namespace    http://tampermonkey.net/
// @version      0.1.5
// @description  Un proxy pour ConnectWise
// @author       BigYass
// @match        https://*.fr/Host
// @include      /^https://connect\.[^/]+\.fr\/Host$/
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZTY2MjMyIiBkPSJNOC4yNSAyMUwzIDE1Ljc1di03LjVMOC4yNSAzaDcuNUwyMSA4LjI1djcuNUwxNS43NSAyMXptLjktNC43NUwxMiAxMy40bDIuODUgMi44NWwxLjQtMS40TDEzLjQgMTJsMi44NS0yLjg1bC0xLjQtMS40TDEyIDEwLjZMOS4xNSA3Ljc1bC0xLjQgMS40TDEwLjYgMTJsLTIuODUgMi44NXoiLz48L3N2Zz4=
// @grant        none
// @updateURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/proxy_screen.user.js
// @downloadURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/main/proxy_screen.user.js
// ==/UserScript==
!function(){"use strict";const t=XMLHttpRequest.prototype.open,e=XMLHttpRequest.prototype.send;let n=!0;XMLHttpRequest.prototype.open=function(e,n){return this.__tm_url=n,this.__tm_method=e,t.apply(this,arguments)},XMLHttpRequest.prototype.send=function(t){return n&&"https://connect.itguard.fr/Services/PageService.ashx/AddSessionEvents"===this.__tm_url&&t.length>1&&/"EventType"\s*:\s*3/.test(t)?(console.log(this.__tm_url+" blocked"),void this.abort()):e.apply(this,arguments)};let o=null;function s(t){clearTimeout(o),o=setTimeout(()=>{t.style.opacity="0"},2e3)}function l(t){t.textContent=n?"Block: ON":"Block: OFF",t.style.background=n?"#67f86cff":"#d2d2d2c1"}function i(){if(document.getElementById("itguard-toggle-block-btn"))return;const t=document.createElement("button");t.id="itguard-toggle-block-btn",t.type="button",function(t){t.style.position="fixed",t.style.right="12px",t.style.top="12px",t.style.zIndex="999999",t.style.padding="8px 10px",t.style.borderRadius="8px",t.style.border="1px solid #999",t.style.font="12px/1.2 Arial, sans-serif",t.style.cursor="pointer",t.style.boxShadow="0 2px 8px rgba(0,0,0,.15)",t.style.userSelect="none",t.style.opacity="0",t.style.transition="opacity 0.3s ease, transform 0.15s ease"}(t),l(t),t.addEventListener("mouseenter",()=>{t.style.opacity="1",t.style.transform="scale(1.03)",clearTimeout(o)}),t.addEventListener("mouseleave",()=>{t.style.transform="scale(1)",s(t)}),t.addEventListener("click",()=>{n=!n,l(t)}),s(t),document.documentElement.appendChild(t)}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",i,{once:!0}):i()}();