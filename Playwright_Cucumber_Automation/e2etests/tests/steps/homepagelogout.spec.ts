import { Given, When, Then, setDefaultTimeout, Before, After } from "@cucumber/cucumber"
import {page} from "../../hooks/basepage.spec"
import LoginPage from "../pages/loginpage";
import HomePage from "../pages/homepage";

let homePage:HomePage
let loginPage:LoginPage

Given('user is on the home page', async function () {
    homePage=new HomePage(page)
    loginPage=new LoginPage(page)
    await homePage.goToLoginPage()
});

Given ("user is connected as {string} and {string}", async function (username, password){
    await homePage.isConnected(username, password)
})

Given('user upon logout', async function () {
   await homePage.logout()
});

Then('logout should be succesfful', async function () {
    await homePage.waitForLogoutConfirmation()
});