/// <reference types="cypress" />

describe('My First Test', () => {
    it('Visits the Cypress documentation page', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(1000)
        // selenium get hit url in browser, cypress get acts like findElement of selenium
        // get() will get the element and then we can perform actions on it
        cy.get('.product').should('have.length', 5)
        // Select onlyu visible products
        cy.get('.product:visible').should('have.length', 4)
        // Selects parent element then find child element and finally validate the number of elements
        cy.get('.products').find('.product').should('have.length', 4)
        // Find the element with text 'ADD TO CART' and click on it
        cy.get('.products').find('.product').eq(1).contains('ADD TO CART').click()      

        cy.get('.products').find('.product').each(($el, index, $list) => {
            const vegName = $el.find('h4.product-name').text()
            if(vegName.includes('Cashews')){
                // Click on the button of the element
                // Wrap is used to resolve the promise and then click on the button
                cy.wrap($el).find('button').click()
            }
        })

        // The following line fails because cypress is returning a promise and not the actual value
        //const logo = cy.get('.brand')

        // To resolve the promise and get the actual value we use then() function
        cy.get('.brand').then((logoElement) => {
            cy.log(logoElement.text())
        })

        // Validate the text of the logo
        cy.get('.brand').should('have.text', 'GREENKART')

    })
})
