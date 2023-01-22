const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'client')))
app.use(bodyParser.json())
const pub = 'BAp8loXO5s2pqheDrtMF3E9VXkEGEDROh0SyuVxvz4KS9xevNOrRnbqdfAKVbjF7GbSPay_GHOSerNYW_m6FeSw';
const priv = 'LcazQHSeK7wYnH42_N48oYax7QLfZHpbqisu7Oly7eE'
webPush.setVapidDetails(
    'mailto:test@test.com',
    pub,
    priv
)

app.post('/subscribe', (req, res) => {

    subscribtion = req.body
    console.log('Post Request', subscribtion)
    res.status(201).json({})

    webPush.sendNotification(subscribtion, "Text message").catch(e => console.log(e))
})


const PORT = 5000;
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`))