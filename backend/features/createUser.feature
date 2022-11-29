Feature: Create User

Scenario: Create a New User Successfully
When user inputs first name "Noah", last name "Ye", email "noahye@gmail.com", username "Noah3", and password "noahye999" in the correct fields of the sign up page
Then new user gets "User has successfully been created"

Scenario: Create a New User with a Username that's Already Taken for a Current Account
When user inputs first name "Noah", last name "Ye", email "noahye@gmail.com", taken username "Noah2", and password "nnnoah456" in the correct fields of the sign up page
Then previously used username user created gets "Please choose another username"

Scenario: Create a New User with an Email that's Already Been Used for a Current Account
When user inputs first name "Noah", last name "Ye", taken email "noahye@gmail.com", username "Noah2", and password "nnnoah456" in the correct fields of the sign up page
Then previously used email user created gets "Please input another email"