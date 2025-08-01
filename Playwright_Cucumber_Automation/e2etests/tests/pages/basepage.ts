import { Page } from "@playwright/test"


export default class BasePage{

   protected page: Page    

    constructor(page:Page){
        this.page=page
    }

    async click(object:any){
        const locator = await this.getLocator(object)
        await locator.click()
        console.log(`Clicked on ${object['description']}`)
    }

    async enter(object:any, data:string){
        const locator = await this.getLocator(object)
        await locator.fill(data)
        console.log(`Entered value ${data} on ${object['description']}`)
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