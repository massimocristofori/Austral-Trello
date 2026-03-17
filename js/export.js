const t = TrelloPowerUp.iframe();

// Populate dropdown with board lists
async function loadLists() {
  const lists = await t.lists('id', 'name');
  const select = document.getElementById('listSelect');

  lists.forEach(list => {
    const option = document.createElement('option');
    option.value = list.id;
    option.textContent = list.name;
    select.appendChild(option);
  });
}

async function getCardsByList(listId) {
  const cards = await t.cards('name', 'idList');
  return cards.filter(c => c.idList === listId);
}

function toCSV(cards) {
  const header = 'Card Name';
  const rows = cards.map(c => `"${c.name.replace(/"/g, '""')}"`);
  return [header, ...rows].join('\n');
}

function downloadCSV(csv, listName) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${listName}.csv`;
  a.click();
}

// Export button click
document.getElementById('exportBtn').addEventListener('click', async () => {
  const select = document.getElementById('listSelect');
  const listId = select.value;
  const listName = select.options[select.selectedIndex].text;

  const cards = await getCardsByList(listId);
  const csv = toCSV(cards);

  downloadCSV(csv, listName);
  t.closePopup();
});

// Load the dropdown
loadLists();
