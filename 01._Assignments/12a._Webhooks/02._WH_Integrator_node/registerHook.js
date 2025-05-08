
const exposeeUrl = "https://huge-tips-cough.loca.lt";
const integratorUrl = "https://fifty-clowns-wave.loca.lt";


function registerHook() {
    fetch(exposeeUrl+"/webhooks/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url: integratorUrl+"/webhooks/receive",
            event: "payment_received",
        }),
    })
    .then((response) => response.json())
    .then((data) => console.log("Webhook registered:", data))
    .catch((error) => console.error("Error registering webhook:", error));
}
function pingHook() {
    fetch(exposeeUrl+"/ping", {
        method: "GET",
    })
    .then((response) => response.json())
    .then((data) => console.log("Ping response:", data))
    .catch((error) => console.error("Error pinging webhook:", error));
}

registerHook();
setTimeout(() => {
    pingHook();
}, 5000);