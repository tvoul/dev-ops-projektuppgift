const { expect } = require('@jest/globals');

const Product = require('../frontend/js/Product.js');

describe('Test the product class', () => {

    test('Creation of a product', () => {

        let myProduct = new Product (1, 'Pizzaslice', 39, 'A slice of a pizza');

        //Check that the constructor really sets the correct property values
        expect(myProduct.id).toBe(1);
        expect(myProduct.name).toBe('Pizzaslice');
        expect(myProduct.price).toBe(39);
        expect(myProduct.description).toBe('A slice of pizza');

    });

    test('An id not equal to a number should fail for Product constructor', () => {
        expect(() => {
            new Product('Xa', 'X', 200, 'description');
        }).toThrow();
    });
        expect(() => {
            new Product(true, 'X', 200, 'description');
        }).toThrow();
});