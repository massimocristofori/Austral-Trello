window.TrelloPowerUp.initialize({
  'board-buttons': function(t) {
    return [{
      text: 'Export Board CSV',
      callback: async function(t) {
        try {
          const cards = await t.cards('name', 'idList');
          const lists = await t.lists('id', 'name');

          // Map listId → listName
          const listMap = {};
          lists.forEach(l => listMap[l.id] = l.name);

          // Keep only NON-linked cards (exclude URLs)
          const normalCards = cards.filter(c => !c.name.startsWith('http'));

          if (!normalCards.length) {
            alert('No normal cards found');
            return;
          }

          // Build CSV
          const header = 'List Name,Card Name';
          const rows = normalCards.map(c => {
            const listName = listMap[c.idList] || '';
            const cardName = c.name.replace(/"/g, '""');
            return `"${listName}","${cardName}"`;
          });

          const csv = [header, ...rows].join('\n');

          // Download
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'board-export.csv';
          a.click();

        } catch (err) {
          alert('Error: ' + err.message);
        }
      }
    }];
  }
});
