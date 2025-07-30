import {Given, When, Then, setDefaultTimeout, Before, After} from "@cucumber/cucumber"
import {Browser, BrowserContext, Page, chromium} from "@playwright/test"
import { expect } from "@playwright/test"


setDefaultTimeout(1000*6*2)

let browser:Browser
let brContext:BrowserContext
let page:Page

Before (async function () {
    browser = await chromium.launch({headless:false, channel:"chrome", args:["--start-maximized"]})
    brContext= await browser.newContext({viewport:null, javaScriptEnabled:true})
    page= await brContext.newPage() 
})

Given('user is on the home page', async function () {
    await page.goto("https://ecommerce-playground.lambdatest.io/")
    await page.locator("//a[@role='button']//span[@class='title'][normalize-space()='My account']").hover()
    await page.locator("//span[normalize-space()='Login']").click()
});

When('user enter login username as {string}', async function (username) {
    await page.locator("input[name='email']").fill(username)
});

When('user enter login password as {string}', async function (password) {
    await page.locator("input[name='password']").fill(password)
    await page.locator("input[value='Login']").click()
});

Then('user acount should be displayed', async function () {
    let accountInfo = await page.locator("//a[normalize-space()='Edit your account information']").isVisible()
    const badcredentials = await page.locator("//div[@class='alert alert-danger alert-dismissible']").isVisible()
    
    if(accountInfo){
        await page.locator("//a[normalize-space()='Edit your account information']").isVisible()
    }else if(badcredentials){
        console.log("Bad credentials, try again...!")
        }
});

When('user upon logout', async function () {
    const badcredentials = await page.locator("//div[@class='alert alert-danger alert-dismissible']").isVisible()
    if(!badcredentials){
        await page.waitForSelector("//a[@role='button']//span[@class='title'][normalize-space()='My account']")
        await page.locator("//a[@role='button']//span[@class='title'][normalize-space()='My account']").hover();
        await page.locator("//span[normalize-space()='Logout']").click();
        await page.locator("//a[@class='btn btn-primary']").click();
    }
});

Then('logout should be succesfful', async function () {
    const badcredentials = await page.locator("//div[@class='alert alert-danger alert-dismissible']").isVisible()
    if(!badcredentials){
        let AccountLogout = await page.locator("//h1[@class='page-title my-3']").isVisible()
        if(!AccountLogout){
            expect(!AccountLogout).toBe(true)
            console.log("logout is successfull")
        }
    }
});

After(async function (){
    await page.close()
    await brContext.close()
    await browser.close()
})