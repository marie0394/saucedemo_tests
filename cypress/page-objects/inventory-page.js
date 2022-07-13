export class InventoryPage {
    addToCart(productName){
        cy.get('.inventory_item_name')
        .contains(productName)
        .parents('.inventory_item')
        .contains('Add to cart')
        .click()
    }

    goToProductPage(productName){
        cy.get('.inventory_item_name')
        .contains(productName)
        .click()
    }

    goToCart(){
        cy.get('.shopping_cart_container').click()
    }

    checkThereAreItemsInInventory(){
        cy.get('.inventory_item').should('exist')
    }
    
}