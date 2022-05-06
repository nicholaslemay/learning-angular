import {test, expect, Page, Request} from '@playwright/test';
import {GoRestConfig} from "../src/app/shared/goRestConfig";

test.describe('Registration', () => {
  test('should create user via API', async ({page}) => {

    await page.goto('http://localhost:4200/users/new');
    await page.locator('h1');
    await expect(page.locator('h1')).toHaveText('Registration');

    let receivedCall;
    let receivedRequest = {} as Request;
    await page.route('**/v2/users**', route => {
      // @ts-ignore
      receivedCall = route.request().postDataJSON();
      receivedRequest = route.request();

      route.fulfill({body: 'mocked-data'});
    });
    // Create 1st todo.
    await page.locator('#name').fill('tony');
    await page.locator('#email').fill('tony@hotmail.com');
    await page.locator('#gender').selectOption('female');
    await page.locator('button[type="submit"]').click();

    expect(receivedCall).toEqual({name: "tony", email: "tony@hotmail.com", gender: "female", status: "active"});
    expect(await receivedRequest.headerValue('authorization')).toEqual(`Bearer ${new GoRestConfig().API_TOKEN}`);
  });

});
