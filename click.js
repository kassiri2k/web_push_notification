const playwright = require('playwright');

(async () => {

    const browser = await playwright.chromium.launchPersistentContext("", {
        permissions: ["notifications"],
        headless: false
    })
    // const context = await browser.newContext();
    const page = await browser.newPage();
    await page.goto('http://localhost:5000/');

    await page.click(".onesignal-bell-launcher-button")

    const newPage = (await browser.pages()).find(p => p.url() === 'https://ask123.os.tc/subscribe');

    // should perform actions on the new page that poped up
    //await newPage.click('#unblocked-allow');

})();