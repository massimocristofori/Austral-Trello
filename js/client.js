window.TrelloPowerUp.initialize({
  'list-actions': function(t, options) {
    return [{
      text: 'Generate TA',
      callback: async function(t) {
        const list = await t.list('id', 'name');
        const cards = await t.cards('name', 'idList', 'idBoard');

        // Filter only cards in this list that are from a different board
        const linkedCards = cards.filter(c => c.idList === list.id && c.idBoard !== list.idBoard);

        if (linkedCards.length === 0) {
          alert('No linked cards in this list');
          return t.closePopup();
        }

        // CSV
        const header = 'Card Name';
        const rows = linkedCards.map(c => `"${c.name.replace(/"/g, '""')}"`);
        const csv = [header, ...rows].join('\n');

        // Download CSV
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${list.name}-linked-cards.csv`;
        a.click();

        return t.closePopup();
      }
    }];
  }
});
