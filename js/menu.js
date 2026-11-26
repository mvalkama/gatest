// The menu: loads menu.json and draws the cards, then makes the filter buttons work.
// In your own site the data comes from the course API; here it's a file next to
// the page, so the hands-on works without a network connection.

const list = document.querySelector('#menu-list');
const status = document.querySelector('#menu-status');
const buttons = document.querySelectorAll('.filters button');

const euros = new Intl.NumberFormat('en-FI', { style: 'currency', currency: 'EUR' });
let items = [];

function card(item) {
  const li = document.createElement('li');
  li.className = 'card';
  const name = document.createElement('h3');
  name.textContent = item.name;
  const price = document.createElement('p');
  price.className = 'price';
  price.textContent = item.price === null ? 'Ask at the counter' : euros.format(item.price);
  li.append(name, price);
  if (item.diets.length > 0) {
    const diets = document.createElement('p');
    diets.className = 'diets';
    diets.textContent = item.diets.join(', ');
    li.append(diets);
  }
  return li;
}

function show(filter) {
  const shown = filter === 'all' ? items : items.filter((i) => i.diets.includes(filter));
  list.replaceChildren(...shown.map(card));
  status.textContent = `Showing ${shown.length} of ${items.length}.`;
  for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.filter === filter));
}

for (const b of buttons) {
  b.addEventListener('click', () => show(b.dataset.filter));
}

status.textContent = 'Loading the menu…';

try {
  const res = await fetch('menu.json');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  items = (await res.json()).items;
  show('all');
} catch (error) {
  console.error(error);
  status.textContent = 'The menu could not be loaded.';
}
