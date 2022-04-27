const { expect } = require('@jest/globals');
const { listen } = require('../frontend/js/helpers.js');
global.listen = listen; // Make listen available for all files (ProductList etc)
const ShoppingCart = require('../frontend/js/ShoppingCart.js');
global.Product = require('../frontend/js/Product.js');
global.ShoppingCart = require('../frontend/js/ShoppingCart.js');
const myShoppingCart = new ShoppingCart();

describe('Test the shopping cart', () => {

    test('A row with a product is expected to be added to shopping cart', () => {

        expect(myShoppingCart.orderRows).toHaveLength(0);
    })
});

test('add a product to shopping cart', () => {

    let cartProduct = new Product(1, 'Fork', 19, 'Rare fork.');


    // Check that the constructor really sets the correct property values
    expect(cartProduct.id).toBe(1);
    expect(cartProduct.name).toBe('Fork');
    expect(cartProduct.price).toBe(19);
    expect(cartProduct.description).toBe('Rare fork.');

    myShoppingCart.add(5, cartProduct);
});

test('A row with a product is expected to be added to shopping cart', () => {

    expect(myShoppingCart.orderRows).toHaveLength(1);
});