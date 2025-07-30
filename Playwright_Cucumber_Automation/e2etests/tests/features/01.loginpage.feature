Feature: Hompe page login functionnality

  Scenario: to test login page
    Given user is on the home page
    When user enter login username as "<username>"
    When user enter login password as "<password>"
    Then user acount should be displayed

    Examples:
      | username             | password              |
      | dummy1234@gmail.com  | dummy1234@gmail.com   | //Valid
      # | dummy12341@gmail.com | dummy1234@gmail.com   | //Invalid
      # | dummy1234@gmail.com  | dummy12341@gmail.com  | //Invalid
      # | dummy12341@gmail.com | dummy12341@gmail.com  | //Invalid
      # |                      |                       | //Invalid
