// export const bears = {
//     bears: 'bears'
// };

const xhr = new XMLHttpRequest();
const endpoints = [
    'test-text.txt',
    'test-json.json'
];
xhr.open('GET', endpoints[1]);
xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
xhr.setRequestHeader('Accept', 'application/json');
xhr.name = 'xhr vin';
xhr.onreadystatechange = function() {
    if (this.readyState !== 4) return;
    console.log(JSON.parse(this.response))
};
xhr.send();



console.log([1, 2, 3, 4].reduceRight( function (total, num) {console.log(total, num); total[num] = num; return total }, {} ) );