/// <reference types="cypress" />

import { CartPage } from "../page-objects/cart-page";
import { InventoryPage } from "../page-objects/inventory-page";
import { LoginPage } from "../page-objects/login-page";
import { NavigationPage } from "../page-objects/navigation-page";
import { ProductPage } from "../page-objects/product-page";

describe('Test cases', () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();
    const productPage = new ProductPage();
    const cartPage = new CartPage();
    const navigationPage = new NavigationPage();
    const standard_user = 'standard_user';
    const locked_out_user = 'locked_out_user';
    const password = 'secret_sauce';

    context('Login', () => {

        beforeEach(() => {
            cy.visit('/')
        })
    
        it('logins with valid credentials', () => {
            loginPage.login(standard_user, password);
            navigationPage.checkPageIsInventory()
        })

        it('logins with invalid credentials', () => {
            loginPage.login(standard_user, password + '1');
            navigationPage.checkPageIsNotInventory()
            loginPage.checkErrorMessageIs('Epic sadface: Username and password do not match any user in this service')
        })

        it('logins with locked out user credentials', () => {
            loginPage.login(locked_out_user, password);
            navigationPage.checkPageIsNotInventory()
            loginPage.checkErrorMessageIs('Epic sadface: Sorry, this user has been locked out.')
        })
    })

    context('Inventory', () => {
        beforeEach(() => {
            loginPage.loginByCookie(standard_user);
            navigationPage.goToPage('/?/inventory.html');
        })
        it('Products are available in inventory', () => {
            navigationPage.checkPageIsInventory()
            inventoryPage.checkThereAreItemsInInventory()
        })
    })

    context('Cart', () => {
        beforeEach(() => {
            loginPage.loginByCookie(standard_user);
            navigationPage.goToPage('/?/inventory.html');
        })
        it('Add products to cart from inventory page', () => {
            inventoryPage.addToCart('Sauce Labs Backpack')
            inventoryPage.addToCart('Sauce Labs Onesie')
            inventoryPage.goToCart()
            cartPage.checkProductInCart('Sauce Labs Backpack')
            cartPage.checkProductInCart('Sauce Labs Onesie')
        })

        it('Add products to cart from product pages', () => {
            inventoryPage.goToProductPage('Sauce Labs Backpack')
            productPage.addToCart()
            productPage.goBackToProducts()
            inventoryPage.goToProductPage('Sauce Labs Bolt T-Shirt')
            productPage.addToCart()
            inventoryPage.goToCart()
            cartPage.checkProductInCart('Sauce Labs Backpack')
            cartPage.checkProductInCart('Sauce Labs Bolt T-Shirt')
        })

    })
})