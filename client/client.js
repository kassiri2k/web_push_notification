const button = document.getElementById('button1')
if ('serviceWorker' in navigator && 'PushManager' in window) {
    button.onclick = () => {
        const payload = document.getElementById('notification-payload').value;
        navigator.serviceWorker.register('sw.js')
        navigator.serviceWorker.ready
            .then(reg => {
                //returns a subscription or undefined
                return reg.pushManager.getSubscription()
                    .then(async subscription => {
                        //if a subscription is found return it
                        if (subscription) {
                            return subscription
                        }

                        const pub = 'BAp8loXO5s2pqheDrtMF3E9VXkEGEDROh0SyuVxvz4KS9xevNOrRnbqdfAKVbjF7GbSPay_GHOSerNYW_m6FeSw';
                        const subscriptionOptions = {
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(pub)
                        }
                        //subscribe the user if no sub

                        return reg.pushManager.subscribe(subscriptionOptions)
                    })
            })
            .then(subscription => {
                fetch('/subscribe', {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        subscription: subscription,
                        payload: payload
                    }),
                })

            })
    }



}


// Web-Push
// Public base64 to Uint
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}