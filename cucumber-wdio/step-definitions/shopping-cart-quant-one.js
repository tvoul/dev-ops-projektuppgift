const { Given, When, Then } = require('@wdio/cucumber-framework');
const pauseTime = 50;

Given('that I can see the product list', async () => {
  await browser.url('/');
  await browser.pause(pauseTime);
});

When(/^I click on the buy button for "(.*)"$/, async (productName) => {
  await browser.pause(pauseTime);
  let products = await $$('.productInList');
  let foundProduct;
  for (let product of products) {
    if ((await product.getText()).includes(productName)) {
      foundProduct = product;
    }
  }
  expect(foundProduct).toBeTruthy();
  let buyButton = await foundProduct.$('.buyButton');
  await buyButton.scrollIntoView();
  await buyButton.click();
  await browser.pause(pauseTime);
});

Then(/^(\d*) item of "(.*)" should be added to the cart$/, async (quantity, productName) => {
  await browser.pause(pauseTime);
  let tds = await $$('.shoppingCart tr:first-child td');
  await expect(tds[0]).toHaveText(quantity);
  await expect(tds[1]).toHaveText(productName);
  await tds[0].scrollIntoView();
});