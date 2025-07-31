import {Page} from "@playwright/test"
import * as LoginPageLoc from "../locators/loginpageloc.json"

export default class LoginPage{

    private page: Page    

    constructor(page:Page){
        this.page=page
    }

    async enterUsername(username:string){
        await this.page.locator(LoginPageLoc.emailField.locator).fill(username)
    }

     async enterPassword(password:string){
        await this.page.locator(LoginPageLoc.pwdField.locator).fill(password)
        await this.page.locator(LoginPageLoc.loginBtn.locator).click()
        await this.page.waitForTimeout(1000)
    }

    async waitForEditAccInfo(){
        const accountInfo = await this.page.locator(LoginPageLoc.accInfo.locator).isVisible()
        const badcredentials = await this.page.locator(LoginPageLoc.dismissibleAlert.locator).isVisible()

        if (accountInfo) {
            await this.page.locator(LoginPageLoc.accInfo.locator).isVisible()
            //(accountInfo).toBe(true)
            console.log("login is successfull")
            return true
        } else if (badcredentials) {
            console.log("Login failed, Bad credentials, try again...!")
            return true
        }
    }
}