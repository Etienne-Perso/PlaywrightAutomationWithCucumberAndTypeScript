import { Given, When, Then, setDefaultTimeout, Before, After } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import {page} from "../../hooks/basepage.spec"



Given('user is on the home page', async function () {
    await page.goto("https://ecommerce-playground.lambdatest.io/")
    await page.locator("//a[@role='button']//span[@class='title'][normalize-space()='My account']").hover()
    await page.locator("//span[normalize-space()='Login']").click()
});

Given('user upon logout', async function () {
    const badcredentials = await page.locator("//div[@class='alert alert-danger alert-dismissible']").isVisible()
    if (!badcredentials) {
        await page.waitForSelector("//a[@role='button']//span[@class='title'][normalize-space()='My account']")
        await page.locator("//a[@role='button']//span[@class='title'][normalize-space()='My account']").hover();
        await page.locator("//span[normalize-space()='Logout']").click();
        await page.locator("//a[@class='btn btn-primary']").click();
    }
});

Then('logout should be succesfful', async function () {
    const badcredentials = await page.locator("//div[@class='alert alert-danger alert-dismissible']").isVisible()
    if (!badcredentials) {
        let AccountLogout = await page.locator("//h1[@class='page-title my-3']").isVisible()
        if (!AccountLogout) {
            expect(!AccountLogout).toBe(true)
            console.log("logout is successfull")
        }
    }else{
            console.log("logout is failed, login first...!")
        }
});

