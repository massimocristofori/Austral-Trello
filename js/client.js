// js/client.js

window.TrelloPowerUp.initialize({
  'list-actions': function(t, options) {
    return [{
      text: 'Export this list as CSV',
      callback: async function(t) {
        // Get current list info
        const list = await t.list('id', 'name');

        // Get all cards on the board
        const cards = await t.cards('name', 'idList');

        // Filter cards belonging to this list
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

        // Close the list-action menu
        return t.closePopup();
      }
    }];
  }
});
