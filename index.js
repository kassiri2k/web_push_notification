const playwright = require('playwright');

(async () => {

    const browser = await playwright.chromium.launchPersistentContext("", {
        permissions: ["notifications"],
        headless: false
    })
    // const context = await browser.newContext();
    const page = await browser.newPage();
    await page.goto('http://localhost:5000/');


    //await page.click("#b")


    //await browser.close();

    console.log("hello")
    await page.click(".onesignal-bell-launcher-button")
    console.log("bye");
    const newPage = (await browser.pages()).find(p => p.url() === 'https://ask123.os.tc/subscribe');
    console.log(newPage);


    //using popup event





    // Perform actions on the new page
    //await newPage.click('#unblocked-allow');






    /*
    await waitingTime(1000);
    await page.evaluate(async () => {
        document.getElementsByClassName("onesignal-bell-launcher-button")[0].click()
        // document.getElementById("subscribe-button").click();
        //document.getElementById('unblocked-allow').click()



    })
    */

})();

function waitingTime(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}