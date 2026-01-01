// ==UserScript==
// @name         Screen Proxy
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Un proxy pour ConnectWise
// @author       BigYass
// @match        https://connect.itguard.fr/*
// @icon         https://connect.itguard.fr/FavIcon.axd
// @grant        none
// @updateURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/feat/screen-proxy/proxy_screen.user.js
// @downloadURL https://raw.githubusercontent.com/BigYass/itg.tampermonkey_scripts/feat/screen-proxy/proxy_screen.user.js
// ==/UserScript==

(function() {
  'use strict';

  
  /* -------- fetch -------- */
  const _fetch = window.fetch;
  window.fetch = function (...args) {
    try {
      const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
      console.log('[fetch]', url);
    } catch {}
    return _fetch.apply(this, args);
  };

  /* -------- XMLHttpRequest -------- */
  const _open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    console.log('[xhr]', method, url);
    return _open.apply(this, arguments);
  };

})();
