import { After, Before, setDefaultTimeout, Status } from "@cucumber/cucumber";
import { Browser, chromium, Page, webkit } from "@playwright/test";
import * as core from '@actions/core';
// import { POManager } from "../../pageobjectsTS/POManager";

let page: Page;
let browser: Browser;
// let poManager: POManager;

setDefaultTimeout(30 * 1000);

Before(async () => {
    try {
        browser = await chromium.launch({headless: false});
        const context = await browser.newContext();
        page = await context.newPage()
        await page.goto("https://rahulshettyacademy.com/client");
        console.log(`captured site title as ${await page.title()}`);
        // const poManager = new POManager(page, 'abc');
    } 
    catch (error) {
        console.log(`chrome navigation to demo site failed due to ${error}`);
        throw new Error(`chrome navigation to demo site failed due to ${error}`);
    }
    return page;
});

After(async function(Scenario) {
    let exitCode: number = 0;
    if(Scenario.result!.status === Status.FAILED){
        await this.attach(await page.screenshot({path: `./Screenshots/${Scenario.pickle.name}.png`, fullPage: true}), "image/png");
        // process.exit(1);
        console.log("Setting exit code to 1");
        exitCode = 1;
        //throw new Error(`step failed`);
        // this.setTestStatus(Scenario.result!.status, Error); // <-- Mark the test as failed in the report
    }
    // process.exitCode = 0;

    if (exitCode == 1){
        console.log("Stop Process");
        core.setFailed("One Test Failed");
    }

    await browser.close();
});

export { page, browser };