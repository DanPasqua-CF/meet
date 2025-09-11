import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  test('An event element is collapsed by default', async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('http://localhost:5173/'); // If your Vercel app is running in a different port please update it here

    // If your event element has a different selector, use it instead of .event
    await page.waitForSelector('.event');

    // If your event's details have a different selector, use it instead of .event .details
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
    await browser.close();
  }, 15000);

  test('User can expand an event to see its details', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/');

    await page.waitForSelector('.event');
    await page.click('.event .details-btn');

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
    await browser.close();
  }, 15000);

  test('User can collapse an event to hide details', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/');

    await page.waitForSelector('.event');

    await page.click('.event .details-btn');

    await page.click('.event .details-btn');

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();

    await browser.close();
  }, 15000);
});
