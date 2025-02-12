import CartPage from "./CartPage"

class ProductPage{

    getShopName(){
        return cy.get('h1[class="my-4"]')
    }

    getQuantityOfPhones(){
        return cy.get('.card')
    }

    selectProductByName(productName){
        cy.get('.card-title').each(($el, index, $list) => {
            if($el.text().includes(productName)){
                cy.get('.btn-info').eq(index).click()
            }
        })
    }

    checkout(){
        cy.contains('a','Checkout').click()
        return new CartPage()
    }

}

export default ProductPage;