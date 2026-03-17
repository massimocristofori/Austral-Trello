window.TrelloPowerUp.initialize({
  'list-actions': function(t) {
    return [{
      text: 'Export Tr. Agenda',
      callback: async function(t) {
        try {
          const list = await t.list('id', 'name');
          const cards = await t.cards('name', 'idList', 'badges');

          const filtered = cards.filter(c => c.idList === list.id);

          if (!filtered.length) {
            alert('No cards in this list');
            return t.closePopup();
          }

          function getCardName(c) {
            if (c.badges && c.badges.attachments) {
              const linked = c.badges.attachments.find(a => a.type === 'card');
              if (linked) return linked.name;
            }
            return c.name;
          }

          const csv = ['Card Name', ...filtered.map(c => `"${getCardName(c).replace(/"/g,'""')}"`)].join('\n');

          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${list.name}-linked-cards.csv`;
          a.click();

          return t.closePopup();
        } catch (err) {
          alert('Error exporting linked cards: ' + err.message);
        }
      }
    }];
  }
});
