function renderAddProductForm() {
  return `
     <h1>Add product</h1>
    <form name="addProduct">
      <label>
        <span>Product name:</span><input required minlength="2" name="productName" type="text">
      </label>
      <label>
        <span>Description:</span><input required name="description" type="text">
      </label>
      <label>
        <span>Price:</span><input name="price" type="price">
      </label>
      <label>
        <span>Img Url:</span><input name="imgUrl" type="imgUrl">
      </label>
      <input type="submit" value="AddProduct">
    </form>   `;
}

document.querySelector('body').addEventListener('submit', async (event) => {

    let target = event.target;

    if (!target.closest('form[name="addProduct"]')) { return; }

    event.preventDefault();

    let formElements = document.forms.addProduct.elements;
    let requestBody = {};
    for (let element of formElements) {
        if (element.type === 'submit') { continue; }
        requestBody[element.name] = element.value;
    }

    let result = {};
    try {
        result = await (await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })).json();
    }
    catch (ignore) { }

    if (!result.changes) {
        document.querySelector('.addProduct').innerHTML = `
      <h3>Something went wrong!</h3>
      <p>We could add product because of a technical problem.</p>
      <p>Please try again later!</p>
    `;
        return;
    }

    document.querySelector('.addProduct').innerHTML = `
    <h3>The product is now availible to buy!</h3>
  `;
});

document.querySelector('body').addEventListener('click', (event) => {

    if (!event.target.closest('a[href="/addProduct"]')) { return; }

    event.preventDefault();

    let registerDiv = document.querySelector('.addProduct');
    registerDiv.innerHTML = renderAddProductForm();
    registerDiv.classList.remove('hidden');
    document.querySelector('.modal-hider').classList.remove('hidden');
});


