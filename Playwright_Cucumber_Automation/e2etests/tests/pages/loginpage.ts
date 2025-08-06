import {Page} from "@playwright/test"
import * as LoginPageLoc from "../locators/loginpageloc.json"
import BasePage from "./basepage"
import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager"

export default class LoginPage extends BasePage{

      
    constructor(page:Page, log: ICreateLog){
        super(page, log)
    }

    async enterUsername(){
        await this.enter(LoginPageLoc.emailField, process.env.user_name!)
    }

     async enterPassword(){
        await this.enter(LoginPageLoc.pwdField, process.env.password!)
        await this.click(LoginPageLoc.loginBtn)
        await this.page.waitForTimeout(1000)
    }

    async waitForEditAccInfo(){
        const accountInfoLoc = await this.getLocator(LoginPageLoc.accInfo)
        let accountInfo = await accountInfoLoc.isVisible()
        const badcredentialsLoc = await this.getLocator(LoginPageLoc.dismissibleAlert)
        let badcredentials = await badcredentialsLoc.isVisible()

        if (accountInfo) {
            accountInfo
            //(accountInfo).toBe(true)
            this.log("login is successfull")
            return true
        } else if (badcredentials) {
            this.log("Login failed, Bad credentials, try again...!")
            return true
        }
    }
}