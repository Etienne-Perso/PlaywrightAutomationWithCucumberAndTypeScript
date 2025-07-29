Feature: Hompe page functionnality

    Scenario: to test home page 
        Given user is on the home page
        When user enter login details
        Then login should be successful
        And user acount should be displayed 
