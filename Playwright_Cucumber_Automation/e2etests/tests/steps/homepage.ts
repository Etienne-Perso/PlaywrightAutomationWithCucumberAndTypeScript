import {Given, When, Then} from "@cucumber/cucumber"
import {Browser, BrowserContext, chromium} from "@playwright/test"


Given('user is on the home page', async function () {
    let browser = await chromium.launch({headless:false, channel:"chrome", args:["--start-maximized"]})
    let brContext= await browser.newContext({viewport:null, javaScriptEnabled:true})
    let page= await brContext.newPage() 
    await page.goto("https://ecommerce-playground.lambdatest.io/")
    await page.close()
    await browser.close()
});

When('user enter login details', async function () {
    console.log("user is entering login details")
});

Then('login should be successful', async function () {
    console.log("login should be successful")
});

Then('user acount should be displayed', async function () {
    console.log("user acount should be displayed")
});