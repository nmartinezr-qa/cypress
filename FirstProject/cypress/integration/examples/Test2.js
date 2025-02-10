/// <reference types="cypress" />

describe('My Second Test', () => {
    it('Visits the Cypress documentation page', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('tomato')
        cy.wait(1000)
        cy.get('.products').find('.product').should('have.length', 1)
        cy.get('.products').find('.product').eq(0).contains('ADD TO CART').click()      
        cy.get('.cart-icon').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.get('button').contains('Place Order').click()
    })
})
