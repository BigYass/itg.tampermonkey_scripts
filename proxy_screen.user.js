// ==UserScript==
// @name         Screen Proxy
// @namespace    http://tampermonkey.net/
// @version      0.1.1
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


  /* -------- XMLHttpRequest -------- */
  const _open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    if (method === "POST" && rl === "https://connect.itguard.fr/Services/PageService.ashx/AddSessionEvents"){
      console.log("Blocked !")
      return
    }

    return _open.apply(this, arguments);
  };

})();
