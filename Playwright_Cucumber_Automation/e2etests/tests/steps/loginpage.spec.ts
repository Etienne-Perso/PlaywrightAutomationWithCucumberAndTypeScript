import { Given, When, Then, setDefaultTimeout, Before, After } from "@cucumber/cucumber"
import { page } from "../../hooks/basepage.spec";
import LoginPage from "../pages/loginpage";
import { expect } from "@playwright/test";

let loginPage:LoginPage

When ('user enter login details as {string} and {string}', async function (username, password) {
    loginPage=new LoginPage(page)
    await loginPage.enterUsername(username)
    await loginPage.enterPassword(password)    
})

Then('user acount should be displayed', async function () {
    const status = await loginPage.waitForEditAccInfo()
    expect(status).toBe(true)   
})