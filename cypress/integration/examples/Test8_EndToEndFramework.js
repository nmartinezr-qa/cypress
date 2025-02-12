/// <reference types="cypress" />
import HomePage from "../../support/PageObjects/HomePage";
import ProductPage from "../../support/PageObjects/ProductPage";
import CartPage from "../../support/PageObjects/CartPage";
import ConfirmationPage from "../../support/PageObjects/ConfirmationPage";

    describe("End to end testing",()=>{

        before(function(){
           cy.fixture('example').then((data)=>{ this.data = data })
        })

        it("Submit Order",function(){
            Cypress.config('defaultCommandTimeout', 10000)

            const homePage = new HomePage()
            homePage.goTo(Cypress.env('url'))
            homePage.login(Cypress.env('username'), Cypress.env('password'))

            const productPage = new ProductPage()
            productPage.getShopName().should('be.visible').and('contain', this.data.shopName)
            productPage.getQuantityOfPhones().should('have.length', this.data.quantityOfPhones)
            productPage.selectProductByName(this.data.productName1)
            productPage.selectProductByName(this.data.productName2)
            productPage.checkout()

            const cartPage = new CartPage()
            cartPage.getProductsInCart().filter(`:contains("${this.data.productName1}")`).should('be.visible')
            cartPage.getProductsInCart().filter(`:contains("${this.data.productName1}")`).should('be.visible')
            cartPage.verifyMaxTotalPrice(this.data.maxTotalPrice)
            cartPage.checkout()

            const confirmationPage = new ConfirmationPage()
            confirmationPage.submitOrder(this.data.country)
            confirmationPage.verifySuccessMessage(this.data.successMessage)

        })
    })