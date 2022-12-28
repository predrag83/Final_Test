"use strict";

require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By, Key, until } = require("selenium-webdriver");
const chai = require("chai");
const { assert, expect } = require("chai");
const HomePage = require("../pages/home.page");
const RegisterPage = require("../pages/register.page");
const LoginPage = require("../pages/login.page");
const CheckoutPage = require("../pages/checkout.page");

describe("QA Fast Food tests", function() {
    let driver;

    let pageHomepage;
    let pageRegister;
    let pageLogin;
    let pageCart;
    let pageCheckout;
    let pageHistory;
    //const packageToAdd = 'Burger';
    //const packageQuantity = '1';

    before(function() {
        driver = new webdriver.Builder().forBrowser("chrome").build();
        
        pageHomepage = new HomePage(driver);
        pageRegister = new RegisterPage(driver);
        pageLogin = new LoginPage(driver);
        pageCheckout = new CheckoutPage(driver);
        //pageCart = new CartPage(driver);
    });

    after(async function() {
        await driver.quit();
    });

    beforeEach(function() {
    });

    afterEach(function() {
    });

    it("Verify homepage is open", async function() {
        await pageHomepage.goToPage();
        const pageTitle = await pageHomepage.getPageHeaderTitle();
        expect(pageTitle).to.contain("QA FastFood"); 
    });

    it("Go to reg. page - Verify Register page is open", async function() {
        await pageHomepage.clickOnRegisterLink();

        expect(await pageRegister.getRegisterButtonValue()).to.contain('Register');
    });

    it('Successfuly performs registration', async function() {
        await pageRegister.getInputFirstname().sendKeys('Bobb');
        
        await pageRegister.getInputLastname().sendKeys('Dyllan');
        await pageRegister.getInputEmail().sendKeys('bob.dyllan@example.local');
        await pageRegister.getInputUsername().sendKeys('bob.dyllan');
        await pageRegister.getInputPassword().sendKeys('qwerty123');
        await pageRegister.getInputPasswordConfirmation().sendKeys('qwerty123');
        await pageRegister.getRegisterButton().click();

        await driver.sleep(3000);

        expect(await pageHomepage.getSuccesssAlertText()).to.contain('Success!');
    });

    it('Performs Login', async function() {
        //await pageHomepage.clickOnLoginLink();
        await pageLogin.goToPage();
        expect(await pageHomepage.isLoginLinkDisplayed()).to.be.true;

        await pageLogin.getInputUsername().sendKeys('bob.dyllan');
        await pageLogin.getInputPassword().sendKeys('qwerty123');
        await pageLogin.clickOnLoginButton();

        await driver.sleep(4000);

        expect(await pageHomepage.getWelcomeBackTitle()).to.contain('Welcome back,');
        //expect(await pageHomepage.isLogoutLinkDisplayed()).to.be.true;

    });

    it("Performs logout", async function() {
        await pageHomepage.clickOnLogoutLink();

        expect(await pageHomepage.isLoginLinkDisplayed()).to.be.true;
    });

    it.only("Adds item to cart - Burger, 1 items", async function() {
        
        const packageToAdd = 'Burger';
        
        const packageQuantity = '1';
        
        const packageDiv = await pageHomepage.getPackageDiv(packageToAdd);
        
        
        const quantity = await pageHomepage.getQuantityDropdown(packageDiv);

        // ovde prosledjujemo 'quantity' kao parametar i suzavamo pretragu
        const options = await pageHomepage.getQuantityOptions(quantity);
        await Promise.all(options.map(async function(option) {
            const text = await option.getText();
            if (text === packageQuantity) {
            //if (text === '1') {
                await option.click();

                const selectedValue = await quantity.getAttribute('value');
                 
                //expect(selectedValue).to.contain('1');
                expect(selectedValue).to.contain(packageQuantity);

                const buttonOrder = await packageDiv.findElement(By.className('btn btn-primary'));

                await buttonOrder.click();

                expect(await driver.getCurrentUrl()).to.contain('http://test.qa.rs/order');

            }

        })); 

    });

});