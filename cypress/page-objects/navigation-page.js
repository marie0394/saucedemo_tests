export class NavigationPage {
    goToPage(page){
        cy.visit(page);
    }

    checkPageIsInventory(){
        cy.url().should('include', '/inventory.html');
    }
    checkPageIsNotInventory(){
        cy.url().should('not.include', '/inventory.html');
    }
    
}