import { Browser, Builder, By, until } from "selenium-webdriver";
import assert from "assert";

/**
 * Objective: Click the first link & get the text of the alert popup.
 */
(async function () {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("https://www.selenium.dev/selenium/web/alerts.html");

    await driver.manage().setTimeouts({ implicit: 5000 });

    // Click on button to display alert
    await driver.findElement(By.id("alert")).click();

    // Get alert text
    await driver.wait(until.alertIsPresent());
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    await alert.accept();

    // Verify value
    assert.equal(alertText, "cheese");

  } catch (e) {
    console.log(e);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}())