const { Given, When, Then } = require('@wdio/cucumber-framework');
const pauseTime = 50;

Given('that I am logged in', async () => {
  await browser.url('/');
  let loginHref = await $('#loginHref')
  await loginHref.click()
  let email = await $('#email')
  await email.setValue('user@gmail.com')
  let password = await $('#password')
  await password.setValue('12345678')
  await $('#loginBtn').click()
  browser.pause(pauseTime)
});

When(/^I click on the buy button for "(.*)"$/, async (productName) => {
  browser.pause(pauseTime)
  await browser.url('/');
  let products = await $$('.productInList');
  let foundProduct;
  for (let product of products) {
    if ((await product.getText()).includes(productName)) {
      foundProduct = product;
    }
  }
  browser.pause(pauseTime)
  expect(foundProduct).toBeTruthy();
  let buyButton = await foundProduct.$('.buyButton');
  await buyButton.scrollIntoView();
  await buyButton.click();
});

Then(/^(\d*) item of "(.*)" should be added to the cart$/, async (quantity, productName) => {
  let tds = await $$('.shoppingCart tr:first-child td');
  await expect(tds[0]).toHaveText(quantity);
  await expect(tds[1]).toHaveText(productName);
  await tds[0].scrollIntoView();
<<<<<<< HEAD
  await browser.pause(pauseTime);
});

=======
});

//trigger actions
>>>>>>> parent of 655e4d0 (Reverting to when WDIO worked)
