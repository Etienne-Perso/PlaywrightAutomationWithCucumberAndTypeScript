import { Given, When, Then, setDefaultTimeout, Before, After } from "@cucumber/cucumber"
import { page } from "../../hooks/hooks.spec";
import LoginPage from "../pages/loginpage";
import { expect } from "@playwright/test";

let loginPage:LoginPage

When ('user enter login details', async function () {
    loginPage=new LoginPage(page)
    await loginPage.enterUsername()
    await loginPage.enterPassword()    
})

Then('user acount should be displayed', async function () {
    const status = await loginPage.waitForEditAccInfo()
    expect(status).toBe(true)   
})