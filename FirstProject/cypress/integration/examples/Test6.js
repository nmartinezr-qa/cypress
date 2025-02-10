/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('Tabs', () => {
    it('Visits the Cypress documentation page', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/#/')

        // Handle iframes
        // Here we indicate the iframe that we want to interact with using the id
        cy.frameLoaded('#courses-iframe')
        // then we interact with the iframe to find and element and click on it
        cy.iframe().find('a[href*="mentorship"]').eq(0).click()
        cy.wait(2000)
        cy.iframe().find('h1[class*="pricing-title"]').should('have.length', 2)

    })
})
