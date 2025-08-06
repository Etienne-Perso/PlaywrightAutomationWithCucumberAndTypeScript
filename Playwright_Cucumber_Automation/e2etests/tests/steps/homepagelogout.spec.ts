import { Given, When, Then} from "@cucumber/cucumber"
import {page} from "../../hooks/hooks.spec"
import LoginPage from "../pages/loginpage";
import HomePage from "../pages/homepage";
import { expect } from "@playwright/test";

let homePage:HomePage
let loginPage:LoginPage

Given('user is on the home page', async function () {
    homePage=new HomePage(page, this.log)
    loginPage=new LoginPage(page, this.log)
    await homePage.goToLoginPage()
})

Given ("user is connected", async function (){
    await homePage.isConnected()
})

Given('user upon logout', async function () {
   await homePage.logout()
})

Then('logout should be succesfful', async function () {
    const status=await homePage.waitForLogoutConfirmation()
    expect(status).toEqual(true)
})

When("this is a dammy step", async function() {
    expect(1).toBe(2)
})

