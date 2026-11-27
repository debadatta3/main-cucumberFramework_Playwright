Feature: ERRP System Validation 
Scenario: Validate the login functionality of the ERP system
Given user navigate browser to the ERP login page
When the user enters valid credentials "admin" and "master"
When  the user click login button
Then the user should be successfully logged in and redirected to the dashboard
@supplier
Scenario Outline:   Validate the supplier creation functionality of the ERP system
Given user navigate browser to the ERP login page
When the user enters valid credentials "admin" and "master"
When  the user click login button
When User navigates to add supplier page
When user capture supplier number
When user fill supplier deatls "<sname>","<address>","<city>","<country>","<cperson>","<pnumber>","<email>","<mnumber>","<notes>"
And user click add button
And user click confirm ok button
And user click Alert ok button
And user Navigate to supplier table
Then user validate supplier number
Examples:
|sname|address|city|country|cperson|pnumber|email|mnumber|notes|
|Debadatta|Hyd1|amerpet|India|Wipro|3456789|test@gmail.com|4567890|new Supplier1|


