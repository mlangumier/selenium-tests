import { Browser, Builder, By, until } from "selenium-webdriver";
import assert from "assert";

/**
 * Objective: Handle cookie popup & get rank of the team of Clermont.
 */
(async function () {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("https://www.lequipe.fr/Rugby/top-14/page-classement-equipes/general");

    await driver.manage().setTimeouts({ implicit: 5000 });

    const cookieName = "test-cookie";
    // Handle cookies & popup
    const cookies = await driver.manage().getCookies(); // Get all cookies
    console.log("--- COOKIES ---", cookies);
    driver.manage().getCookie(cookieName);
    driver.manage().addCookie({ name: cookieName, value: "cookie value" });
    driver.manage().deleteCookie(cookieName);
    driver.manage().deleteAllCookies();

    // Get row with the text "Clermont"
    // td.table__col.table__col--name
    // const row = await driver.findElement(By.xpath("//table/tr/td/a[contains(text(),'Clermont')]"))
  } catch (e) {
    console.log(e);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}())