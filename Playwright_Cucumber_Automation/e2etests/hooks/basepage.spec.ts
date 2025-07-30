import { Given, When, Then, setDefaultTimeout, Before, After } from "@cucumber/cucumber"
import { Browser, BrowserContext, Page, chromium } from "@playwright/test"

setDefaultTimeout(1000 * 6 * 2)

let browser: Browser
let brContext: BrowserContext
let page: Page

Before(async function () {
    browser = await chromium.launch({ headless: false, channel: "chrome", args: ["--start-maximized"] })
    brContext = await browser.newContext({ viewport: null, javaScriptEnabled: true })
    page = await brContext.newPage()
})

After(async function () {
    await page.close()
    await brContext.close()
    await browser.close()
})

export {page}