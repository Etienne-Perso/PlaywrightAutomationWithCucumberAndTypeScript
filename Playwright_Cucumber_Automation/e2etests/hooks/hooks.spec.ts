import { Given, When, Then, setDefaultTimeout, Before, After, BeforeAll, AfterAll, AfterStep, BeforeStep } from "@cucumber/cucumber"
import { Browser, BrowserContext, Page, chromium, firefox } from "@playwright/test"
import dotenv from "dotenv"

setDefaultTimeout(1000 * 6 * 2)

let browser: Browser
let brContext: BrowserContext
let page: Page

BeforeAll(async function (){
    dotenv.config({
        path:`${process.cwd()}/config/.env.${process.env.npm_config_env}`
    })

    let browserType = process.env.browser
    switch (browserType) {
        case "chrome":
        case "gc": 
            browser = await chromium.launch({ headless: false, channel: "chrome", args: ["--start-maximized"] })
            break

        case "edge":
        case "msedge":
            browser = await chromium.launch({ headless: false, channel: "msedge", args: ["--start-maximized"] })
            break
        case "firefox":
        case "ff":
            browser = await firefox.launch({ headless: false, channel: "firefox", args: ["--start-maximized"] })
            break

        default:
            throw new Error(`Invalid browser type ${browserType} is passed...! Please correct it`)
    }
})

Before(async function (scenario) {  
    brContext = await browser.newContext({ viewport: null, javaScriptEnabled: true })
    page = await brContext.newPage()
    await page.goto(process.env.app_url!)
    console.log(`${scenario.pickle.name} is started......!!!`)
})

After(async function (scenario) {
    await page.close()
    await brContext.close()
    console.log(`${scenario.pickle.name} is ended......!!!`)
    console.log(`The status of test is >>>>: ${scenario.result?.status}`)
})

AfterStep(async function (scenario) {
    console.log(`${scenario.pickleStep.text} is started....!`)
})

BeforeStep(async function (scenario) {
    console.log(`${scenario.pickleStep.text} is ended......!`)
})


AfterAll(async function (){
    await browser.close()
})

export {page}