const { chromium } = require("playwright");
const { test } = require("@playwright/test");

test.describe("Test suite 1", () => {
  test("Test 1", async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await authenticate(page);
    await browser.close();
  });
});

const authenticate = async (page) => {
  await page.goto("https://bitheap.tech");
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
