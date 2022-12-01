Feature: Create User

    # Scenario: Create a New User Successfully
    # When user inputs first name "Noah", last name "Ye", email "noahye@gmail.com", username "Noah3", and password "noahye999" in the correct fields of the sign up page
    # Then new user gets "User has successfully been created"

    Scenario: Create a New User with a Username that's Already Taken for a Current Account
    When user inputs first name "Noah", last name "Ye", email "noahye@gmail.com", taken username "Noah2", and password "nnnoah456" in the correct fields of the sign up page
    Then previously used username user created gets "Please choose another username"

    Scenario: Create a New User with an empty Email 
    When user inputs first name "Noah", last name "Ye", empty email, username "Noah2", and password "nnnoah456" in the correct fields of the sign up page
    Then the field "email can't be empty"