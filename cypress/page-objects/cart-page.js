export class CartPage {
    checkProductInCart(productName){
        cy.get('.inventory_item_name')
        .contains(productName)
        .should('exist')
    }
}