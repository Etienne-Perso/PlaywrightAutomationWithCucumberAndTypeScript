import { Given, When, Then, setDefaultTimeout, Before, After } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { page } from "../../hooks/basepage.spec";


When('user enter login username as {string}', async function (username) {
    await page.locator("input[name='email']").fill(username)
})

When('user enter login password as {string}', async function (password) {
    await page.locator("input[name='password']").fill(password)
    await page.locator("input[value='Login']").click()
    await page.waitForTimeout(1000)
})

Then('user acount should be displayed', async function () {
    const accountInfo = await page.locator("//a[normalize-space()='Edit your account information']").isVisible()
    const badcredentials = await page.locator("//div[@class='alert alert-danger alert-dismissible']").isVisible()

    if (accountInfo) {
        //await page.locator("//a[normalize-space()='Edit your account information']").isVisible()
        expect(accountInfo).toBe(true)
        console.log("login is successfull")

    } else if (badcredentials) {
        console.log("Login failed, Bad credentials, try again...!")
    }
})