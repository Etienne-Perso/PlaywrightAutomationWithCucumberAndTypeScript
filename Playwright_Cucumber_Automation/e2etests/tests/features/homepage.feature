Feature: Hompe page functionnality

    Scenario: to test home page 
        Given user is on the home page
        When user enter login username as "<username>"
        And user enter login password as "<password>"
        And user acount should be displayed 
        When user upon logout
        Then logout should be succesfful

        Examples:
        | username            | password             | 
        | dummy1234@gmail.com | dummy1234@gmail.com  |  //valid 
        | dummy1234@gmail.com | dummy12345@gmail.com |  //invalid
        | dummy1@gmail.com    | dummy1234@gmail.com  |  //invalid
        | dummy1@gmail.com    | dummy1@gmail.com     |  //invalid
        |                     |                      |  //invalid
        

