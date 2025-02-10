/// <reference types="cypress" />

describe('My Second Test', () => {
    it('Visits the Cypress documentation page', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/#/')

        // Check the checkbox
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')

        // Uncheck the checkbox
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')

        // Check multiple checkboxes using value
        cy.get('input[type="checkbox"]').check(['option2', 'option3']).should('be.checked')

        //Uncheck multiple checkboxes
        cy.get('input[type="checkbox"]').uncheck(['option2', 'option3']).should('not.be.checked')

        //Check all the checkboxes
        cy.get('input[type="checkbox"]').check().should('be.checked')


        // Select the value from a static dropdown
        cy.get('select').select('option2').should('have.value', 'option2')


        // Select the value from a dynamic dropdown
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if($el.text() === 'India'){
                cy.wrap($el).click()
            }
        })

        // Validate the selected value
        cy.get('#autocomplete').should('have.value', 'India')


        // Make an element invisible and validate if it is invisible
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')

        // Make an element visible and validate if it is visible
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

        // Select Radio button
        cy.get('input[value="radio2"]').check().should('be.checked')


        // Alerts and confirmations
        cy.get('#alertbtn').click().then(() => {
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Hello , share this practice page and share your knowledge')
            })
        })

        // Confirmations
        cy.get('#confirmbtn').click().then(() => {
            cy.on('window:confirm', (str) => {
                expect(str).to.equal('Hello , Are you sure you want to confirm?')
            })
        })

        // Cancel the confirmation
        cy.get('#confirmbtn').click().then(() => {
            cy.on('window:Cancel', (str) => {
                return true
            })
        })

    })
})
