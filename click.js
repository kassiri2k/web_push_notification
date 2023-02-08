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
    // A. Attendre un peu que le popup soit créé et chargé
    await waitingTime(7000); // attendre 7s ou plus ou moins
    const newPage = (await browser.pages()).find(p => p.url() === 'https://ask123.os.tc/subscribe');
    // B. Cliquer sur le button qui permet d'autoriser la permission
    await newPage.evaluate( () => {
        document.getElementById("unblocked-allow").click()
    })
    // should perform actions on the new page that poped up
    //await newPage.click('#unblocked-allow');

})();


function waitingTime(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}
