/// <reference types="cypress" />

describe('Tabs', () => {
    it('Visits the Cypress documentation page', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/#/')

        // Handle tables
        // In this scenario we want to verify that the value for a specific course is 25

        // Get the second column of the table
        cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
            const courseName = $el.text()
            if(courseName.includes('Python')){
                // Get the next column which is the price
                const price = $el.next().text()
                expect(price).to.equal('25')
            }
        })



        // Handle mouse hover
        cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.url().should('include', 'top')


        // Handle invisible elements
        // With this solution we don't need to make the element visible or hover over it
        cy.contains('Top').click({force: true})


    })
})
