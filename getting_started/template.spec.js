import { Browser, Builder, By, until } from "selenium-webdriver";
import assert from "assert";

/**
 * Objective: 
 */
(async function () {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("https://google.com");

    await driver.manage().setTimeouts({ implicit: 5000 });

    // Write your script here...
  } catch (e) {
    console.log(e);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}())