const request = require('request');
const https = require('https');
const rc = require('request-curl');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

let session = request.jar()
const img = "https://images.asos-media.com/products/polo-ralph-lauren-jogginghose-in-marine-mit-durchgehendem-logo-print/14501847-1-navy"
let size;
let found = false;


curl()


async function curl() {
    request({
        method: 'GET',
        url: "https://www.asos.com/api/product/catalogue/v3/stockprice?productIds=14501847&store=DE&currency=EUR&keyStoreDataversion=3pmn72e-27",
        jar: session
    }, (err, res body => {
      
    }))
        try {
            const j = JSON.parse(res.body);
            const json = j[0]
            const price = json.productPrice.current.text;

            const small = json.variants[0]
            const medium = json.variants[1]
            const large = json.variants[2]
    
            if(small.isInStock == true || medium.isInStock == true || large.isInStock == true) {
                found = true;
                if (small.isInStock == true)
                    size = "Small"
                if (medium.isInStock == true)
                    size = "Medium"
                if (large.isInStock == true)
                    size = "Large"

                request({
                    method: "POST",
                    url: webhook,
                    headers: {"content-type": "application/json"},
                    body: {
                            "embed": {
                              "title": "Klicke hier um auf die Hose zu kommen...",
                              "url": "https://www.asos.com/de/polo-ralph-lauren/polo-ralph-lauren-jogginghose-in-marine-mit-durchgehendem-logo-print/prd/14501847",
                              "color": 11307263,
                              "timestamp": Date.now(),
                              "footer": {
                                "text": "Made by Kian"
                              },
                              "thumbnail": {
                                "url": img
                              },
                              "author": {
                                "name": "Hose ist gerestocked!"
                              },
                              "fields": [
                                {
                                  "name": "Größe",
                                  "value": size,
                                  "inline": true
                                  
                                },
                                {
                                  "name": "Preis",
                                  "value": price,
                                  "inline": true
                                }
                              ]
                            }
                    }
                }, (err, res, body) => {
                    if(err)
                        console.log(err)
                    console.log("Discord sent.")
                })
            } else {
                console.log("[" + Date.now() + "] No restock yet...")
            }

        } catch(e) {
            console.log(e)
        }
    })
    if(found == true) {
        return;
    } else {
        await sleep(2000)
        curl()
    }
}
