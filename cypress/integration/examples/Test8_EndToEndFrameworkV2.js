/// <reference types="cypress" />
import HomePage from "../../support/pageObjects/HomePage";
import ProductPage from "../../support/pageObjects/ProductPage";
import CartPage from "../../support/pageObjects/CartPage";
import ConfirmationPage from "../../support/pageObjects/ConfirmationPage";

    describe("End to end testing",()=>{

        before(function(){
           cy.fixture('example').then((data)=>{ this.data = data })
           this.homePage = new HomePage()
        })

        it("Submit Order",function(){
            Cypress.config('defaultCommandTimeout', 10000)

            const homePage = this.homePage           
            homePage.goTo(Cypress.env('url'))
            const productPage = homePage.login(Cypress.env('username'), Cypress.env('password'))

            productPage.getShopName().should('be.visible').and('contain', this.data.shopName)
            productPage.getQuantityOfPhones().should('have.length', this.data.quantityOfPhones)
            productPage.selectProductByName(this.data.productName1)
            productPage.selectProductByName(this.data.productName2)

            const cartPage = productPage.checkout()

            cartPage.getProductsInCart().filter(`:contains("${this.data.productName1}")`).should('be.visible')
            cartPage.getProductsInCart().filter(`:contains("${this.data.productName1}")`).should('be.visible')
            cartPage.verifyMaxTotalPrice(this.data.maxTotalPrice)
            
            const confirmationPage = cartPage.checkout()

            confirmationPage.submitOrder(this.data.country)
            confirmationPage.verifySuccessMessage(this.data.successMessage)

        })
    })