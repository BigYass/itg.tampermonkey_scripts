// ==UserScript==
// @name         AteraSounds
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Change Atera Alerts Sounds to customs one
// @author       BigYass
// @match        https://app.atera.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atera.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // 1) Déclare un objet de mappage : url/original → url/ton-sound
  const soundReplacements = {
    'bike.mp3': null,
    'door.mp3': 'none',
    'horn.mp3': null,
    'houston.mp3': 'https://download938.mediafire.com/pgoc5h8kujegy3nwhL48bG5-s59scwTTaNagIaoa0e738plZk73bKWb3FddK5q0N_515pY4xpucff8jin2Cce2ayl86PGMXGr7ZlOZ5X_5NmcmmhGF3z1ZYOQ4TH9RjZIFWcXgbjtBk0SiDoipIhtMMpOqD_UG5tREnJJ9ZL0U9_dgXF/9crwot6j6u3xybx/ding.mp3',
    'siren.mp3': null,
  };

  const old_play = HTMLAudioElement.prototype.play

  HTMLAudioElement.prototype.play = function(...args) {
    console.log('▶️ Interception d’un .play()');
    try {
      if (this.src){
        console.log('src = ', this.src)

        
        for(const [key, value] of Object.entries(soundReplacements)) {
          if (this.src.endsWith(key)){
            if (value) {
              if (value === 'none') return Promise.resolve()

              this.src = value
              this.load()

              console.log("new src =", this.src)
            }
          }

        }
      } 
    } catch (error) {
      console.log('erreur : ', error)
    }
    
    return old_play.apply(this, args);
  }

  console.log('✅ Script de remplacement de sons chargé.');

  
  

})();