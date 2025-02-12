Feature: E2E Ecommerce validation

@Regression
  Scenario: Ecommerce product delivery
    Given I land on Ecommerce page
    When I login into Ecommerce page 
    And I add products to cart and checkout
    And Validate the total price limit
    Then Select the country and verify thank you message


    """
    Changed the way of sending the data to the step definition file
    """
@Smoke
  Scenario Outline: Ecommerce product delivery cucumber driven
    Given I land on Ecommerce page
    When I login into aplication portal
      | username            | password |
      | rahulshettyacademy  | learning |
    And I add products to cart and checkout
    And Validate the total price limit
    Then Select the country and verify thank you message