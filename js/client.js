window.TrelloPowerUp.initialize({
  'list-actions': function (t, options) {
    return [{
      text: 'Export Transportation Agenda',
      callback: function (t) {
        return t.popup({
          title: 'Export TA',
          url: 'export.html',
          height: 200
        });
      }
    }];
  }
});
