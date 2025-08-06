import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager"
import { Page } from "@playwright/test"


export default class BasePage{

   protected page: Page
   protected log: ICreateLog

    constructor(page:Page, log: ICreateLog){
        this.page=page
        this.log=log
    }

    async click(object:any){
        const locator = await this.getLocator(object)
        await locator.click()
        this.log(`Clicked on ${object['description']}`)
    }

    async enter(object:any, data:string){
        const locator = await this.getLocator(object)
        await locator.fill(data)
        this.log(`Entered value ${data} on ${object['description']}`)
    }

    async getLocator(object: any){
        return this.page.locator(object["locator"])
    }

    async check(){
        //implementing the code later
    }

    async select(){
        //implementing the code later
    }
}