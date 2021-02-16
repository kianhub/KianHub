const console = require("console");

let temperatures = []
let band_a = 0
let band_b = 0
let band_c = 0
let band_d = 0

function random(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

for (i = 0; i < 365; i++) {
temperatures.push(random(35))
}


for (j = 0; temperatures.length; j++) {
if(temperatures[j] == undefined)
break;

if(temperatures[j] <= 10) {
    band_a = band_a + 1;
    console.log("Temperature: " + temperatures[j] + " will be added to Band A.")
} else {
    if(temperatures[j] <= 20) {
        band_b = band_b + 1;
        console.log("Temperature: " + temperatures[j] + " will be added to Band B.")
    } else {
        if(temperatures[j] <= 30) {
            band_c = band_c + 1;
            console.log("Temperature: " + temperatures[j] + " will be added to Band C.")
        } else {
            band_d = band_d + 1;
            console.log("Temperature: " + temperatures[j] + " will be added to Band D.")
            }
        }
    } 
}

console.log("Band A: " + band_a)
console.log("Band B: " + band_b)
console.log("Band C: " + band_c)
console.log("Band D: " + band_d)