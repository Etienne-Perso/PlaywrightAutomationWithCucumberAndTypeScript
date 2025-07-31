import {Page} from "@playwright/test"
import * as HomePageLoc from "../locators/homepageloc.json"
import * as LoginPageLoc from "../locators/loginpageloc.json"

export default class HomePage{

    private page:Page

    constructor(page:Page){
        this.page=page
    }

      async goToLoginPage(){
        await this.page.goto("https://ecommerce-playground.lambdatest.io/")
        await this.page.locator(HomePageLoc.accMenu.locator).hover()
        await this.page.locator(HomePageLoc.loginLink.locator).click()
    }

    async isConnected(username:string, password:string){
        await this.page.locator(LoginPageLoc.emailField.locator).fill(username)
        await this.page.locator(LoginPageLoc.pwdField.locator).fill(password)
        await this.page.locator(LoginPageLoc.loginBtn.locator).click()
    }

    async logout(){
         const badcredentials = await this.page.locator(LoginPageLoc.dismissibleAlert.locator).isVisible()
        if (!badcredentials) {
            await this.page.waitForSelector(HomePageLoc.accMenu.locator)
            await this.page.locator(HomePageLoc.accMenu.locator).hover();
            await this.page.locator(HomePageLoc.logoutLink.locator).click();
            await this.page.locator(HomePageLoc.continueBtn.locator).click();
        }
    }

     async waitForLogoutConfirmation(){
         const badcredentials = await this.page.locator(LoginPageLoc.dismissibleAlert.locator).isVisible()
    if (!badcredentials) {
        let AccountLogout = await this.page.locator(HomePageLoc.accLogoutText.locator).isVisible()
        if (!AccountLogout) {
            //expect(!AccountLogout).toBe(true)
            console.log("logout is successfull")
        }
    }else{
            console.log("logout is failed, login first...!")
        }    
    }
}