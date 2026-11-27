import { After, Before, Given,Then,When } from "@cucumber/cucumber";
import { chromium, Browser, Page,BrowserContext, expect } from "@playwright/test";
let browser: Browser;
let context: BrowserContext;
let page: Page;
let Exp_Num =""
Before(async () => {
  browser = await chromium.launch({ headless: false,
  });
  context = await browser.newContext();
  page = await context.newPage();
});
Given('user navigate browser to the ERP login page', async function () {
   await page.goto("http://webapp.qedgetech.com/");
});

When('the user enters valid credentials {string} and {string}', async function (user, pass) {
  await page.locator('#btnreset').waitFor()
  await page.locator('#btnreset').click()
  await page.locator('#username').fill(user)
  await page.locator('#password').fill(pass)
});

When('the user click login button', async function () {
  
   await page.locator('#btnsubmit').waitFor()
    await page.locator('#btnsubmit').click()
});

Then('the user should be successfully logged in and redirected to the dashboard', async function () {
  await expect(page.locator('#ewBreadcrumb2')).toBeVisible()
  await page.waitForTimeout(2000)
});

When('User navigates to add supplier page', async function () {
  //await page.locator("(//a[text()='Suppliers'])[2]").waitFor()
  await page.locator("(//a[text()='Suppliers'])[2]").click()
  await page.waitForTimeout(2000)
  //await page.locator("span[data-caption='Add']").first().waitFor()
  await page.locator("span[data-caption='Add']").first().click()
});

When('user capture supplier number', async function () {
  Exp_Num= await page.locator('#x_Supplier_Number').inputValue()
});

When('user fill supplier deatls {string},{string},{string},{string},{string},{string},{string},{string},{string}',
   async function (sname, address, city, country, cperson, pnumber, email, mnumber, notes) {
 await page.locator('#x_Supplier_Name').fill(sname)
 await page.locator('#x_Address').fill(address)
 await page.locator('#x_City').fill(city)
 await page.locator('#x_Country').fill(country)
  await page.locator('#x_Contact_Person').fill(cperson)
 await page.locator('#x_Phone_Number').fill(pnumber)
 await page.locator('#x__Email').fill(email)
 await page.locator('#x_Mobile_Number').fill(mnumber)
 await page.locator('#x_Notes').fill(notes)
});

When('user click add button', async function () {
 await page.locator('#btnAction').click()
});

When('user click confirm ok button', async function () {
  await page.getByText('OK!').waitFor()
  await page.getByText('OK!').last().click()
});

When('user click Alert ok button', async function () {
  await page.getByText('OK').last().waitFor()
  await page.getByText('OK').last().click()
});

When('user Navigate to supplier table', async function () {
  await page.locator("button[data-caption='Search Panel']").waitFor()
  await page.locator("button[data-caption='Search Panel']").click()
  await page.locator('#psearch').waitFor()
  await page.locator('#psearch').clear()
  await page.locator('#psearch').fill(Exp_Num)
  await page.locator('#btnsubmit').click()
});

Then('user validate supplier number', async function () {
 let Act_Num = await page.locator("//table[@class='table ewTable']/tbody/tr[1]/td[6]/div/span/span").textContent()
 if(Act_Num?.includes(Exp_Num))
 {
  console.log(`Supplier number Found in Table ${Exp_Num}   ${Act_Num}`)
 }
 else{
  console.log(`Supplier number Not Found in Table ${Exp_Num}   ${Act_Num}`)
 }
});
After(async()=>{
 // page.close()
  browser.close()
})