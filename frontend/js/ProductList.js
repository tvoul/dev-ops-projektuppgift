class ProductList{
    constructor(){
        this.readDataFromDb();
        this.addEventListeners();
        this.shoppingCart = new ShoppingCart();
    }

    async readDataFromDb(){
        let rawData = await fetch('/api/products')
        let data = await rawData.json()
        this.products = []
        for (let element of data){
            let aProduct = new Product(element.id, element.name, element.price, element.description, element.img_link, this);

            this.products.push(aProduct);
        }
        document.querySelector('main').innerHTML = this.render()
    }

    render() {
        // Create the variable html - an empty string
        let html = '<p>Click on a product name to see product details.</p>';
        // Loop through all products and add the html
        // for each product to the html variable
        for (let product of this.products) {
          html += product.renderInList();
        }
        // Return html for all the products
        return html;
      }

      addEventListeners() {

        // Add a click event handler for a product in a list
        listen('click', '.productInList h3', event => {
          // which product did the user click on?
          let productElement = event.target.closest('.productInList');
    
          // read the id from the id attribute of the product div
          let id = +productElement.getAttribute('id').slice(1);
    
          // find the product we clicked on in this.products
          // by using the array method find
          let product = this.products.find(product => product.id === id);
    
          // replace the content in the main element with the
          // detailed html for the product
          document.querySelector('main').innerHTML = `
            <button class="backButton">
              Back to product list
            </button>`
            + product.render();
        });
    
        // Add an event listener for the back button
        listen('click', '.backButton', () => {
          // replace the contents of main with the product list
          document.querySelector('main').innerHTML = this.render();
        });
      }
}
function listen(eventType, cssSelector, func) {
    // delegated event handling
    // listen to the events on the whole body
    // but filter if we should do something
    // based on the css selector
    document.querySelector('body').addEventListener(eventType, function (event) {
      // event.target - the actual/innermost HTML element that 
      // triggers this event
      //
      // closest is used to see if a HTML element or any of its parents
      // matches a certain css selector
      let element = event.target.closest(cssSelector);
      // if no match do nothing more
      if (!element) { return; }
      // otherwise run the function
      func(event);
    });
  }

if (typeof module === 'object' && module.exports) {
    module.exports = ProductList;
  }

