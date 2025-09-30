import assert from "assert";
import { Browser, Builder, until } from "selenium-webdriver";

(async function testLab1() {
  let driver;

  try {
    // Initialize browser & website
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("https://humanbooster.com");

    // Implicit wait: max wait time for the PAGE to load before the script resumes
    await driver.manage().setTimeouts({ implicit: 3000 });

    // Explicit wait: max wait time for the ELEMENT to load before the script resumes
    await driver.wait(until.titleContains("Human Booster"), 3000);

    // Check if website title is as expected
    const title = await driver.getTitle();
    assert.equal("Human Booster sécurise ta carrière dans la Tech", title);
  } catch (e) {
    console.error(e);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
