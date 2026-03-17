window.TrelloPowerUp.initialize({
  'list-actions': function(t) {
    return [{
      text: 'Export linked cards CSV 1',
      callback: async function(t) {
        try {
          const list = await t.list('id', 'name');
          const cards = await t.cards('name', 'idList');

          const filtered = cards.filter(c => c.idList === list.id);

          const names = [];

          for (const c of filtered) {
            if (c.name.startsWith('http')) {
              const shortId = extractCardId(c.name);
              if (shortId) {
                try {
                  const realName = await fetchCardName(shortId);
                  names.push(realName);
                } catch {
                  names.push(c.name); // fallback
                }
              } else {
                names.push(c.name);
              }
            } else {
              names.push(c.name);
            }
          }

          const csv = ['Card Name', ...names.map(n => `"${n.replace(/"/g,'""')}"`)].join('\n');

          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${list.name}.csv`;
          a.click();

          return t.closePopup();

        } catch (err) {
          alert('Error: ' + err.message);
        }
      }
    }];
  }
});

// helpers
function extractCardId(url) {
  const match = url.match(/\/c\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

async function fetchCardName(shortId) {
  const res = await fetch(`https://api.trello.com/1/cards/${shortId}?fields=name`);
  const data = await res.json();
  return data.name;
}
