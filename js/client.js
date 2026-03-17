// js/client.js

console.log('Power-Up loaded'); // <-- This confirms the Power-Up is being loaded by Trello

window.TrelloPowerUp.initialize({
  'board-buttons': function(t, options) {
    return [{
      text: 'Export List CSV',
      callback: function(t) {
        console.log('Board button clicked'); // <-- Logs when the button is pressed
        return t.popup({
          title: 'Export List',
          url: 'export.html',
          height: 200
        });
      }
    }];
  }
});
