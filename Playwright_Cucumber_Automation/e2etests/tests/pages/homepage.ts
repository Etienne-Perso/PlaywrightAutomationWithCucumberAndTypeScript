import {Page} from "@playwright/test"
import * as HomePageLoc from "../locators/homepageloc.json"
import * as LoginPageLoc from "../locators/loginpageloc.json"
import BasePage from "./basepage"
import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager"

export default class HomePage extends BasePage{

    constructor(page:Page, log:ICreateLog){
        super(page, log)
    }

      async goToLoginPage(){
        const accMenuLoc = await this.getLocator(HomePageLoc.accMenu)
        await accMenuLoc.hover()
        const loginLink = await this.getLocator(HomePageLoc.loginLink)
        await loginLink.click()
    }

    async isConnected(){
        await this.enter(LoginPageLoc.emailField, process.env.user_name!)
        await this.enter(LoginPageLoc.pwdField, process.env.password!)
        await this.click(LoginPageLoc.loginBtn)
    }

    async logout(){
        const badcredentialsLoc = await this.getLocator(LoginPageLoc.dismissibleAlert)
        let badcredentials = await badcredentialsLoc.isVisible()
        if (!badcredentials) {
            await this.page.waitForSelector(HomePageLoc.accMenu.locator)
            await this.page.locator(HomePageLoc.accMenu.locator).hover()
            await this.click(HomePageLoc.logoutLink)
            await this.click(HomePageLoc.continueBtn)
        }
    }

    async waitForLogoutConfirmation(){
        const badcredentialsLoc = await this.getLocator(LoginPageLoc.dismissibleAlert)
        let badcredentials = await badcredentialsLoc.isVisible()
        if (!badcredentials) {
            const AccountLogoutLoc = await this.getLocator(HomePageLoc.accLogoutText)
            let AccountLogout = await AccountLogoutLoc.isVisible()
            if (!AccountLogout) {
                //expect(!AccountLogout).toBe(true)
                this.log("logout is successfull")
                return true
            }
        }else{
                this.log("login is failed...!")
                this.log("You can't logout...! login first...!")
                this.log("logout is failed")
                return true
            }    
        }
}