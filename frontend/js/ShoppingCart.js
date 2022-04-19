class ShoppingCart {

  orderRows = [];

  constructor(){
    this.addEventListener();
  }

  add(quantity, product) {
      toastr.success('Added ' + quantity + ' - ' + product.name)
      // check if the product alread is in the cart
      let found = false;
      for (let orderRow of this.orderRows) {
        if (orderRow.product === product) {
          // add quantity
          orderRow.quantity += quantity;
          found = true;
        }
      }

      // if the product wasn't in the cart already
      if (!found) {
        // Add a new order row
        this.orderRows.push({
          quantity,
          product
        });
      }

      // for now render the shopping cart to the footer
      document.querySelector('#shoppingCart').innerHTML =
        this.render();
  }

  remove(indexId) {
    toastr.info('Removed ' + this.orderRows[indexId].quantity + ' - ' + this.orderRows[indexId].product.name)
      this.orderRows.splice(indexId, 1);
      // rerender
         // for now render the shopping cart to the footer
      document.querySelector('#shoppingCart').innerHTML =
      this.render();
    }

  formatSEK(number) {
    return new Intl.NumberFormat(
      'sv-SE',
      { style: 'currency', currency: 'SEK' }
    ).format(number);
  }

  render() {
    // create a html table where we display
    // the order rows of the shopping cart
    let html = '<div class="shoppingCart"><table>';
    let totalSum = 0;
    for (let orderRow of this.orderRows) {
      let rowSum =
        orderRow.quantity * orderRow.product.price;
      html += `
        <tr class="rowId" id="i${this.orderRows.indexOf(orderRow)}">
          <td>${orderRow.quantity}</td>
          <td>${orderRow.product.name}</td>
          <td>à ${this.formatSEK(orderRow.product.price)}</td>
          <td>${this.formatSEK(rowSum)}</td>
          <td><button type="click" class="deleteButton">X</button></td>
        </tr>
      `;
      totalSum += rowSum;
    }
    // add the totalSum
    html += `<tr>
      <td colspan="3">Total:</td>
      <td>${this.formatSEK(totalSum)}</td>
    </tr>`;
    return html;
  }

  addEventListener(){
    listen('click', '#shoppingCart .deleteButton', event =>{
      let button = event.target;
      let rnd  = button.closest('tr').getAttribute('id')
      let id = rnd.slice(1)
      console.log(id);
      this.remove(id);

    })
  }

}
