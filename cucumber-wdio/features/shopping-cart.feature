Feature: Shopping cart
    As a user I want to be able to add products to the shopping cart
    and remove products while deciding what to buy

    Scenario: Click a buy button
        Given that I am logged in
        When I click on the buy button for "Invisibility Cloak"
        Then 1 item of "Invisibility Cloak" should be added to the cart

    Scenario: Change amount and click buy
        Given that I can see the products list
        When I change the form to 5 and click buy on "Wooden Wand"
        Then 5 items of "Wooden Wand" should be added to the cart
    
    Scenario: Remove product
        Given that I have put a "Crystal Ball" in my cart
        When I click on the delete button on "Crystal Ball"
        Then the total amount due should be 0