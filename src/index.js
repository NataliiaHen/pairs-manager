const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');
const sortByNameBtn = document.getElementById('sort-by-name');
const sortByValueBtn = document.getElementById('sort-by-value');
const deleteBtn = document.getElementById('delete-pairs');
const showXmlBtn = document.getElementById('show-as-xml');
const errorElem = document.getElementById('errorElem');
let pairs = [];
let xmlShow = false;

// Regex for validation
const regex = /^[a-zA-Z0-9]+\s*=\s*[a-zA-Z0-9]+$/;

function createList(items) {
  list.innerHTML = '';

  if (items.length) {
    items.forEach(({ name, value }) => {
      const li = document.createElement('li');
      li.textContent = `${name}=${value}`;
      list.appendChild(li);
    });
  }
}

function handleReset(event) {
  event && event.preventDefault();
  input.value = '';
  errorElem.hidden = true;
}

function handleSubmit(event) {
  event.preventDefault();

  if (regex.test(input.value)) {
    const [name, value] = input.value.split('=');
    const normalizedName = name.trim();
    const normalizedValue = value.trim();

    // Add pair to array
    pairs.push({
      name: normalizedName,
      value: normalizedValue,
    });

    if (xmlShow) {
      createList(pairs);
      handleReset();
      return;
    }

    // Append pair to list
    const li = document.createElement('li');
    li.textContent = `${normalizedName}=${normalizedValue}`;
    list.appendChild(li);

    // Reset form
    handleReset();
  } else {
    errorElem.hidden = false;
  }
}

function handleDeletePairs() {
  list.innerHTML = '';
  pairs = [];
}

// Sorts list items based on the selected criteria ('name' or 'value') and updates the UI to reflect the sorted order.
function handleSortBy(sortBy) {
  const pairsForSort = [...pairs];

  pairsForSort.sort((item1, item2) => {
    switch (sortBy) {
      case 'name':
        return item1.name.localeCompare(item2.name);

      case 'value':
        return item1.value.localeCompare(item2.value);

      default:
        return 0;
    }
  });

  list.innerHTML = '';

  createList(pairsForSort);
}

// Show list items as XML
function showAsXML() {
  xmlShow = true;

  let xmlString = '<List>\n';

  pairs.forEach(({ name, value }) => {
    xmlString += `  <Item>\n    <Name>${name}</Name>\n    <Value>${value}</Value>\n  </Item>\n`;
  });

  xmlString += '</List>';

  const textNode = document.createTextNode(`${xmlString}`);
  const xmlContainer = document.createElement('pre');

  list.innerHTML = '';

  xmlContainer.appendChild(textNode);
  list.appendChild(xmlContainer);
}

form.addEventListener('submit', handleSubmit);
sortByNameBtn.addEventListener('click', () => handleSortBy('name'));
sortByValueBtn.addEventListener('click', () => handleSortBy('value'));
deleteBtn.addEventListener('click', handleDeletePairs);
showXmlBtn.addEventListener('click', showAsXML);
