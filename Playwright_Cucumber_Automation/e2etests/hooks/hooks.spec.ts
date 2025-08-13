import { setDefaultTimeout, Before, After, BeforeAll, AfterAll, AfterStep, BeforeStep, Status } from "@cucumber/cucumber"
import { Browser, BrowserContext, Page, chromium, firefox } from "@playwright/test"
import dotenv from "dotenv"

setDefaultTimeout(1000 * 6 * 2)

let browser: Browser
let brContext: BrowserContext
let page: Page

BeforeAll(async function (){
    dotenv.config({
        path:`${process.cwd()}/config/.env.${process.env.environment ?? 'qa'}` //if user enter nothing, by default qa environment will be selected
    })

    let browserType = process.env.browser ?? "chrome" //if user enter nothing, by default chrome will be launched
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
    this.attach(`${scenario.pickle.name} is started......!!!`)
})

After(async function (scenario) {
    this.attach(`${scenario.pickle.name} is ended......!!!`)
    this.attach(`The status of test is >>>>: ${scenario.result?.status}`)

    this.attach("this is a simple log text...!")

    const obj={
        fname:"John",
        lname:"Kiny",
        zip:30000      
    }
    this.attach(JSON.stringify(obj), "application/json")

    if (scenario.result?.status == Status.FAILED){
        const img = await page.screenshot({
            path:`./reports/${scenario.pickle.name}.png`
        })
        this.attach(img, "image/png")
    }

    await page.close()
    await brContext.close()
})

BeforeStep(async function (scenario) {
    this.attach(`${scenario.pickleStep.text} is started ......!`)
})

AfterStep(async function (scenario) {
    this.attach(`${scenario.pickleStep.text} is ended....!`)
})

AfterAll(async function (){
    await browser.close()
})

export {page}