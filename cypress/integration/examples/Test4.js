/// <reference types="cypress" />

describe('Tabs', () => {
    it('Visits the Cypress documentation page', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/#/')

        // Handle child tabs, Cypress does not support child tabs so we are removing the target attribute to open the link in the same tab
        cy.get('#opentab').invoke('removeAttr', 'target').click()

       cy.origin("https://www.qaclickacademy.com/", () => {
            cy.contains('About us').click()
            cy.get('.mt-50 h2').should('contain', 'Welcome to QAClick Academy')

       })

       // Go back to the main page
         cy.visit('https://rahulshettyacademy.com/AutomationPractice/#/')

         
       // For new windows we can copy the URL from the href attribute and use cy.visit()
      // cy.get('')

    })
})
