Feature: Hompe page functionnality

  Scenario: to test home page logout
    Given user is on the home page
    Given user is connected
    Given user upon logout
    Then logout should be succesfful
    When this is a dammy step

    # Examples:
    #   | username             | password              |
    #   | dummy1234@gmail.com  | dummy1234@gmail.com   | //Valid
      # | dummy12341@gmail.com | dummy1234@gmail.com   | //Invalid
      # | dummy1234@gmail.com  | dummy12341@gmail.com  | //Invalid
      # | dummy12341@gmail.com | dummy12341@gmail.com  | //Invalid
      # |                      |                       | //Invalid