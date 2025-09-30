import { Browser, Builder, By, until } from 'selenium-webdriver';

(async function testLab2() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("https://www.selenium.dev/selenium/web/ajaxy_page.html");

    // Generic wait for elements to be displayed
    await driver.manage().setTimeouts({ implicit: 3000 });

    // Select & fill in textbox (text input)
    const textInput = await driver.findElement(By.name("typer"));
    textInput.click();
    await textInput.sendKeys("Green label");

    // Select color (radio input)
    const radioInput = await driver.findElement(By.id("green"));
    await radioInput.click();

    // Click submit button
    const submitBtn = await driver.findElement(By.name("submit"));
    await submitBtn.click();

    // Wait for result to be displayed (async -> need more than the 3s from implicit wait)
    await driver.wait(until.elementsLocated(By.css("div.label")), 10000);
    // const items = await driver.findElements(By.css("div.label"));
  } catch (e) {
    console.error(e);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
