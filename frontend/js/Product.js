class Product{
    static eventListenersAdded = false;
    constructor(id, name, price, description, image, myProductList){
        if (!Product.eventListenersAdded) {
            this.addEventListeners();
          }

        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.myProductList = myProductList;
        this.image = image;
    }
    render() {
        return `
          <div class="product" id="i${this.id}">
            <h3>${this.name}</h3>
            <img src="${this.image}">
            <div>${this.description}</div>
              <p class="price">Price: ${this.price} kr</p>
              <form>
                <input type="number" value="1" class="quantity" min="1" max="100">
                <button type="submit" class="buyButton">Buy</button>
              </form>
          </div>
        `;
      }
    
      // A method that shows compact info about the product (in a list)
      renderInList() {
        return `
          <div class="productInList" id="i${this.id}">
            <img src="${this.image}">
            <h3>${this.name}</h3>
            <p class="price">Price: ${this.price} kr</p>
            <form>
              <input type="number" value="1" class="quantity" min="1" max="100">
              <button type="submit" class="buyButton">Buy</button>
            </form>
          </div>
        `;
      }

      addEventListeners() {

        listen('submit', '.productInList form, .product form', event => {
          // All web browser wants to reload the page on a form submit
          // (for historical reasons) - we don't want that so we ask
          // the browser to not perform it default action.
          event.preventDefault();
    
          // get the form element and then the quantity input field
          // - then read the quantity value
          let formElement = event.target;
          let quantityElement = formElement.querySelector('.quantity');
          let quantity = +quantityElement.value;

          // which product did the user click on?
          let productElement = event.target.closest('.productInList, .product');
          // read the id from the id attribute of the product div
          let id = +productElement.getAttribute('id').slice(1);
          // find the product we clicked on in this.products
          // by using the array method find
          let product = this.myProductList.products.find(product => product.id === id);
    
          this.myProductList.shoppingCart.add(quantity, product);
          toastr.success('Added ' + quantity + ' - '+ product.name)
    
        });
    
        Product.eventListenersAdded = true;
    
      }
}

