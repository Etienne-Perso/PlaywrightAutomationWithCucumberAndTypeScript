import dotenv from "dotenv"
var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'reports/cucumber_report.json',
        output: 'reports/cucumber_report_bootstrap.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            Browser:"",
            Url:"",
            TestEnvironment:""
        },
        failedSummaryReport: true,
    }

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

    generateHtmlReport()

   