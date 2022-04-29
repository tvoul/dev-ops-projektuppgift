const { expect } = require('@jest/globals');
const { listen } = require('../frontend/js/helpers.js');
global.listen = listen; // Make listen available for all files (ProductList etc)
const ShoppingCart = require('../frontend/js/ShoppingCart.js');
global.Product = require('../frontend/js/Product.js');
global.ShoppingCart = require('../frontend/js/ShoppingCart.js');

// mock fetch so that we think that a user is logged in
// needed for the add method in ShoppingCart
global.fetch = function (url, options) {
    if (url === '/api/login') {
        // sloppy mock but maybe enough?
        return { json: () => ({ email: 'somemail@gmail.com' }) };
    }
}

// mock the toastr library used ? (Ask Thomas)
global.toastr = {
    error: () => { },
    success: () => { }
}

// Add a div to our fake with the correct id #shoppingCart
// needed for the add method when it tries to add the result
// of the render method to the DOM
let div = document.createElement('div'); // create a div html element
div.id = 'shoppingCart' // give it the id shoppingCart
document.body.append(div); // add it to the fake DOM (jsDOM)


const myShoppingCart = new ShoppingCart();

describe('Test the shopping cart', () => {


    test('The shopping cart should be empty at start', () => {

        expect(myShoppingCart.orderRows).toHaveLength(0);
    });

    test('Add a product to shopping cart', async () => {

        // id, name, price, description, image, myProductList
        let cartProduct = new Product(1, 'Fork', 19, 'Rare fork.', 'http://someimg.jpg');

        await myShoppingCart.add(5, cartProduct);

    });

    test('A row with a product is expected to be added to shopping cart', () => {
        expect(myShoppingCart.orderRows).toHaveLength(1);
    })
});