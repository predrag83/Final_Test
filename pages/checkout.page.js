'use strict';
const { By, Key, until } = require("selenium-webdriver");

module.exports = class CheckoutPage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    goToPage() {
        this.#driver.get("http://test.qa.rs/checkout");
    }

    async clickOnLogoutLink() {       
                const logoutLink = await this.#driver.findElement(By.partialLinkText('Logout'));
                await logoutLink.click();        
            }
        
        }