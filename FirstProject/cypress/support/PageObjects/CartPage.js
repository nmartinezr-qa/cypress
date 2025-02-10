import ConfirmationPage from "./ConfirmationPage"

class CartPage{

    getProductsInCart(){
        return cy.get('h4 a')
    }

    verifyMaxTotalPrice(maxTotalPrice){
        cy.get('td:nth-child(4) strong').as('productValues')
            let totalPrices = 0
            cy.get("@productValues").each(($el)=>{
                const textPrice = Number($el.text().split(" ")[1].trim())
                totalPrices = totalPrices + textPrice                
            }).then(()=>{
                expect(parseInt(totalPrices)).to.be.lessThan(maxTotalPrice)
            })
    }

    checkout(){
        cy.contains('button','Checkout').click()
        return new ConfirmationPage()
    }

}

export default CartPage;