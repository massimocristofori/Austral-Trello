window.TrelloPowerUp.initialize({
  'list-actions': function (t, options) {
    return [{
      text: 'Export this list as CSV',
      callback: function (t) {
        return t.popup({
          title: 'Export List',
          url: 'export.html',
          height: 200
        });
      }
    }];
  }
});
