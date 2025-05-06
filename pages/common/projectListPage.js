const { CommonFunctions } = require('../../tests/utils/commonFunctions');
import { test, expect, takeSnapshot } from "@chromatic-com/playwright";
// import { test, expect } from '@playwright/test';

// const { expect } = require("@playwright/test");
exports.ProjectListPage = class ProjectListPage {

  constructor(page) {
    this.page = page
    this.commonFunctions = new CommonFunctions(page); 
    this.searchField = page.getByTestId('SearchField__input');


  }


  async searchAndSelectProject(projectName, testInfo) {
    // await this.page.getByTestId('SearchField__input').waitFor({state: "visible"});
    console.log("User on Project List page.");
    await this.searchField.waitFor({ state: "visible" });
    await this.searchField.click();
    console.log("Clicked on project search field.");
    await this.searchField.fill(projectName);
    await takeSnapshot(this.page, "seaching project", testInfo);
    //await this.commonFunctions.dismissDialogIfExists();
    await this.page.getByRole('link', { name: `${projectName}` }).waitFor({ state: "visible" });
    await this.page.getByRole('link', { name: `${projectName}` }).click();
    console.log("Clicked on searched Project row.");
    await this.commonFunctions.sleep(6000);
    await expect(this.page.locator(`//div[text()='Home']`)).toBeVisible();
    
    await takeSnapshot(this.page, "Home Page", testInfo);
   //await this.commonFunctions.dismissDialogIfExists();
    await this.commonFunctions.setAcknowledgeRenameForms();
  }

}