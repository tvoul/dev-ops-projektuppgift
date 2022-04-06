
async function getData(restRoute) {
  let rawData = await fetch(restRoute);
  let result = await rawData.json();
  return result;
}

function renderList(cssSelector, list) {
  let html = '<table>';
  html += '<thead><tr>'
  for (let [key, value] of Object.entries(list[0])) {
    html += '<th class="' + typeof value + '">' + key + '</th>';
  }
  html += '</tr></thead>'
  html += '<tbody>';
  for (let item of list) {
    html += '<tr>';
    for (let value of Object.values(item)) {
      html += '<td class="' + typeof value + '">' + value + '</td>';
    }
    html += '</tr>';
  }
  html += '</tbody></table>';
  document.querySelector(cssSelector).innerHTML = html;
}

function renderSelectBox(cssSelector, list, eventHandlerFunc) {
  let html = '<select>' +
    list.map(item => '<option>' + item + '</option>').join('')
    + '</select>';
  document.querySelector(cssSelector).innerHTML = html;
  let selectBox = document.querySelector(cssSelector + ' select');
  selectBox.addEventListener('change', eventHandlerFunc);
  eventHandlerFunc({ target: selectBox });
}

async function reactOnUserSelectChoices(event) {
  let tableOrView = event.target.value.split(' ')[1];
  renderList('.data-table', await getData('/api/' + tableOrView));
}

async function start(userRole) {
  
  if (userRole === 'user' && window.location.pathname == '/userpage.html'){
    document.querySelector('main').innerHTML = '<h1>You are logged in, showing your orders</h1>'
    let selectData = (await getData('/api/my-orders'))
    selectData.unshift('table: my-orders');
    renderSelectBox('.data-table', selectData, reactOnUserSelectChoices);
  }
  else if(userRole === 'superadmin'  && window.location.pathname == '/user.html'){
    document.querySelector('main').innerHTML = '<h1>Admin view</h1>'
    let selectData = (await getData('/api/tablesAndViews'))
    .map(item => item.type + ': ' + item.name).sort()
    .filter(x => x !== 'table: customers');
    selectData.unshift('table: customers');
    renderSelectBox('.select-holder', selectData, reactOnUserSelectChoices);
  }
}