const { expect } = require('@jest/globals');

const { listen } = require('../frontend/js/helpers.js');
global.listen = listen; // Make listen available for all files (ProductList etc)
const ProductList = require('../frontend/js/ProductList.js');
global.Product = require('../frontend/js/Product.js');
global.ShoppingCart = require('../frontend/js/ShoppingCart.js');

new ShoppingCart();

// ProductList expects the DOM to have a main element that it 
// render its list to - mock the main element
let mainEl = document.createElement('main');
document.body.append(mainEl);

// Since fetch exists in browsers but not in our Jest test environment...
// we will mock our own fetch
global.fetch = function (url) {
    if (url === '/api/products') {
        return {
            json: () => [
                {
                    "id": 1,
                    "name": "Wooden Wand",
                    "description": "Wand made with oak wood infuced with a phoenix feather from the first pheonix bird.",
                    "price": 230,
                    "img_link": "https://th.bing.com/th/id/R.6fa1df3f2b009f624705da1fcae7212e?rik=SlgBQHkjZLvwhg&riu=http%3a%2f%2fdlp2gfjvaz867.cloudfront.net%2fproduct_photos%2f43711343%2foak-aug16-1234th-02_original.jpg&ehk=umkHck7ISbiJnBtXLACE%2bxWOfOsS6WaCFHdmxlfZN6k%3d&risl=&pid=ImgRaw&r=0"
                },
                {
                    "id": 2,
                    "name": "Invisibility Cloak",
                    "description": "A cloak that makes you disapare",
                    "price": 2050,
                    "img_link": "https://th.bing.com/th/id/R.7a2d5ac2de36f126240ed08805cea0c4?rik=IRpcZHLBcvk7gw&riu=http%3a%2f%2fwww.shutupandtakemymoney.com%2fwp-content%2fuploads%2f2012%2f11%2fInvisibility-Cloak.jpg&ehk=%2fmvCvITivSTbTe46D%2fICS5KA4DbrgJo8Pfw5P%2b6gFxo%3d&risl=&pid=ImgRaw&r=0"
                }
            ]
        };
    }
}

// Nice helper: You can await pause(ms) to wait for things
const pause = ms => new Promise(res => setTimeout(res, ms));

let myProductList;

test('Check if the product list gets products from the db', async () => {
    // create a new product list
    myProductList = new ProductList();
    // wait for the myProductList to have a property called products
    let maxPauses = 5000 / 10;
    let pausesDone = 0;

    while (!myProductList.products && pausesDone < maxPauses) {
        await pause(10);
        pausesDone++; // add 1 to pausesDone 
    }

    // Consider it an error if we didn't get any products in 5000 ms
    // - that means that we expect the products property to have been set
    // and to be an array
    expect(myProductList.products).toBeInstanceOf(Array);

    // Expect that there is always at least 1 products in the db
    expect(myProductList.products.length).toBeGreaterThan(0);

})



test('Does render send back the correct html/text', () => {
    let products = myProductList.products;
    let renderedOutput = myProductList.render();

    // check that all the product names are inside h3 tags
    for (let product of products) {
        expect(renderedOutput).toContain('<h3>' + product.name + '</h3>');
    }

});