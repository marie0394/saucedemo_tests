export class LoginPage {
    login(username, password){
        cy.get('[data-test="username"]').type(username)
        cy.get('[data-test="password"]').type(password)
        cy.get('[data-test="login-button"]').click()
    }

    loginByCookie(username){
        cy.setCookie('session-username', username)
    }
}