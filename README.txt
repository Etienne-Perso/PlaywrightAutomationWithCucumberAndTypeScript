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



















