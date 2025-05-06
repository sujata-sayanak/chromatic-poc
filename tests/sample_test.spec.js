
import { test, expect, takeSnapshot } from "@chromatic-com/playwright";
// import { test, expect } from '@playwright/test';
import { LoginPage} from "../pages/common/loginPage";
import { ProjectListPage } from '../pages/common/projectListPage';
//import { ViewerPage } from "../pages/viewer/viewerPage";



test.use({ diffThreshold: 0.7 });

test("Login to build", async ({ page }, testInfo) => {
  const Login = new LoginPage(page);
  const projectList = new ProjectListPage(page);
  let BASE_URL = 'https://acc-qa.autodesk.com/projects'
  let SKIP_CAPTCHA_NEW_IDP = 'https://idp.auth-staging.autodesk.com/accounts/v1/hcaptcha/bypass'
  let SKIP_CAPTCHA_URL = "https://accounts-staging.autodesk.com/Authentication/LogOn?trustToken=BDF22F39-19F1-435D-AAD1-9CE5B6081173"
  let NEW_IDP_OPT_IN = 'https://accounts-staging.autodesk.com/idp-opt-in'
  let TOKEN = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjM0MDczYThmLWYzZTItNGQ3Yy1hNDBiLWUxY2UyYzBhNzdiYyIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9zdGFnaW5nIiwiY2xpZW50X2lkIjoib0dqaU9oSHFvY3g4emc2R0FkVXhpZzZyRnFGaTQya2NFemF5cmhXR01uelpweXJCIiwic2NvcGUiOlsiaWRlbnRpdHk6Y2FwdGNoYTpieXBhc3MiXSwiaXNzIjoiaHR0cHM6Ly9kZXZlbG9wZXItc3RnLmFwaS5hdXRvZGVzay5jb20iLCJleHAiOjIwNTI4MDQwNDQsImp0aSI6IjFhZjFkYzY4LWRkOGYtNDcwMC05OGZkLTI3MzFjMDcxM2M3OCJ9.lhdDa-LQQM2pFWxQotwJGRzR3C4aW_QTv4Y1EnDEtD5Yy7F0rnz83VGpBi_Sv2yNYeLA0LpZBDBr1FEGZQgNd3NX3lJiH8VjpWe9_GHrXuYxpsrLTqFesHtiUBOrcAxdfldOlvSdboS23qOyrKHKU8p7R04-tkIBns4qBwboiiG3K5kYEKUZLzd3UuLMmNR1T6nB48EUkTe_mqABxLXed_BiZ5laI3I8F9_CB8OAL_B35eZpjTCE8NpUt8yDi8Qldf5-7o0zgSY4ImOK_BmoyUlnBQ72jWCq2R1-PCYigcJWdzFHbwHJPE769x74tF3XP0E8kBMYPpcKfx_AYCm9yg"
  let ENVIRONMENT = "qa"


  console.log(`Launching ${BASE_URL}`);
  await Login.launchBuild(BASE_URL, SKIP_CAPTCHA_NEW_IDP, SKIP_CAPTCHA_URL, NEW_IDP_OPT_IN, TOKEN, ENVIRONMENT);
  await page.waitForTimeout(3000);
  await takeSnapshot(page, "Build launched.", testInfo);
  await Login.login("acs-playwrite@ecsnmz0t.mailosaur.net", "playwright@1", testInfo);
  await projectList.searchAndSelectProject("Playwright_Test_Project_Viewer", testInfo);
  await page.goto(`https://acc-qa.autodesk.com/build/files/projects/49e73749-4f81-4b6e-a74c-e954ced1bfb8?folderUrn=urn%3Aadsk.wipqa%3Afs.folder%3Aco.XpWN_tylRFiMdS5scU5QoQ&entityId=urn%3Aadsk.wipqa%3Adm.lineage%3A3GPKqvD4T2OC_Q96_45AEQ&viewModel=detail&moduleId=folders`)
  await page.waitForTimeout(20000);
  await takeSnapshot(page, "File opened.", testInfo);
  console.log('file opened.')



  //   await page.goto(`https://acc-qa.autodesk.com/build/files/projects/49e73749-4f81-4b6e-a74c-e954ced1bfb8?folderUrn=urn%3Aadsk.wipqa%3Afs.folder%3Aco.XpWN_tylRFiMdS5scU5QoQ&entityId=urn%3Aadsk.wipqa%3Adm.lineage%3A3GPKqvD4T2OC_Q96_45AEQ&viewModel=detail&moduleId=folders&viewableGuid=25a85fb8-b395-4076-9415-d18b74b7f262`)
  //  // await page.goto(`https://acc-qa.autodesk.com/build/files/projects/b164c836-f784-4fa1-b831-6cee54e6324d?folderUrn=urn%3Aadsk.wipqa%3Afs.folder%3Aco.VxQDbLIZSbGhPiNJLqY33A&entityId=urn%3Aadsk.wipqa%3Adm.lineage%3ApqFoizA6T1uPvuhfYFCO4w&viewModel=detail&moduleId=folders&viewableGuid=eac890bc-fb24-5304-a070-e772cf0cd3b0`);
  //   console.log(`file opened...`)
  //   await page.waitForTimeout(40000);
  //   await takeSnapshot(page, "File opened", testInfo);

  // await page.locator(`//div[@id="toolbar-settingsTool"]`).click();

  // await page.getByRole('row', { name: 'WebGPU Graphics BETA Use' }).getByRole('cell').nth(2).click();
  // await page.locator('#ViewerSettingsPanel1-1 > .docking-panel-close').click();
  // console.log(`webgpu enabled`)
  // await page.reload();
  // console.log(`page reloaded.`)
  // console.log("Retrieving GPU Info...");


});



// test.only("Login to build - Production", async ({ page }, testInfo) => {
//   const Login = new LoginPage(page);
//   const projectList = new ProjectListPage(page);
//   let BASE_URL = 'https://acc.autodesk.com/projects?trustToken=BDF22F39-19F1-435D-AAD1-9CE5B608117'
//   let SKIP_CAPTCHA_NEW_IDP = 'https://idp.auth-staging.autodesk.com/accounts/v1/hcaptcha/bypass'
//   let SKIP_CAPTCHA_URL = "https://accounts.autodesk.com/Authentication/LogOn?trustToken=BDF22F39-19F1-435D-AAD1-9CE5B6081173"
//   let NEW_IDP_OPT_IN = 'https://accounts-staging.autodesk.com/idp-opt-in'
//   let TOKEN = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjM0MDczYThmLWYzZTItNGQ3Yy1hNDBiLWUxY2UyYzBhNzdiYyIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9zdGFnaW5nIiwiY2xpZW50X2lkIjoib0dqaU9oSHFvY3g4emc2R0FkVXhpZzZyRnFGaTQya2NFemF5cmhXR01uelpweXJCIiwic2NvcGUiOlsiaWRlbnRpdHk6Y2FwdGNoYTpieXBhc3MiXSwiaXNzIjoiaHR0cHM6Ly9kZXZlbG9wZXItc3RnLmFwaS5hdXRvZGVzay5jb20iLCJleHAiOjIwNTI4MDQwNDQsImp0aSI6IjFhZjFkYzY4LWRkOGYtNDcwMC05OGZkLTI3MzFjMDcxM2M3OCJ9.lhdDa-LQQM2pFWxQotwJGRzR3C4aW_QTv4Y1EnDEtD5Yy7F0rnz83VGpBi_Sv2yNYeLA0LpZBDBr1FEGZQgNd3NX3lJiH8VjpWe9_GHrXuYxpsrLTqFesHtiUBOrcAxdfldOlvSdboS23qOyrKHKU8p7R04-tkIBns4qBwboiiG3K5kYEKUZLzd3UuLMmNR1T6nB48EUkTe_mqABxLXed_BiZ5laI3I8F9_CB8OAL_B35eZpjTCE8NpUt8yDi8Qldf5-7o0zgSY4ImOK_BmoyUlnBQ72jWCq2R1-PCYigcJWdzFHbwHJPE769x74tF3XP0E8kBMYPpcKfx_AYCm9yg"
//   let ENVIRONMENT = "prod"


//   console.log(`Launching ${BASE_URL}`);
//   await Login.launchBuild(BASE_URL, SKIP_CAPTCHA_NEW_IDP, SKIP_CAPTCHA_URL, NEW_IDP_OPT_IN, TOKEN, ENVIRONMENT);
//   await page.waitForTimeout(3000);
//   await takeSnapshot(page, "Build launched.", testInfo);
//   await Login.login("acs-playwrite@ecsnmz0t.mailosaur.net", "playwright@1", testInfo);
//   await projectList.searchAndSelectProject("Playwright_Test_Project_Viewer", testInfo);
//   await page.goto(`https://acc.autodesk.com/build/files/projects/4a6ef464-49ef-4eb5-ba39-af0c1dccb5f6?folderUrn=urn%3Aadsk.wipprod%3Afs.folder%3Aco.hikcd-agRfO8maZy-5Ixhg&entityId=urn%3Aadsk.wipprod%3Adm.lineage%3ANaOTb-LWR5qXKyFo5YXiow&viewModel=detail&moduleId=folders&viewableGuid=68430895-fecb-40cb-af50-f392dfe03b8d`)
//   await page.waitForTimeout(8000);
//   await takeSnapshot(page, "File opened.", testInfo);
//   console.log('file opened.')



//   //   await page.goto(`https://acc-qa.autodesk.com/build/files/projects/49e73749-4f81-4b6e-a74c-e954ced1bfb8?folderUrn=urn%3Aadsk.wipqa%3Afs.folder%3Aco.XpWN_tylRFiMdS5scU5QoQ&entityId=urn%3Aadsk.wipqa%3Adm.lineage%3A3GPKqvD4T2OC_Q96_45AEQ&viewModel=detail&moduleId=folders&viewableGuid=25a85fb8-b395-4076-9415-d18b74b7f262`)
//   //  // await page.goto(`https://acc-qa.autodesk.com/build/files/projects/b164c836-f784-4fa1-b831-6cee54e6324d?folderUrn=urn%3Aadsk.wipqa%3Afs.folder%3Aco.VxQDbLIZSbGhPiNJLqY33A&entityId=urn%3Aadsk.wipqa%3Adm.lineage%3ApqFoizA6T1uPvuhfYFCO4w&viewModel=detail&moduleId=folders&viewableGuid=eac890bc-fb24-5304-a070-e772cf0cd3b0`);
//   //   console.log(`file opened...`)
//   //   await page.waitForTimeout(40000);
//   //   await takeSnapshot(page, "File opened", testInfo);

//   // await page.locator(`//div[@id="toolbar-settingsTool"]`).click();

//   // await page.getByRole('row', { name: 'WebGPU Graphics BETA Use' }).getByRole('cell').nth(2).click();
//   // await page.locator('#ViewerSettingsPanel1-1 > .docking-panel-close').click();
//   // console.log(`webgpu enabled`)
//   // await page.reload();
//   // console.log(`page reloaded.`)
//   // console.log("Retrieving GPU Info...");


// });





// test("BIM - Navigation orbit and pan diffThreshold 0.063", async ({ page }, testInfo) => {
//   const Login = new LoginPage(page);
//   const viewerPage = new ViewerPage(page);
//   const tools = ["freeOrbitTool"];
//   let zoomWindowPoints = { start: { x: 797, y: 307 }, end: { x: 824, y: 337 } }
//   let zoomPoints = { start: { x: 600, y: 300 }, end: { x: 800, y: 350 } };

//   await page.goto("https://docs.b360.autodesk.com/");
//   let BASE_URL = 'https://docs.b360.autodesk.com/'
//   let SKIP_CAPTCHA_NEW_IDP = 'https://idp.auth-staging.autodesk.com/accounts/v1/hcaptcha/bypass'
//   let SKIP_CAPTCHA_URL = "https://accounts.autodesk.com/Authentication/LogOn?trustToken=BDF22F39-19F1-435D-AAD1-9CE5B6081173"
//   let NEW_IDP_OPT_IN = 'https://accounts-staging.autodesk.com/idp-opt-in'
//   let TOKEN = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjM0MDczYThmLWYzZTItNGQ3Yy1hNDBiLWUxY2UyYzBhNzdiYyIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9zdGFnaW5nIiwiY2xpZW50X2lkIjoib0dqaU9oSHFvY3g4emc2R0FkVXhpZzZyRnFGaTQya2NFemF5cmhXR01uelpweXJCIiwic2NvcGUiOlsiaWRlbnRpdHk6Y2FwdGNoYTpieXBhc3MiXSwiaXNzIjoiaHR0cHM6Ly9kZXZlbG9wZXItc3RnLmFwaS5hdXRvZGVzay5jb20iLCJleHAiOjIwNTI4MDQwNDQsImp0aSI6IjFhZjFkYzY4LWRkOGYtNDcwMC05OGZkLTI3MzFjMDcxM2M3OCJ9.lhdDa-LQQM2pFWxQotwJGRzR3C4aW_QTv4Y1EnDEtD5Yy7F0rnz83VGpBi_Sv2yNYeLA0LpZBDBr1FEGZQgNd3NX3lJiH8VjpWe9_GHrXuYxpsrLTqFesHtiUBOrcAxdfldOlvSdboS23qOyrKHKU8p7R04-tkIBns4qBwboiiG3K5kYEKUZLzd3UuLMmNR1T6nB48EUkTe_mqABxLXed_BiZ5laI3I8F9_CB8OAL_B35eZpjTCE8NpUt8yDi8Qldf5-7o0zgSY4ImOK_BmoyUlnBQ72jWCq2R1-PCYigcJWdzFHbwHJPE769x74tF3XP0E8kBMYPpcKfx_AYCm9yg"
//   let ENVIRONMENT = "prod"

//   console.log(`Launching ${BASE_URL}`);
//   await Login.launchBuild(BASE_URL, SKIP_CAPTCHA_NEW_IDP, SKIP_CAPTCHA_URL, NEW_IDP_OPT_IN, TOKEN, ENVIRONMENT);
//   await page.waitForTimeout(5000);
//   //await takeSnapshot(page, "Build launched.", testInfo);
//   await Login.login("acs-playwrite@ecsnmz0t.mailosaur.net", "playwright@1", testInfo);

//   await page.locator('.VirtualizedTreeNode__icon > .SvgIcon > use').first().click();
//   await page.getByText('Project Files').click();
//   await page.getByRole('textbox', { name: 'Search' }).click();
//   await page.getByRole('textbox', { name: 'Search' }).fill('OldParkland.rvt');
//  // await page.getByRole('textbox', { name: 'Search' }).fill('sample_2d_3d_rvt_file.rvt');
//   await page.getByRole('textbox', { name: 'Search' }).press('Enter');
//   await page.getByText('Parkland.rvt', { exact: true }).click();
//   //await page.getByText('_2d_3d_rvt_file.rvt', { exact: true }).click();
  
//   await page.waitForTimeout(1000);
//   await page.locator('.SheetData').first().click();
//   await page.waitForTimeout(20000);
//   console.log(`File Opened.`)
//   await takeSnapshot(page, "BIM File opened.", testInfo);

//   // orbit movement
//   for (const tool of tools) {
//     await viewerPage.openOrbitTools();
//     await viewerPage.selectTool(tool);
//     await viewerPage.rotateImage(tool, testInfo);
//     await viewerPage.selectHome(true, testInfo);
//   }
//   // Pan movement
//   await viewerPage.selectTool("panTool");
//   await viewerPage.moveImage(testInfo);
//   await viewerPage.selectHome(false, testInfo);

//   await viewerPage.openToolsSubmenu("zoomTools");
//   await viewerPage.selectTool("zoomWindowTool");
//   await viewerPage.zoomWindow(zoomWindowPoints.start, zoomWindowPoints.end);
//   await takeSnapshot(page, "Zoom window movement completed.", testInfo);
//   await viewerPage.selectTool("fitToViewTool");
//   await viewerPage.openToolsSubmenu("zoomTools");
//   await viewerPage.selectTool("zoomTool");
//   await viewerPage.zoomWindow(zoomPoints.start, zoomPoints.end);
//   await takeSnapshot(page, "Zoom movement completed.", testInfo);

// });


