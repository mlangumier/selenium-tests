import { Browser, Builder, By, until } from "selenium-webdriver";
import assert from "assert";

/**
 * Objective: subscribe to the newletter with an invalid email address and check that the error message displays correctly.
 */
(async function () {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('https://humanbooster.com/');

    await driver.manage().setTimeouts({ implicit: 5000 });

    // Scroll to bottom
    const footer = await driver.findElement(By.className("elementor-location-footer"));
    await driver.actions().scroll(0, 0, 0, 0, footer).perform();

    // Click newsletter input & enter invalid email address
    const input = await driver.findElement(By.name("input_1"));
    input.click();
    input.sendKeys("fake-email&test.com");

    // Click submit button
    const submitButton = await driver.findElement(By.id("gform_submit_button_22"));
    submitButton.click();

    // Wait for error message to display & assert its value
    await driver.wait(until.elementLocated(By.id("validation_message_22_1")), 10000);
    const wrongEmailField = await driver.findElement(By.id("validation_message_22_1"));
    const errorMessage = await wrongEmailField.getText();
    assert.equal("Veuillez compléter le champ pour valider votre inscription.", errorMessage);
  } catch (e) {
    console.log(e)
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}())