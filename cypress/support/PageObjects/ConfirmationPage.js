class ConfirmationPage {
   
    submitOrder(country){
        // Custom Cy commands
        cy.fillMandatoryFields(country)
        
        //cy.get('#country').type(country)
        //cy.get('.suggestions a').click()
        //cy.get('input[value="Purchase"]').click()
    }

    verifySuccessMessage(message) {
        cy.contains(message).should('be.visible')
    }

}

export default ConfirmationPage;