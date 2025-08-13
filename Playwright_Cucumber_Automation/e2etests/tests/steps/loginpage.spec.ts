import { Given, When, Then, setDefaultTimeout, Before, After } from "@cucumber/cucumber"
import { page } from "../../hooks/hooks.spec";
import LoginPage from "../pages/loginpage";
import { expect } from "@playwright/test";

let loginPage:LoginPage

When ('user enter login details', async function () {
    loginPage=new LoginPage(page, this.attach)
    await loginPage.enterUsername()
    await loginPage.enterPassword() 
    this.parameters.a=10   
})

Then('user acount should be displayed', async function () {
    const status = await loginPage.waitForEditAccInfo()
    expect(status).toBe(true)   
    console.log(`login page: the value is ${this.parameters.a}`)
})