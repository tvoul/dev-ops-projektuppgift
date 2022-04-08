async function showProducts(){
    document.querySelector('main').innerHTML = '<h1>Products available</h1>'
    let selectData = (await getData('/api/products'))
    selectData.unshift('table: products');
    renderSelectBox('.data-table', selectData, reactOnUserSelectChoices);
}

showProducts()