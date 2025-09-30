import assert from 'assert';
import { Browser, Builder, By } from 'selenium-webdriver';

(async function template() {
  let driver;

  try {
    // Initialize browser & website
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("https://humanbooster.com");

    // Check if website title is as expected
    const title = await driver.getTitle();
    assert.equal("Title-here", title);

    // Implicit wait: max wait time for the page to load before the script resumes
    await driver.manage().setTimeouts({ implicit: 3000 });

    // Select elements
    const textBox = await driver.findElement(By.name("element-name"));
    const submitButton = await driver.findElement(By.css("button"));

    // Interact with elements
    await textBox.sendKeys("Selenium");
    await submitButton.click();

    // Get an element's value & assert it
    const message = await driver.findElement(By.id("message"));
    const value = await message.getText();
    assert.equal("Received!", value);
  } catch (e) {
    console.error(e);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}())
