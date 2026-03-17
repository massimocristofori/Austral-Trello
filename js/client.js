window.TrelloPowerUp.initialize({
  'list-actions': function (t, options) {
    return [{
      text: 'Export this Program as Transportation Agenda',
      callback: async function (t) {
        // Get current list info
        const list = await t.list('id', 'name');
        const cards = await t.cards('name', 'idList');
        const filteredCards = cards.filter(c => c.idList === list.id);

        // Build CSV
        const header = 'Card Name';
        const rows = filteredCards.map(c => `"${c.name.replace(/"/g, '""')}"`);
        const csv = [header, ...rows].join('\n');

        // Download CSV
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${list.name}.csv`;
        a.click();

        return t.closePopup();
      }
    }];
  }
});
