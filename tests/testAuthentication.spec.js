const { chromium } = require("playwright");
const { test, expect } = require("@playwright/test");

test.describe("Test suite 1", () => {
  test("Test 1", async ({ page }) => {
    // const browser = await chromium.launch();
    // const page = await browser.newPage();
    await authenticate(page);
    await prepareOrder(page);
    await placeOrder(page);
    // await browser.close();
  });
});

const authenticate = async (page) => {
  await page.goto("https://bitheap.tech");
  await page
    .locator(
      "css=body > div.cky-consent-container.cky-box-bottom-left > div > div > div > div.cky-notice-btn-wrapper > button.cky-btn.cky-btn-accept"
    )
    .click();
  await page.click("#menu-item-2330");
  await page.locator("[name='xoo-el-username']").fill("playwright");
  await page.locator("[name='xoo-el-password']").fill("playwright");

  await page
    .locator(
      "xpath=/html/body/div[6]/div[2]/div/div/div[2]/div/div/div[2]/div/form/button"
    )
    .click();
  const text = await page.locator("#menu-item-2333 > a").textContent();
  if (text !== "Hello, Playwright") {
    console.error("Authentication was not successful!");
  }
  await page.screenshot({ path: "screenshot1.png" });
};

const prepareOrder = async (page) => {
  await page.click("#menu-item-1310");
  await page.locator('xpath=//*[@id="main"]/nav/ul/li[2]/a').click();
  await page
    .locator(
      "css=#main > ul > li.product.type-product.post-211.status-publish.instock.product_cat-uncategorized.purchasable.product-type-simple > a.button.product_type_simple.add_to_cart_button.ajax_add_to_cart"
    )
    .click();
  await page.locator("xpath=/html/body/nav/div[1]/div[3]/div/a").click();
  await page.getByText("Proceed to checkout").click();
  await page.getByPlaceholder("House number and street name").fill("test");
};

const placeOrder = async (page) => {
  await page.locator('xpath=//*[@id="billing_postcode"]').fill("12345");
  await page.locator("css=#billing_city").fill("Zuurich");
  await page.click("#place_order");
  await page.screenshot({ path: "screenshot2.png" });
};
