import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../../../support/pageObjects/HomePage";

const homePage = new HomePage()

Given("I land on Ecommerce page", function () {
    homePage.goTo(Cypress.env('url'))
})

When("I login into Ecommerce page", function () {
    this.productPage = homePage.login(Cypress.env('username'), Cypress.env('password'))
    this.productPage.getShopName().should('be.visible').and('contain', this.data.shopName)
    this.productPage.getQuantityOfPhones().should('have.length', this.data.quantityOfPhones)
})

When("I login into aplication portal", function (dataTable) {
    this.productPage = homePage.login(dataTable.rawTable[1][0], dataTable.rawTable[1][1])
    this.productPage.getShopName().should('be.visible').and('contain', this.data.shopName)
    this.productPage.getQuantityOfPhones().should('have.length', this.data.quantityOfPhones)
})

When("I add products to cart and checkout", function () {
    this.productPage.selectProductByName(this.data.productName1)
    this.productPage.selectProductByName(this.data.productName2)
    this.cartPage = this.productPage.checkout()
})

When("Validate the total price limit", function () {
    this.cartPage.getProductsInCart().filter(`:contains("${this.data.productName1}")`).should('be.visible')
    this.cartPage.getProductsInCart().filter(`:contains("${this.data.productName1}")`).should('be.visible')
    this.cartPage.verifyMaxTotalPrice(this.data.maxTotalPrice)
})

Then("Select the country and verify thank you message", function () {
    const confirmationPage = this.cartPage.checkout()
    confirmationPage.submitOrder(this.data.country)
    confirmationPage.verifySuccessMessage(this.data.successMessage)
})