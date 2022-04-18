const { Given, When, Then } = require('@wdio/cucumber-framework');
const pauseTime = 0;

Given(/^that I have put a "(.*)" in my cart$/, async (productName) => {
  await browser.url('/');
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
});

When(/^I click on the delete button on "(.*)"$/, async (productName) => {
    let tds = await $$('.shoppingCart tr:first-child td');
    await tds[4].scrollIntoView();
    let deleteButton = await tds[4].$('.deleteButton')
    await deleteButton.click()
});

Then('the total amount due should be 0', async () => {
  let tds = await $$('.shoppingCart tr:first-child td');
  await tds[1].scrollIntoView();
  let total = await tds[1].getText()
  await expect(total).toBe('0,00 kr')
});