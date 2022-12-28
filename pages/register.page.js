'use strict';
const { By, Key, until } = require("selenium-webdriver");

module.exports = class RegisterPage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    goToPage() {
        this.#driver.get("http://test.qa.rs/register");
    }

    getRegisterButtonValue() {
        return this.getRegisterButton().getAttribute('value');
    }

    getRegisterButton() {
        return this.#driver.findElement(By.name('register'));
    }

    getInputFirstname() {
        return this.#driver.findElement(By.name('firstname'));
    }

    getInputLastname() {
        return this.#driver.findElement(By.name('lastname'));
    }

    getInputEmail() {
        return this.#driver.findElement(By.name('email'));
    }

    getInputUsername() {
        return this.#driver.findElement(By.name('username'));
    }

    getInputPassword() {
        return this.#driver.findElement(By.name('password'));
    }

    getInputPasswordConfirmation() {
        return this.#driver.findElement(By.name('passwordAgain'));
    }


}