Playwright + Cucumber installation :

Playwright:

 Install playwright using vs code extension
		go to vscode extension -->search for playwright --> click on install
		go to vscode View then command palatte --> search for playwright 
		--> select test playwright option in the list
		--> select the check box JavaScript --> then click ok. 

Cucumber: 
 Install Cucumber using vs code extension
		go to vscode extension -->search for Cucumber --> click on install
		
		Installing dependencies:
		npm i @cucumber/cucumber -D
		npm i ts-node -D
		npm i typescript -D
		npm i @types/node -D
		npm i dotenv -D
		npm i cucumber-html-reporter -D
		source: https://github.com/gkushang/cucumber-html-reporter
		
		
source:https://cucumber.io/docs/installation/javascript

create tsconfig.json
		npx tsc --init

do this config: 
		change this line like so: "target": "es2024",  
		uncomment this line: "resolveJsonModule": true,  



Creating the project structure:
-------------------------------
Under the project name: create the followings:

folder e2etests/hooks
folder e2etests/tests

	Under the folder tests create the folowing folders
	folder tests/feature
	folder tests/steps
	folder tests/pages
	folder tests/locators

folder reports

file cucumber.json --> add this code:

{
    "default": {
        "dryRun": true,
        "formatOptions": {
            "snippetInterface": "async-await"
        },
        "paths": [
            "e2etests/tests/features/**/*.feature"  //copy the relative features folder. Don't put this comments in the file.Otherwise there will be an 											 error 

        ],
        "require": [
            "e2etests/tests/steps/**/*.ts" //copy the relative steps folder
        ],
        "requireModule": [
            "ts-node/register"
        ],
        "format": []
    }
}

Create feature file and run it:
------------------------------
Create homepage.feature Under features folder with necessary scenarios and steps for each

Run homepage.feature 
	npx cucumber-js --->

1) Scenario: to test home page # e2etests\tests\features\homepage.feature:3
   ? Given user is on the home page
       Undefined. Implement with the following snippet:

         Given('user is on the home page', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? When user enter login details
       Undefined. Implement with the following snippet:

         When('user enter login details', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? Then login should be successful
       Undefined. Implement with the following snippet:

         Then('login should be successful', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? And user acount should be displayed
       Undefined. Implement with the following snippet:

         Then('user acount should be displayed', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

1 scenario (1 undefined)
4 steps (4 undefined)

Create steps file and run it:
-----------------------------

Create homepage.ts Under steps folder and copy this code

import {Given, When, Then} from "@cucumber/cucumber"


Given('user is on the home page', async function () {
    console.log("user is on the home page")
});

When('user enter login details', async function () {
    console.log("user is entering login details")
});

Then('login should be successful', async function () {
    console.log("login should be successful")
});

Then('user acount should be displayed', async function () {
    console.log("user acount should be displayed")
});

To run the steps file go with: npx cucumber-js

NB: make sure to have this configuration of the cucumber.json : "dryRun": false,

run the steps file -->npm test
do this config:
	go to cucumber.json 
	add this "scripts": {
      			"test":"cucumber-js test"
  		 },


Reorganize the project structure:
---------------------------------

Put basepage.spec.ts under hooks folder.

Do the following configuration in the homepagelogout.spec.ts and loginpage.spec.ts files:

	import {page} from "../../hooks/basepage.spec"

Do the Following configuration in the cucumber.json file:
	"require": [
        	    "e2etests/tests/steps/**/*.ts", "e2etests/hooks/basepage.spec.ts"
        	   ],



Locators: there is two approches:
Approch 1: put the locators in the contructor as below

    private emailField: Locator
    private passwordField: Locator
    private loginButton: Locator
    etc...

 constructor(page:Page){
        this.page=page
	this.emailField = page.locator("input[name='email']")
        this.passwordField = page.locator("input[name='password']")
        this.loginButton = page.locator("input[value='Login']")
	
    }

async enterUsername(username: string) {
        await this.emailField.fill(username)
    }

Approch 2: create json files under locators folder as below
{
    "emailField":{
        "locator":"input[name='email']",
        "locatorOptions":{},
        "description":"email filed",
        "actionOptions":{}
    },
    "pwdField":{
        "locator": "input[name='password']",
        "description": "password field"
    },

    "loginBtn":{
        "locator":"input[value='Login']",
        "description":"login button"
    },
    
    "accInfo":{
        "locator":"//a[normalize-space()='Edit your account information']",
        "description":"account information"
    },
    "dismissibleAlert":{
        "locator":"//div[@class='alert alert-danger alert-dismissible']",
        "description":"dismissible alert for bad credentials"
    }
}

Then we can refer to them like so with the proper import:

import * as LoginPageLoc from "../locators/loginpageloc.json"


 async enterUsername(username:string){
        await this.page.locator(LoginPageLoc.emailField.locator).fill(username)
    }


Generating reports:
-------------------
Under the reports folder created at the begining of the project, multiple reports format can be generated
To generate those reports, go with this configuration:
under the cucumber.json file then under format add the followings below:
"format": [ 
            ["json", "reports/cucumber_report.json"],
            ["junit", "reports/junit.xml"],
            ["html", "reports/html_report.html"]
			
],

'scenario' and 'this' key words:
--------------------------------
We can use scenario only in the following hooks: Before, After, Beforestep, Afterstep

console.log(message) will print the message in the console, whereas, 

this.log(message) will print the message in the report.

Contrary to the "scenario" key word, "this" key word is accessible throwght all the spec level. 

"this" at the context level given by cucumber.
	- this.log,
	- this.attach,
	- this.parameters.
 
We can implement "this" key word in the POM as showned below: 

1) this.log:

Base page:

import { ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager"

protected page: Page
   protected log: ICreateLog
   
    constructor(page:Page, log: ICreateLog ){
        this.page=page
        this.log=log
    } 

Home page:	
constructor(page:Page, log: ICreateLog){
        super(page, log)
    }

Login page: 
constructor(page:Page, log: ICreateLog){
        super(page, log)
    }

Nb: We add this.log when we instantiate the HomePage object or LoginPage as showned below at the steps level:

Given('user is on the home page', async function () {
    homePage=new HomePage(page, this.log)
    loginPage=new LoginPage(page, this.log)
    await homePage.goToLoginPage()
});

2) this.attach:
It is used to attach many things to the report like images or objects and so on.

example:
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
	
3) this.parameters : using variables accross different spec files or different steps. 
No need for global variables or export/import things.

this.parameters.a=10
console.log(`login page: the value is ${this.parameters.a}`) -->.login page: the value is 10

cucumber-html-reporter:
-----------------------
To generate the report --> npx ts-node .\index.ts

To generate it automatically go with this config:

"scripts": {
    "test": "cucumber-js test & npx ts-node index.ts"
  },
  
  
Sending command line args using cross-env module (multi browser/test env):
--------------------------------------------------------------------------
We have to install cross-en with this CLI: 
	npm install cross-env --save-dev
	
1)The hooks.specs.ts file:

BeforeAll(async function (){
    dotenv.config({
        path:`${process.cwd()}/config/.env.${process.env.npm_config_env}`
    })

    let browserType = process.env.browser
	
Do these changes:	
	
BeforeAll(async function (){
    dotenv.config({
        path:`${process.cwd()}/config/.env.${process.env.environment ?? 'qa'}`
    })

    let browserType = process.env.browser ?? 'chrome'
	
2) The index.ts file: 

Do these changes

    function generateHtmlReport(){

         dotenv.config({
                path:`${process.cwd()}/config/.env.${process.env.environment}` 
            })
        let browser = process.env.browser!  
        options.metadata.Browser = browser || "Chrome"
        if (options.metadata.Browser == browser ){
            options.metadata.Browser = browser.charAt(0).toUpperCase() + browser.slice(1);
        }

        options.metadata.Url = process.env.app_url! || "https://ecommerce-playground.lambdatest.io"

        let TestEnvironment = process.env.environment! 
        options.metadata.TestEnvironment = TestEnvironment || "QA"
         if (options.metadata.TestEnvironment == TestEnvironment){
            options.metadata.TestEnvironment  = TestEnvironment.charAt(0).toUpperCase() + TestEnvironment.slice(1);
        }

        reporter.generate(options)
    }

To pass the browser and env parameters throught CLI:
	npx cross-env browser=edge environment=dev npm test --> edge and dev environment will be loaded
	npx cross-env npm test --> by default chrome and qa will be loaded since the user didn't select any browser and environment variables
	