export class ProductPage {
    goBackToProducts(){
        cy.get('[data-test="back-to-products"]')
        .click()
    }

    addToCart(){
        cy.get('button')
        .contains('Add to cart')
        .click()
    }

    
}

