const { CommonFunctions } = require('../../tests/utils/commonFunctions');
import { test, expect, takeSnapshot } from "@chromatic-com/playwright";
// import { test, expect } from '@playwright/test';

exports.LoginPage = class LoginPage {

    constructor(page) {

        this.page = page
        this.commonFunctions = new CommonFunctions(page);
        this.username = page.locator("//input[@id='userName']")
        this.next_button = page.locator("//button[@id='verify_user_btn']");//page.getByRole('button', { name: 'Next button' })
        this.password = page.locator("//input[@id='password']")
        this.sign_in_button = page.locator("//button[@id='btnSubmit']");//page.getByRole('button', { name: 'Sign in button' })

    }

    async oldIDPFlow(skip_captcha_url) {
        try {
            await this.page.goto(skip_captcha_url);
            await this.page.waitForTimeout(100);
            // Check if the x-tt cookie is set
            const cookies = await this.page.context().cookies();
            // console.log("All cookies:", cookies);

            const xTTCookie = cookies.find(cookie => cookie.name === 'x-tt');
            if (xTTCookie) {
                console.log("x-tt cookie is set:", xTTCookie);
            } else {
                console.log("x-tt cookie is not set.");
            }

        } catch (error) {
            console.error("An error occurred while launching the build:", error);
            // You can add additional error handling or logging here.
        }
    }

    async newIDPFlowOptIn(new_idp_optin_url) {
        console.log("Sending a direct HTTP request to new_idp_optin_url:", new_idp_optin_url);

        // Use page.request.get to make a direct GET request to the URL
        const response = await this.page.request.get(new_idp_optin_url);

        console.log(response.status())
        // Check the response status
        if (response.status() === 204) {
            console.log("Opt-in successful: No content response.");
        } else if (response.status() === 302) {
            console.log("Opt-in redirected. Check redirection URL:", response.headers()['location']);
        } else {
            console.warn("Unexpected status code:", response.status());
        }

        // Confirm cookies are set after the request
        const cookies = await this.page.context().cookies();
        //console.log("Cookies after opt-in request:", cookies);

        // Look for the IDP Opt-In cookie dynamically based on a prefix
        const idpOptInCookie = cookies.find(cookie => cookie.name.startsWith('idp-opt-in'));

        if (idpOptInCookie) {
            console.log("IDP Opt-In cookie is set:", idpOptInCookie);
        } else {
            console.error("IDP Opt-In cookie is not set.");
            throw new Error("Opt-in cookie missing.");
        }

    }

    async bypassCaptcha(bypass_captcha_url, token) {
       // console.log(`token : ${token}`)
        try {
            console.log("Sending request to bypass CAPTCHA...");
    
            // Perform the GET request with the Authorization header
            const response = await this.page.request.get(bypass_captcha_url, {
                headers: {
                    Authorization: token,
                },
            });
    
            // Log the response status
            console.log(`Bypass CAPTCHA response status: ${response.status()}`);
    
            // Check for the expected response status (204 No Content)
            if (response.status() === 204) {
                console.log("CAPTCHA bypassed successfully.");
            } else {
                console.error("Unexpected response status while bypassing CAPTCHA:", response.status());
                throw new Error("CAPTCHA bypass failed.");
            }
    
            // Get and log cookies to verify the x-tt cookie
            const cookies = await this.page.context().cookies();
            const xTTCookie = cookies.find(cookie => cookie.name === 'x-tt');
            if (xTTCookie) {
                console.log("x-tt cookie is set:", xTTCookie);
            } else {
                console.error("x-tt cookie is not set after bypassing CAPTCHA.");
                throw new Error("x-tt cookie missing.");
            }
        } catch (error) {
            console.error("An error occurred while bypassing CAPTCHA:", error);
            throw error;
        }
    }


    async launchBuild(base_url, skip_captcha_new_idp, skip_captcha_url, new_idp_optin_url, token, environment) {
        console.log(environment)
        try {
            // Determine the flow based on the environment
            if (["prod", "prod_emea", "prod_apac", "prod_aus"].includes(environment)) {
                console.log(`Environment is production-like (${environment}). Using New OLD IDP Flow.`);
                await this.oldIDPFlow(skip_captcha_url);
            } else if (["staging", "qa", "staging_apac", "staging_aus"].includes(environment)) {
                console.log(`Environment is non-production (${environment}). Using New IDP Flow.`);
                await this.newIDPFlowOptIn(new_idp_optin_url);
                await this.bypassCaptcha(skip_captcha_new_idp, token);
            } else {
                throw new Error(`Unsupported environment: ${environment}`);
            }
    
            // Launch the build
            console.log("Navigating to the base URL...");
            await this.page.goto(base_url);
            console.log("Build launched.");
        } catch (error) {
            console.error("An error occurred during the launch build process:", error);
            throw error;
        }
    }
    

    async login(username, password, testInfo) {
        console.log("User is on Login page.")
        await this.username.waitFor({ state: 'visible', timeout: 60000 });
        await this.username.fill(username)
        await this.page.waitForTimeout(500)
        await takeSnapshot(this.page, "Username entered", testInfo);
        await this.next_button.waitFor({ state: 'attached', timeout: 60000 });
        await this.next_button.click()
        await this.password.waitFor({ state: 'visible', timeout: 60000 });
        await this.password.fill(password)
        await this.page.waitForTimeout(500)
        await takeSnapshot(this.page, "Password entered", testInfo);
        await this.sign_in_button.waitFor({ state: 'attached', timeout: 60000 });
        await this.sign_in_button.click()
        console.log("Login successful.")

    }

    async signOut() {
        try {
            const userButton = this.page.getByTestId('TopNavigation__user');
    
            await userButton.waitFor({ state: "visible"});
            await userButton.click();
    
            const signOutButton = this.page.getByRole('button', { name: 'Sign out' });
    
            await signOutButton.waitFor({ state: "visible"});
            await signOutButton.click();
    
            await this.page.locator("//input[@id='userName']").waitFor({ state: "visible"});
    
            console.log("Signed out successfully.");
        } catch (error) {
            console.error("Sign out failed:", error);
            throw error;
        }
    }

}