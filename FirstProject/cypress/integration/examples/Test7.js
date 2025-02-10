/// <reference types="cypress" />

describe('Tabs', () => {
    it('Visits the Cypress documentation page', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('a[href*="offers"]').invoke('removeAttr', 'target').click() 
        
        // Method created by the teacher (Optimized)
        const monthNumber = "6";
        const date = "15";
        const year = "2027";
        const expectedList = [monthNumber,date,year];

        cy.wait(5000)
        cy.get(".react-date-picker__inputGroup").click();
 
        cy.get(".react-calendar__navigation__label").click();
        cy.get(".react-calendar__navigation__label").click();
        cy.contains("button",year).click();
        cy.get(".react-calendar__year-view__months__month").eq(Number(monthNumber)-1).click();
        cy.contains("abbr",date).click();
 
        //Assertion
        cy.get(".react-date-picker__inputGroup__input").each(($el,index)=>
        {
            cy.wrap($el).invoke('val').should('eq',expectedList[index]);
        })

        // My method
        cy.get('.react-date-picker__calendar-button').click()
        cy.get('.react-calendar__navigation__label__labelText').click()
        cy.get('.react-calendar__navigation__label__labelText').click()
        cy.contains('2027').click()
        cy.contains('July').click()
        cy.get('.react-calendar__month-view__days__day').contains('15').click()
        cy.get('input[name="day"]').should('have.value', '15')
        cy.get('input[name="month"]').should('have.value', '7')
        cy.get('input[name="year"]').should('have.value', '2027')
    })
})
