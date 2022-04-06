async function showBooks(){
    document.querySelector('main').innerHTML = '<h1>Books available</h1>'
    let selectData = (await getData('/api/books'))
    selectData.unshift('table: books');
    renderSelectBox('.data-table', selectData, reactOnUserSelectChoices);
}

showBooks()
