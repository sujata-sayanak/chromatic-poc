const { expect, default: test } = require("@playwright/test");
exports.CommonFunctions = class CommonFunctions {

  constructor(page) {
    this.page = page;
    this.createRFIButton = page.getByTestId('ProjectGrid__createButton');
    this.rfiTitleField = page.getByTestId('IssueCreateForm__title');
    this.rfiBallInCourtField = page.getByTestId('IssueCreateForm__assignedTo').getByTestId('Dropdown__input');
    this.createButtonRFI = page.getByTestId('IssueNew__createButton');
    //this.workflowActionsButton = page.getByRole('button', { name: 'Workflow actions' });
    this.workflowActionsButton = page.locator(`//button[text()='Workflow actions']/* | //label[text()='Workflow actions']`)
    this.rfiVoidMenuOption = page.getByTestId('menu-item--void');
    this.rfiSetAsVoidButton = page.getByTestId('IssuePreviewTransitionPopUpForm__saveButton');
    this.submittalsSetAsVoidButton = page.getByTestId('menu-item--WORKFLOW_BAR_VOID');
    this.modelConfirmButton = page.getByTestId('ModalConfirmationFooter__confirmation-button')
    this.createItemButton = page.getByRole('button', { name: 'Create item' });
    this.createSubmittalsButton = page.getByTestId('NewSubmittalItemModal__footer-save-button');

    this.createReportButton = page.getByTestId('primaryAction');
    this.runReportButton = page.getByTestId('action-strip-primary');
    this.reportSearchButton = page.getByTestId('SearchField__input');
  }

  async sleep(time) {
    return new Promise((resolve) => {

      setTimeout(resolve, time || 1000);
    });
  }

  async setAcknowledgeRenameForms() {
    await this.page.evaluate(() =>
      localStorage.setItem("acsFormAcknowledge-formRenameShadowbox", true)
    );
  }

  async dismissDialogIfExists(page) {
    try {
      // Check if the specific locator is visible
      if (
        (await this.page.locator("//p[text()='How are we doing?']").isVisible()) ||
        (await this.page.locator("//p[text()='Tell us what you think!']").isVisible())
      ) {
        await this.page.locator("//button[text()='Dismiss']").click();
        console.log('Take Survey Dialog dismissed');
      } else if (
        (await this.page.locator("//strong[text()='Session enrollment is now open!']").isVisible())
      ) {
        await this.page.locator("//button[text()='Remind me later']").click();
        console.log('Registration Open Dialog dismissed');
      } else if (
        (await this.page.locator("//p[text()='How likely are you to recommend Autodesk to a friend or colleague?']").isVisible()) ||
        (await this.page.locator("//p[text()='Whats New in September']").isVisible()) ||
        (await this.page.locator("//p[contains(text(),'New in November')]").isVisible()) ||
        (await this.page.locator("//p[contains(text(),' New in March')]").isVisible()) ||
        (await this.page.locator("//p[contains(text(),' a new look!')]").isVisible()) ||
        (await this.page.locator("//strong[contains(text(),'still time to register for AU 2023')]").isVisible()) ||
        (await this.page.locator("//div/p[contains(text(),'What's New')]").isVisible())
      ) {
        await this.page.locator("//button[contains(@id,'pendo-close-guide')]").click();
        console.log("Dialog dismissed. id=pendo-base");
      } else if (await this.page.locator("//div[@id='pendo-base']").isVisible()) {
        await this.page.hover("//button[contains(@id,'pendo-close-guide')]");
        await this.page.locator("//button[contains(@id,'pendo-close-guide')]").click();
        console.log("Dialog dismissed. id=pendo-base");
      }
      else {
        const isElementVisible = await this.page.locator("//div[@id='pendo-base']").isVisible();
        console.log('Is the element visible?', isElementVisible);
        console.log('Dialog did not appear');
      }
    } catch (error) {
      if (error.name === 'TimeoutError') {
        console.log('Dialog did not appear within timeout.');
      }
    }
  }

  async navigateToModule(module) {
    await this.page.getByTestId('SideNavigationList').getByRole('link', { name: module }).click();
    switch (module) {
      case 'RFIs':
        await expect(this.page.locator(`//div[@class='title' and text()='${module}']`)).toBeVisible();
        break;
      case 'Submittals':
        await expect(this.page.locator(`//div[contains(@class, 'DefaultPageHeaderTitle___StyledDiv-sc') and text()='${module}']`)).toBeVisible();
        break;
      case 'Sheets':
        await expect(this.page.locator(`//div[contains(@class,'PageHeader___StyledDiv-sc')]/div[text()='${module}']`)).toBeVisible();
        break;
      case 'Reports':
        await expect(this.page.locator(`//div[@data-testid='page-header-title' and text()='${module}']`)).toBeVisible();
        break;
      default:
        console.warn(`No specific checks for module: ${module}`);
        break;
    }
    console.log(`${module} tab opened.`);
  }

  async createRFI(rfiTitle, ballInCourt) {
    await this.createRFIButton.click();
    await this.rfiTitleField.fill(rfiTitle);
    await this.page.getByTestId('IssueCreateForm__assignedTo').getByTestId('Dropdown__control').locator('div').first().click();
    await this.rfiBallInCourtField.fill(ballInCourt);
    await this.rfiBallInCourtField.press('Enter');
    // await this.page.keyboard.press('Escape');
    await this.page.getByTestId('IssueCreateForm__assignedTo').getByTestId('FormLabel').click();
    await this.createButtonRFI.click();
    console.log(`${rfiTitle} RFI created.`);
  }

  async createSubmittals(submittalsTitle, assignedTo) {
    await this.createItemButton.click();
    await this.page.getByTestId('ItemCreateFormGeneralSection__spec-section').getByTestId('SelectBox__control').locator('div').nth(1).click();
    await this.page.getByText('- DND_test_spec').click();
    await this.page.getByLabel('Title*').click();
    await this.page.getByLabel('Title*').fill(submittalsTitle);
    await this.page.getByTestId('ItemCreateFormGeneralSection__type').getByTestId('SelectBox__control').locator('div').first().click();
    await this.page.getByTestId('SelectBox__option--0').click();
    await this.page.getByTestId('ItemCreateFormGeneralSection__assign-to').getByTestId('Dropdown__control').click();
    await this.page.getByTestId('ItemCreateFormGeneralSection__assign-to').getByTestId('Dropdown__input').fill(assignedTo);
    await this.page.getByTestId('ItemCreateFormGeneralSection__assign-to').getByTestId('Dropdown__input').press('Enter');
    await this.page.getByTestId('ItemCreateFormGeneralSection__due-date').getByTestId('DatePickerTarget').click();
    await this.page.getByRole('button', { name: '4', exact: true }).click();
    await this.createSubmittalsButton.click();
    console.log(`${submittalsTitle} successfully created.`);
  }

  async voidRFI(rfiTitle) {
    await this.workflowActionsButton.click();
    await this.rfiVoidMenuOption.click();
    await this.rfiSetAsVoidButton.click();
    await this.page.getByTestId('backToRfi').click();
    await expect(this.page.locator(`//div[text()='${rfiTitle}']`)).not.toBeVisible();
    console.log(`${rfiTitle} RFI voided`);
  }

  async voidSubmittals(submittalsTitle) {
    await this.workflowActionsButton.click();
    await this.submittalsSetAsVoidButton.click();
    await this.modelConfirmButton.click();
    await this.page.getByRole('button', { name: 'Submittals' }).click();
    await expect(this.page.locator(`//div[text()='${submittalsTitle}']`)).not.toBeVisible();
    console.log(`${submittalsTitle} Submittals voided`);
  }

  async createReport(reportName) {
    await this.createReportButton.click();
    await this.page.getByRole('textbox').click();
    await this.page.getByRole('textbox').fill(reportName);
    await this.page.locator(`//span[contains(@class,'MenuItem___StyledSpan') and text()='${reportName}']`).click();
    await expect(await this.page.locator(`//input[@value='${reportName}']`)).toBeVisible();
    console.log(`${reportName} report opened.`);
  }

  async enterReportTitle(reportTitle) {
    await this.page.getByTestId('title').fill(reportTitle);
    await this.page.getByTestId('title').click();
    console.log(`${reportTitle} entered.`)
  }

  async selectStartAndEndDueDates(month, year, date) {
    await this.page.getByTestId('DateRangePickerTarget').click();
    await this.page.getByTestId('DatePickerCalendar-0-month').click();
    await this.page.locator('#downshift-9-item-11').getByText('December').click();
    await this.page.getByTestId('DatePickerCalendar-0-year').click();
    await this.page.getByText('2024').click();
    await this.page.getByRole('button', { name: '31' }).click();
    await this.page.getByTestId('DateRangePickerTarget').click();
    await this.page.getByTestId('DateRangePickerTarget').click();
    await this.page.getByRole('button', { name: '31', exact: true }).click();
    console.log(`Due date selected, ${date}/${month}/${year}.`)

  }

  async selectFilterDueDate(month, year, date) {
    await this.page.getByTestId('data-filter-report_date').locator('div').first().click();
    await this.page.getByText('Due date').click();
    await this.page.getByTestId('filterOption-data-due_date').locator('div').first().click();
    await this.page.getByText('Specific date range').click();
    await this.selectStartAndEndDueDates(month, year, date);
  }

  async runReport(reportTitle, month, year, date, photoToggle) {
    await this.enterReportTitle(reportTitle)
    await this.selectFilterDueDate(month, year, date); //'December', '2024', '31'
    if (photoToggle === false) {
      const toggle = this.page.locator(`//input[@name='photos' and @data-testid='optional-component-toggle']`);
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-checked', 'false');
      console.log(`Photo toggle disabled.`)
    } else {
      console.log(`Photo toggle is enabled.`)
    }
    await this.runReportButton.click();
    await this.page.getByTestId('modal-primary').click();
    await this.page.getByText(`Generating ${reportTitle}. When the report is ready, it will be sent to you by email.`).waitFor({ state: 'visible' })
    await this.page.getByText(`${reportTitle} is ready. The report was sent to you by email.`).waitFor({ state: 'visible' })
    await expect(this.page.getByText(`${reportTitle} is ready. The report was sent to you by email.`)).toBeVisible();
    console.log(`${reportTitle} generated successfully.`)
  }

  async searchDownloadSaveReport(reportPath, reportName){
    await this.reportSearchButton.click();
    await this.reportSearchButton.fill(reportName);
    await this.reportSearchButton.press('Enter');
    await this.page.getByTestId('table-row-menu').click();
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.locator(`//*[name()='svg' and @data-testid='download']`).click();
    const download = await downloadPromise;
    await download.saveAs(reportPath + reportName)
    console.log("Report successfully downloaded :" + reportName);
  }


}