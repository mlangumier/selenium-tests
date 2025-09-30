import { Builder, By } from "selenium-webdriver";
import assert from "assert";

(async function() {
  let driver;

  try {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    const title = await driver.getTitle();
    assert.equal("Web form", title);

    await driver.manage().setTimeouts({implicit: 500});
    
    const textBox = await driver.findElement(By.name("my-text"));
    const submitButton = await driver.findElement(By.css("button"));

    await textBox.sendKeys('Selenium');
    await submitButton.click();
    await driver.manage().setTimeouts({implicit: 5000});

    const message = await driver.findElement(By.id("message"));
    const value = await message.getText();
    assert.equal("Received!", value);
  } catch(e) {
    console.log(e);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}())
