window.TrelloPowerUp.initialize({
  'board-buttons': function (t) {
    return [{
      text: 'Export List CSV',
      callback: function (t) {
        return t.popup({
          title: 'Export List',
          url: 'export.html',
          height: 250
        });
      }
    }];
  }
});
